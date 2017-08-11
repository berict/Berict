var sound_count;
var audiofolder = 0;
var chdimg1 = 0, chdimg2 = 0, chdimg3 = 0;
var imglink = [];

var json;

var inputSounds;
var inputAlbumArt;
var inputArtistImage;
var inputArtistIcon;

var soundCount = 0;

zip = new JSZip();

$(document).ready(
    function () {
        // need to pass the variable as a string to change the global variable
        setInput("sounds", "sound", "inputSounds");
        setInput("album_art", "image", "inputAlbumArt");
        setInput("artist_image", "image", "inputArtistImage");
        setInput("artist_icon", "png / ico", "inputArtistIcon");
    }
);

function makeJSON() {
    var jsonString = {
        "about": {
            "bio": {
                "name": $("#bio_name").val(),
                "source": $("#bio_source").val(),
                "text": $("#bio_text").val(),
                "title": $("#song_artist").val() + "\u0027s biography"
            },
            "color": $("#song_theme_color").val(),
            "details": [
                {
                    "items": [
                        {
                            "hint": $("#artist_facebook").val(),
                            "hint_is_visible": true,
                            "image_id": "facebook",
                            "runnable_is_with_anim": false,
                            "text_id": "facebook"
                        },
                        {
                            "hint": $("#artist_twitter").val(),
                            "hint_is_visible": true,
                            "image_id": "twitter",
                            "runnable_is_with_anim": false,
                            "text_id": "twitter"
                        },
                        {
                            "hint": $("#artist_soundcloud").val(),
                            "hint_is_visible": true,
                            "image_id": "soundcloud",
                            "runnable_is_with_anim": false,
                            "text_id": "soundcloud"
                        },
                        {
                            "hint": $("#artist_insta").val(),
                            "hint_is_visible": true,
                            "image_id": "instagram",
                            "runnable_is_with_anim": false,
                            "text_id": "instagram"
                        },
                        {
                            "hint": $("#artist_google").val(),
                            "hint_is_visible": true,
                            "image_id": "google_plus",
                            "runnable_is_with_anim": false,
                            "text_id": "google_plus"
                        },
                        {
                            "hint": $("#artist_youtube").val(),
                            "hint_is_visible": true,
                            "image_id": "youtube",
                            "runnable_is_with_anim": false,
                            "text_id": "youtube"
                        },
                        {
                            "hint": $("#artist_web").val(),
                            "hint_is_visible": true,
                            "image_id": "web",
                            "runnable_is_with_anim": false,
                            "text_id": "web"
                        }
                    ],
                    "title": "About " + $("#song_artist").val()
                },
                {
                    "items": [
                        {
                            "hint": $("#store_soundcloud").val(),
                            "hint_is_visible": true,
                            "image_id": "soundcloud",
                            "runnable_is_with_anim": false,
                            "text_id": "soundcloud"
                        },
                        {
                            "hint": $("#store_youtube").val(),
                            "hint_is_visible": true,
                            "image_id": "youtube",
                            "runnable_is_with_anim": false,
                            "text_id": "youtube"
                        },
                        {
                            "hint": $("#store_spotify").val(),
                            "hint_is_visible": true,
                            "image_id": "spotify",
                            "runnable_is_with_anim": false,
                            "text_id": "spotify"
                        },
                        {
                            "hint": $("#story_googleplay").val(),
                            "hint_is_visible": true,
                            "image_id": "google_play_music",
                            "runnable_is_with_anim": false,
                            "text_id": "google_play_music"
                        },
                        {
                            "hint": $("#store_apple").val(),
                            "hint_is_visible": true,
                            "image_id": "apple",
                            "runnable_is_with_anim": false,
                            "text_id": "apple"
                        },
                        {
                            "hint": $("#store_amazon").val(),
                            "hint_is_visible": true,
                            "image_id": "amazon",
                            "runnable_is_with_anim": false,
                            "text_id": "amazon"
                        },
                        {
                            "hint": $("#store_pandora").val(),
                            "hint_is_visible": true,
                            "image_id": "pandora",
                            "runnable_is_with_anim": false,
                            "text_id": "pandora"
                        }
                    ],
                    "title": "About this track"
                }
            ],
            "isTutorialAvailable": isTutorialAvailable(),
            "presetArtist": $("#song_preset_creator").val(),
            "songArtist": $("#song_artist").val(),
            "songName": $("#song_name").val()
        },
        "bpm": $("#bpm").val(),
        "isGesture": isGesturePreset(),
        "soundCount": -1,
        "tag": "CUSTOM_INPUT"
    };
    //change object into String
    json = JSON.stringify(jsonString);
}

function createPreset() {
    console.log(inputArtistIcon.name);
    if (audiofolder == 0) {
        alert("Please upload sound files")
    }
    else if (chdimg1 == 0 || chdimg2 == 0 || chdimg3 == 0) {
        alert("Please upload all files.");
    }
    else if ($("#song_bpm").val() == "" || $("#song_tutorial_link").val() == "" || $("#song_title").val() == "" || $("#song_preset_creator").val() == "" || $("#store_pandora").val() == "" || $("#store_amazon").val() == "" || $("#store_apple").val() == "" || $("#story_googleplay").val() == "" || $("#store_spotify").val() == "" || $("#store_youtube").val() == "" || $("#store_soundcloud").val() == "" || $("#song_artist").val() == "" || $("#artist_web").val() == "" || $("#artist_youtube").val() == "" || $("#artist_google").val() == "" || $("#artist_insta").val() == "" || $("#artist_soundcloud").val() == "" || $("#artist_twitter").val() == "" || $("#artist_facebook").val() == "" ||
        $("#song_artist").val() == "" || $("#bio_text").val() == "" || $("#bio_source").val() == "" || $("#bio_name").val() == "" || $("#song_theme_color").val() == "") {
        alert("Please fill out all information.");
    }
    else {
        //if create button clicked
        var reader = new FileReader();
        sound_count = document.getElementById("upload_sounds").files.length;
        makeJSON(); //make JSON with changed sound_count
        alert(sound_count); //test for sound_count
        var zip = new JSZip(); //make zip file
        var about = zip.folder("about");
        var sounds = zip.folder("sounds");
        var timing = zip.folder("timing");
        about.file("json", json); //create JSON.txt
        var pattern = /.+,/g;
        for (var i = 0; i < imglink.length; i++) {
            var replace = imglink[i].replace(pattern, "");
            var fileName;
            switch (i) {
                case 0:
                    fileName = "album_art";
                    break;
                case 1:
                    fileName = "artist_image";
                    break;
                case 2:
                    fileName = "artist_icon";
                    break;
            }
            about.file(fileName, replace, {base64: true});
        }
        zip.generateAsync({type: "blob"})
            .then(function (content) {
                saveAs(content, "preset.zip"); //save zip file
            });
    }
}

function clearInput(id, result) {
    var input = $("#input_" + id);
    input.val("");
    input.replaceWith(input = input.clone(true));
    window[result] = null;
    if (id.includes("sound")) {
        // clear sound
        $("#upload_" + id + "_list").empty().fadeOut(200, function () {
            $(this).hide();
        });
        $("#input_" + id + "_div").fadeIn(200);
        soundCount = 0;
    } else {
        // clear image
        $("#upload_" + id + "_preview_div").fadeOut(200, function () {
            $(this).hide();
            $("#input_" + id + "_div").fadeIn(200);
        });
    }
}

function setInput(id, errorFileType, result) {
    var input = $("#input_" + id);
    input.on('dragenter', function (e) {
        // event start
        $("#input_" + id + "_div").css({
            "border": "2px solid rgb(33, 150, 243)",
            "background": "rgba(33, 150, 243, .1)"
        });
    }).on('dragleave dragend mouseout drop', function (e) {
        // event end
        $("#input_" + id + "_div").css({
            "border": "2px solid white",
            "background": "none"
        });
    });

    // clear button
    var clear = document.createElement("BUTTON");
    clear.className = "mdl-button";
    setText(clear, "Clear");
    clear.style.color = "rgb(33, 150, 243)";
    clear.onclick = function () {
        clearInput(id, result);
    };

    if (id.includes("sound")) {
        input.change(function (evt) {
            // handle sound select
            var files = evt.target.files; // FileList object
            var audios = [];

            if (files.length > 0) {
                // success opening
            }

            // Loop through the FileList and print file names to the list
            for (var i = 0, f; f = files[i]; i++) {
                // Only process audio files
                if (f.type.match('audio.*')) {
                    audios.push(f);
                    var list = $("#upload_sounds_list");
                    if ($("#input_sounds_div").is(":visible")) {
                        $("#input_sounds_div").fadeOut(200, function () {
                            $(this).hide();
                        });
                        list.show();
                    }
                    if (audios.length < 25) {
                        $(getFileElement(f.name)).hide().appendTo(list).delay(200 + 10 * i).fadeIn(100);
                    } else if (audios.length == 25) {
                        // stop at 25
                        $(getFileElement("... total " + files.length + " items added"))
                            .hide().appendTo(list)
                            .delay(200 + 5 * i).fadeIn(100);
                        // insert clear button
                        $(clear)
                            .hide().appendTo(list)
                            .delay(300 + 5 * i).fadeIn(100);
                    } else {
                        if (audios.length > 0) {
                            $(clear)
                                .hide().appendTo(list)
                                .delay(300 + 5 * i).fadeIn(100);
                        }
                        break;
                    }
                }
            }

            if (audios.length == 0) {
                // no audio inputs
                $("#input_" + id + "_div").css({
                    // red error
                    "border": "2px solid rgb(244, 67, 54)",
                    "background": "rgba(244, 67, 54, .1)"
                });
                var hint = $("#input_" + id + "_text");
                var hintText = hint.text();
                hint.fadeOut(200, function () {
                    $(this).text("Only " + errorFileType + " files are supported").fadeIn(200, function () {
                        $(this).delay(800).fadeOut(200, function () {
                            $(this).text(hintText).fadeIn(200);
                        });
                    });
                });
                input.val("");
                input.replaceWith(input = input.clone(true));
            } else {
                // return results
                window[result] = audios;
            }
        });
    } else {
        // probably image
        input.change(function (evt) {
            var files = evt.target.files; // FileList object
            var image = files[0];

            if (image.type.match("image/*")) {
                var reader = new FileReader();

                // return results
                window[result] = image;

                // Closure to capture the file information.
                reader.onload = (function (file) {
                    return function (e) {
                        // Render thumbnail.
                        $("#input_" + id + "_div").fadeOut(200, function () {
                            $(this).hide();
                        });
                        $("#upload_" + id + "_preview_div").hide().delay(200).fadeIn(200);
                        $("#upload_" + id + "_preview").attr("src", e.target.result).hide().delay(200).fadeIn(200);
                        // insert clear button
                        $(clear)
                            .hide().appendTo(document.getElementById("upload_" + id + "_preview_div"))
                            .delay(200).fadeIn(200);
                    };
                })(image);

                // Read in the image file as a data URL.
                reader.readAsDataURL(image);
            } else {
                // not a image
                $("#input_" + id + "_div").css({
                    // red error
                    "border": "2px solid rgb(244, 67, 54)",
                    "background": "rgba(244, 67, 54, .1)"
                });
                var hint = $("#input_" + id + "_text");
                var hintText = hint.text();
                hint.fadeOut(200, function () {
                    $(this).text("Only " + errorFileType + " file is supported").fadeIn(200, function () {
                        $(this).delay(800).fadeOut(200, function () {
                            $(this).text(hintText).fadeIn(200);
                        });
                    });
                });
                input.val("");
                input.replaceWith(input = input.clone(true));
            }
        });
        // hide the preview image
        $("#upload_" + id + "_preview").hide();
    }
}

function getFileElement(name) {
    var text = document.createElement("P");
    text.className = "file-input-list";
    setText(text, name);
    return text;
}

function setDropDownMenu(string) {
    document.getElementById("dropdown-preset-type").innerText = string;
}

function isGesturePreset() {
    var type = $("#dropdown-preset-type").val();
    if (type === "GESTURE PRESET") {
        return true;
    } else {
        return false;
    }
}

function isTutorialAvailable() {
    var type = $("#song_tutorial_link").val();
    if (type == null || type.length == 0) {
        return false;
    } else {
        return true;
    }
}

$(function () {
    $("#album_art").on('change', function () {
        readURL1(this);
    });
});

$(function () {
    $("#artist_image").on('change', function () {
        readURL2(this);
    });
});

$(function () {
    $("#artist_icon").on('change', function () {
        readURL3(this);
    });
});

function readURL1(input) {
    chdimg1 = 1;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#album').attr('src', e.target.result);
            imglink.push(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURL2(input) {
    chdimg2 = 1;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#artistimg').attr('src', e.target.result);
            imglink.push(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURL3(input) {
    chdimg3 = 1;
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#artisticon').attr('src', e.target.result);
            imglink.push(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
