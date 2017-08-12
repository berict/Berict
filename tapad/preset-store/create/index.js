var json;

var inputSounds = [];
var inputSoundFileNames = [];
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
            "color": $("#about_color").val(),
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
                            "hint": $("#artist_instagram").val(),
                            "hint_is_visible": true,
                            "image_id": "instagram",
                            "runnable_is_with_anim": false,
                            "text_id": "instagram"
                        },
                        {
                            "hint": $("#artist_google_plus").val(),
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
                            "hint": $("#store_google_play").val(),
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
            "presetArtist": $("#about_preset_artist").val(),
            "songArtist": $("#song_artist").val(),
            "songName": $("#song_name").val()
        },
        "bpm": $("#bpm").val(),
        "isGesture": isGesturePreset(),
        "soundCount": soundCount,
        "tag": "CUSTOM_INPUT"
    };
    //change object into String
    json = JSON.stringify(jsonString);
}

function isFormFilled() {
    var inputs = [
        "song_name",
        "song_artist",
        "about_color",
        "about_preset_artist",
        "bpm",
        "bio_text",
        "bio_name",
        "bio_source"
    ];

    var optionalInputs = [
        "about_tutorial_video_link",
        "store_pandora",
        "store_amazon",
        "store_apple",
        "store_google_play",
        "store_spotify",
        "store_youtube",
        "store_soundcloud",
        "artist_web",
        "artist_youtube",
        "artist_google_plus",
        "artist_instagram",
        "artist_soundcloud",
        "artist_twitter",
        "artist_facebook"
    ];

    var filled = true;

    for (var input in inputs) {
        var inputObject = $("#" + input);
        if (inputObject.val() == null) {
            filled = false;
            // empty, trigger mdl input error
            // seems not working
            inputObject.focus();
        }
    }

    return filled;
}

function createPreset() {
    if (inputSounds == null) {
        alert("Please upload preset sounds");
    } else if (inputAlbumArt == null || inputArtistImage == null || inputArtistIcon == null) {
        alert("Please upload all images");
    } else if (isFormFilled()) {
        alert("Please fill out the form");
    } else {
        // all passed, make preset
        makeJSON(); //make JSON with changed sound_count

        var zip = new JSZip(); //make zip file

        var preset = zip.folder("preset");

        var about = preset.folder("about");
        var sounds = preset.folder("sounds");
        var timing = preset.folder("timing");

        about.file("json", json);
        about.file("album_art", inputAlbumArt, {base64: true});
        about.file("artist_image", inputArtistImage, {base64: true});
        about.file("artist_icon", inputArtistIcon, {base64: true});

        if (inputSounds.length == inputSoundFileNames.length) {
            for (var i = 0; i < inputSounds.length; i++) {
                sounds.file(inputSoundFileNames[i], inputSounds[i]);
            }
        } else {
            console.error("Error on load counts");
        }

        zip.generateAsync({type: "blob"})
            .then(function (content) {
                    saveAs(content, "preset.zip"); //save zip file
                }
            );
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
        inputSoundFileNames = null;
        inputSounds = null;
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
            var audioCount = 0;
            var list = $("#upload_sounds_list");

            // Loop through the FileList and print file names to the list
            for (var i = 0, sound; sound = files[i]; i++) {
                // Only process audio files
                if (sound.type.match('audio.*')) {
                    audioCount++;
                    // quickfix, but it works
                    var reader = new FileReader();

                    // Closure to capture the file information
                    reader.onload = (function (file) {
                        return function (e) {
                            // return results, to array buffer
                            inputSoundFileNames.push(file.name);
                            audios.push(e.target.result);
                        };
                    })(sound);

                    // Read in the image file as a array buffer
                    reader.readAsArrayBuffer(sound);
                    if ($("#input_sounds_div").is(":visible")) {
                        $("#input_sounds_div").fadeOut(200, function () {
                            $(this).hide();
                        });
                        list.show();
                    }
                    if (audioCount < 25) {
                        $(getFileElement(sound.name)).hide().appendTo(list).delay(200 + 10 * i).fadeIn(100);
                    } else if (audioCount == 25) {
                        // stop at 25
                        $(getFileElement("... total " + files.length + " items added"))
                            .hide().appendTo(list)
                            .delay(200 + 5 * i).fadeIn(100);
                    }
                }
            }

            if (audioCount > 0) {
                // insert clear button
                $(clear)
                    .hide().appendTo(list)
                    .delay(300 + 5 * soundCount).fadeIn(100);
            }

            if (audioCount == 0) {
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
                soundCount = audioCount;
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

                        // return results, encoded with jsZip-compatible base64
                        window[result] = (e.target.result).replace(/.+,/g, "");
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
    var type = $("#about_tutorial_video_link").val();
    if (type == null || type.length == 0) {
        return false;
    } else {
        return true;
    }
}

function hideInput(element) {
    $(element).parent().parent().fadeOut(200, function () {
        $(this).hide();
    });
}

function showInput(element, prefix) {
    var elementId = $(element).find("img").attr("id");
    var input = $("#" + elementId.replace("detail_icon", prefix)).parent().parent().parent();
    if (input.css("display") == "none") {
        input.hide().fadeIn(200);
    }
}