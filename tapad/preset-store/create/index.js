var json;

var inputSounds = [];
var inputSoundFileNames = [];
var inputAlbumArt;
var inputArtistImage;
var inputArtistIcon;

var soundCount = 0;
var difficulty = 3;
var genre = "null";

var sound;

zip = new JSZip();

$(document).ready(
    function () {
        // need to pass the variable as a string to change the global variable
        setInput("sounds", "sound", "inputSounds");
        setInput("album_art", "image", "inputAlbumArt");
        setInput("artist_image", "image", "inputArtistImage");
        setInput("artist_icon", "png / ico", "inputArtistIcon");

        initializeArray();
    }
);

function makeJSON() {
    var jsonString = {
        "description": $("#preset_description").val(),
        "difficulty": Number(difficulty),
        "genre": getGenre(),
        "preset": {
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
                                "isHintVisible": true,
                                "imageId": "facebook",
                                "isRunnableWithAnim": false,
                                "text": "facebook"
                            },
                            {
                                "hint": $("#artist_twitter").val(),
                                "isHintVisible": true,
                                "imageId": "twitter",
                                "isRunnableWithAnim": false,
                                "text": "twitter"
                            },
                            {
                                "hint": $("#artist_soundcloud").val(),
                                "isHintVisible": true,
                                "imageId": "soundcloud",
                                "isRunnableWithAnim": false,
                                "text": "soundcloud"
                            },
                            {
                                "hint": $("#artist_instagram").val(),
                                "isHintVisible": true,
                                "imageId": "instagram",
                                "isRunnableWithAnim": false,
                                "text": "instagram"
                            },
                            {
                                "hint": $("#artist_google_plus").val(),
                                "isHintVisible": true,
                                "imageId": "google_plus",
                                "isRunnableWithAnim": false,
                                "text": "google_plus"
                            },
                            {
                                "hint": $("#artist_youtube").val(),
                                "isHintVisible": true,
                                "imageId": "youtube",
                                "isRunnableWithAnim": false,
                                "text": "youtube"
                            },
                            {
                                "hint": $("#artist_web").val(),
                                "isHintVisible": true,
                                "imageId": "web",
                                "isRunnableWithAnim": false,
                                "text": "web"
                            }
                        ],
                        "title": "About " + $("#song_artist").val()
                    },
                    {
                        "items": [
                            {
                                "hint": $("#store_soundcloud").val(),
                                "isHintVisible": false,
                                "imageId": "soundcloud",
                                "isRunnableWithAnim": false,
                                "text": "soundcloud"
                            },
                            {
                                "hint": $("#store_youtube").val(),
                                "isHintVisible": false,
                                "imageId": "youtube",
                                "isRunnableWithAnim": false,
                                "text": "youtube"
                            },
                            {
                                "hint": $("#store_spotify").val(),
                                "isHintVisible": false,
                                "imageId": "spotify",
                                "isRunnableWithAnim": false,
                                "text": "spotify"
                            },
                            {
                                "hint": $("#store_google_play").val(),
                                "isHintVisible": false,
                                "imageId": "google_play_music",
                                "isRunnableWithAnim": false,
                                "text": "google_play_music"
                            },
                            {
                                "hint": $("#store_apple").val(),
                                "isHintVisible": false,
                                "imageId": "apple",
                                "isRunnableWithAnim": false,
                                "text": "apple"
                            },
                            {
                                "hint": $("#store_amazon").val(),
                                "isHintVisible": false,
                                "imageId": "amazon",
                                "isRunnableWithAnim": false,
                                "text": "amazon"
                            },
                            {
                                "hint": $("#store_pandora").val(),
                                "isHintVisible": false,
                                "imageId": "pandora",
                                "isRunnableWithAnim": false,
                                "text": "pandora"
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
        },
        "reviews": [],
        "version": Number($("#preset_version").val())
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

    var inputMenus = [
        "preset-difficulty",
        "preset-type",
        "preset-genre"
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
            inputObject.attr('required', true);
        }
    }

    for (var inputMenu in inputMenus) {
        var inputMenuObject = $("#dropdown-" + inputMenu);
        if (inputMenuObject.val() !== null && inputMenuObject.val().find("SELECT") > 0) {
            // not selected
            filled = false;
        }
    }

    return filled;
}

function initializeArray() {
    var deckArray = [];
    for (var i = 1; i <= 4; i++) {
        var padArray = [];
        for (var j = 0; j < 17; j++) {
            var gestureArray = [];
            for (var k = 0; k < 5; k++) {
                gestureArray.push("");
            }
            padArray.push(gestureArray);
        }
        deckArray.push(padArray);
    }
    sound = deckArray;
}

function pushSound(deck, pad, gesture, val) {
    console.log(deck + " - " + pad + " - " + gesture + ", added as " + val);
    sound[parseInt(deck) - 1][parseInt(pad)][parseInt(gesture)] = val;
}

function addSound(fileName) {
    if (fileName.length == 6) {
        // with gesture
        var number = fileName.match(/\d+/g); // returns a regex matching array
        pushSound(number[0], getPadIndexFromString(number[1]), number[2], fileName);
    } else if (fileName.length == 4) {
        // without gesture
        var number = fileName.match(/\d+/g); // returns a regex matching array
        pushSound(number[0], getPadIndexFromString(number[1]), "0", fileName);
    } else {
        console.error("Error on fileName, string length is " + fileName.length);
    }
}

function getPadStringFromIndex(padIndex) {
    switch (padIndex) {
        case 0:
            return "00";
        case 1:
            return "11";
        case 2:
            return "12";
        case 3:
            return "13";
        case 4:
            return "14";
        case 5:
            return "21";
        case 6:
            return "22";
        case 7:
            return "23";
        case 8:
            return "24";
        case 9:
            return "31";
        case 10:
            return "32";
        case 11:
            return "33";
        case 12:
            return "34";
        case 13:
            return "41";
        case 14:
            return "42";
        case 15:
            return "43";
        case 16:
            return "44";
        default:
            return null;
    }
}

function getPadIndexFromString(padString) {
    switch (padString) {
        case "00":
            return 0;
        case "11":
            return 1;
        case "12":
            return 2;
        case "13":
            return 3;
        case "14":
            return 4;
        case "21":
            return 5;
        case "22":
            return 6;
        case "23":
            return 7;
        case "24":
            return 8;
        case "31":
            return 9;
        case "32":
            return 10;
        case "33":
            return 11;
        case "34":
            return 12;
        case "41":
            return 13;
        case "42":
            return 14;
        case "43":
            return 15;
        case "44":
            return 16;
        default:
            return -1;
    }
}

function setDeck(index) {
    if (index === -1) {
        // clear all deck
        for (var deck = 1; deck <= 4; deck++) {
            // color reset
            $("#deck_" + deck).css("background-color", "#9E9E9E");
        }
        for (var l = 0; l < 17; l++) {
            setGesture(getPadStringFromIndex(l), -1);
        }
    } else {
        var currentDeck = $("#deck_" + index);
        if (currentDeck.css("background-color") === "rgb(33, 150, 243)") {
            // was already selected
            currentDeck.css("background-color", "#9E9E9E");
            for (var k = 0; k < 17; k++) {
                setGesture(getPadStringFromIndex(k), -1);
            }
        } else {
            for (var deck = 1; deck <= 4; deck++) {
                if (deck == index) {
                    // selected
                    $("#deck_" + deck).css("background-color", "#2196F3");
                } else {
                    // color reset
                    $("#deck_" + deck).css("background-color", "#9E9E9E");
                }
            }

            for (var i = 0; i < 17; i++) {
                setGesture(getPadStringFromIndex(i), -1);
                for (var j = 0; j < 5; j++) {
                    if (sound[index - 1][i][j].length > 0) {
                        setGesture(getPadStringFromIndex(i), j);
                    }
                }
            }
        }
    }
}

function setGesture(pad, gesture) {
    console.log(pad + " - " + gesture);
    var obj = $("#pad_" + pad).find(".gesture");
    var tooltip = $("#pad_" + pad).find(".mdl-tooltip");
    // colors the padding
    switch (gesture) {
        case -1:
            // clear
            obj.css("background-color", obj.css("background-color").replace(/rgb[^/]+/g, "#9E9E9E"));
            obj.css("border-top", obj.css("border-top").replace(/rgb[^/]+/g, "#9E9E9E"));
            obj.css("border-right", obj.css("border-right").replace(/rgb[^/]+/g, "#9E9E9E"));
            obj.css("border-bottom", obj.css("border-bottom").replace(/rgb[^/]+/g, "#9E9E9E"));
            obj.css("border-left", obj.css("border-left").replace(/rgb[^/]+/g, "#9E9E9E"));
            tooltip.text("No sound loaded");
            break;
        case 0:
            obj.css("background-color", obj.css("background-color").replace(/rgb[^/]+/g, "#1E88E5"));
            appendTooltipText(tooltip, "normal");
            break;
        case 1:
            obj.css("border-top", obj.css("border-top").replace(/rgb[^/]+/g, "#1976D2"));
            appendTooltipText(tooltip, "top");
            break;
        case 2:
            obj.css("border-right", obj.css("border-right").replace(/rgb[^/]+/g, "#1976D2"));
            appendTooltipText(tooltip, "right");
            break;
        case 3:
            obj.css("border-bottom", obj.css("border-bottom").replace(/rgb[^/]+/g, "#1976D2"));
            appendTooltipText(tooltip, "bottom");
            break;
        case 4:
            obj.css("border-left", obj.css("border-left").replace(/rgb[^/]+/g, "#1976D2"));
            appendTooltipText(tooltip, "left");
            break;
        case undefined:
            console.error("Error on gesture index");
            break;
    }
}

function setDifficulty(diff) {
    difficulty = diff;
}

function appendTooltipText(object, value) {
    var obj = $(object);
    var text = obj.text();
    if (text === "No sound loaded") {
        obj.text(value);
    } else {
        obj.text(text + ", " + value);
    }
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
                sounds.file("sound_" + inputSoundFileNames[i], inputSounds[i]);
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
        $("#input_sounds_pad").fadeOut(200, function () {
            $(this).hide();
            setDeck(-1);
        });
        $("#input_" + id + "_div").delay(200).fadeIn(200);
        inputSoundFileNames = [];
        inputSounds = [];
        // reinitialize array
        initializeArray();
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
                            var fileName = file.name
                                .substring(0, file.name.lastIndexOf("."))
                                .match(/(\d_\d+_\d|\d_\d+)/)[0];
                            addSound(fileName);
                            inputSoundFileNames.push(fileName);
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
                // show pad preview
                $("#input_sounds_pad")
                    .hide().delay(400 + 5 * soundCount).fadeIn(200);
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

                        // URL blob to display image
                        // magically from:
                        // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
                        var blob = b64toBlob((e.target.result).replace(/.+,/, ""), image.type);
                        var blobUrl = URL.createObjectURL(blob);

                        $("#upload_" + id + "_preview").attr("src", blobUrl).hide().delay(200).fadeIn(200);
                        // insert clear button
                        $(clear)
                            .hide().appendTo(document.getElementById("upload_" + id + "_preview_div"))
                            .delay(200).fadeIn(200);

                        // return results, encoded with jsZip-compatible base64
                        window[result] = (e.target.result).replace(/.+,/, "");
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

function b64toBlob(b64Data, contentType, sliceSize) {
    // Brought here magically by:
    // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function getFileElement(name) {
    var text = document.createElement("P");
    text.className = "file-input-list";
    setText(text, name);
    return text;
}

function getGenre() {
    var custom = $("#preset_genre_custom").val();
    if (custom !== null && custom.length > 0) {
        // custom
        return custom;
    } else {
        return genre;
    }
}

function setDropDownMenu(element, textElement) {
    document.getElementById(element).innerText = textElement.innerText;

    // custom
    if (element === "dropdown-preset-genre") {
        genre = textElement.innerText;
        if (genre === "Custom") {
            // show genre input
            console.log("custom");
            $("#preset_genre_custom_section").hide().fadeIn(200);
        } else {
            $("#preset_genre_custom_section").hide();
            $("#preset_genre_custom").val("");
        }
    }
}

function isGesturePreset() {
    var type = $("#dropdown-preset-type").val();
    return type === "GESTURE PRESET";
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

function showHelp(id) {
    var help = $("#help_" + id);
    if (help.is(":visible")) {
        help.fadeOut(200, function () {
            $(this).hide();
        });
    } else {
        help.hide().fadeIn(200);
    }
}

function getTextNode(text) {
    return document.createTextNode(text);
}

function setText(object, text) {
    object.appendChild(getTextNode(text));
}