$(document).ready(
    function () {
        getPresets();
        setAdapter();

        list = document.getElementById("preset_list");
    }
);

var list;
var response = "";

function addListItem(songName, songArtist, presetArtist, isGesturePreset, tag, color) {
    if ($("#progress").is(":visible")) {
        $("#progress").fadeOut(200, function () {
            $(this).remove();
        });
        $(getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag, color)).hide().delay(200).appendTo(list).fadeIn(200);
    } else {
        $(getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag, color)).hide().appendTo(list).fadeIn(200);
    }
    $("img").hide().one("load", function () {
        $(this).fadeIn(200);
    }).each(function () {
        if (this.complete) $(this).load();
    });
}

function getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag, color) {
    // maybe use some jquery
    var preset = document.createElement("DIV");
    preset.className = "preset";
    var detail = document.createElement("DIV");
    detail.className = "detail";
    var detail_song_name = document.createElement("DIV");
    detail_song_name.className = "detail-song-name";
    setText(detail_song_name, songName);
    detail.appendChild(detail_song_name);
    var detail_song_artist = document.createElement("DIV");
    detail_song_artist.className = "detail-song-artist";
    setText(detail_song_artist, songArtist);
    detail.appendChild(detail_song_artist);
    var detail_preset_artist = document.createElement("DIV");
    detail_preset_artist.className = "detail-preset-artist";
    setText(detail_preset_artist, presetArtist);
    detail.appendChild(detail_preset_artist);
    if (isGesturePreset) {
        // show gesture mode indicator
        var detail_gesture_preset = document.createElement("DIV");
        detail_gesture_preset.className = "detail-gesture-preset";
        var detail_gesture_preset_icon = document.createElement("IMG");
        detail_gesture_preset_icon.className = "detail-gesture-preset-icon";
        detail_gesture_preset_icon.src = "img/gesture.png";
        var detail_gesture_preset_text = document.createElement("B");
        setText(detail_gesture_preset_text, "Gesture preset");
        detail_gesture_preset.appendChild(detail_gesture_preset_icon);
        detail_gesture_preset.appendChild(detail_gesture_preset_text);
        detail.appendChild(detail_gesture_preset);
    }
    var download = document.createElement("BUTTON");
    download.className = "mdl-button";
    setText(download, "Download");
    download.style.color = color;
    download.onclick = function () {
        downloadPreset(tag)
    };
    detail.appendChild(download);
    var preset_image = document.createElement("IMG");
    preset_image.className = "preset_image";
    preset_image.src = "/file/tapad/presets/" + tag + "/album_art.jpg";
    preset_image.style = "width: 150px; height: 150px; margin: 5px; float: right;";
    preset.appendChild(preset_image);
    preset.appendChild(detail);
    return preset;
}

var r;

function getPresets() {
    var url = "http://berict.com/api/tapad/presets";
    var xhr = createCORSRequest('GET', url);

    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        response = xhr.responseText;
        console.log(response);
        setAdapter(response);
    };

    xhr.onerror = function () {
        alert('Whoops, there was an error making the request.');
    };

    xhr.send();
}

function setAdapter(response) {
    if (response !== undefined) {
        var presets = JSON.parse(response);
        for (var i = 0; i < presets.length; i++) {
            addListItem(
                presets[i].preset.about.songName,
                presets[i].preset.about.songArtist,
                presets[i].preset.about.presetArtist,
                presets[i].preset.isGesture,
                presets[i].preset.tag,
                presets[i].preset.about.color
            );
        }
    }
}

function createCORSRequest(method, url) {
    // Examples from https://www.html5rocks.com/en/tutorials/cors/
    // Create the XHR object.
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function downloadPreset(tag) {
    window.location.href = "/file/tapad/presets/" + tag + "/preset.zip";
}

function getTextNode(text) {
    return document.createTextNode(text);
}

function setText(object, text) {
    object.appendChild(getTextNode(text));
}