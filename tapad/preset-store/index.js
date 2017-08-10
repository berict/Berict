$(document).ready(
    function () {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDo99FSUZZhuqqr_I0domrjzMa6SNVceQI",
            authDomain: "tapad-4d342.firebaseapp.com",
            databaseURL: "https://tapad-4d342.firebaseio.com",
            projectId: "tapad-4d342",
            storageBucket: "tapad-4d342.appspot.com",
            messagingSenderId: "942010163958"
        };
        firebase.initializeApp(config);

        setAdapter();

        list = document.getElementById("preset_list");
    }
);

var list;

function addListItem(songName, songArtist, presetArtist, isGesturePreset, tag) {
    if ($("#progress").is(":visible")) {
        $("#progress").fadeOut(200, function () {
            $(this).remove();
        });
        $(getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag)).hide().delay(200).appendTo(list).fadeIn(200);
    } else {
        $(getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag)).hide().appendTo(list).fadeIn(200);
    }
    $("img").hide().one("load", function () {
        $(this).fadeIn(200);
        console.log("fadein");
    }).each(function () {
        if (this.complete) $(this).load();
    });
}

function getPresetElement(songName, songArtist, presetArtist, isGesturePreset, tag) {
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
    download.onclick = function () {
        downloadPreset(tag)
    };
    detail.appendChild(download);
    var preset_image = document.createElement("IMG");
    preset_image.className = "preset_image";
    preset_image.src = "https://firebasestorage.googleapis.com/v0/b/tapad-4d342.appspot.com/o/presets%2F" + tag + "%2Falbum_art.jpg?alt=media";
    preset_image.style = "width: 150px; height: 150px; margin: 5px; float: right;";
    preset.appendChild(preset_image);
    preset.appendChild(detail);
    return preset;
}

function setAdapter() {
    var database;
    firebase.database().ref().once('value').then(function (snapshot) {
        snapshot.val().presets.forEach(function (child) {
            addListItem(
                child.about.songName,
                child.about.songArtist,
                child.about.presetArtist,
                child.isGesture,
                child.tag
            );
        });
        database = snapshot.val().presets;
    });
}

function downloadPreset(tag) {
    var file = firebase.storage().ref("presets/" + tag + "/preset.zip");
    file.getDownloadURL().then(function (url) {
        window.location.href = url;
    }).catch(function (error) {
        console.error(error.message);
    });
}

function getTextNode(text) {
    return document.createTextNode(text);
}

function setText(object, text) {
    object.appendChild(getTextNode(text));
}