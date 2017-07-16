var sound_count;
function makeJSON() {
    var jsonObject = {
        "about": {
            "actionbar_color": $("#song_theme_color").val(),
            "bio": {
                "name": $("#bio_name").val(),
                "preset_name": "CUSTOM_VALUE_NO_INPUT_NEEDED",
                "source": $("#bio_source").val(),
                "text": $("#bio_text").val(),
                "title": $("#song_artist").val() + "\u0027s biography"
            },
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
            "preset_creator": $("#song_preset_creator").val(),
            "preset_name": "CUSTOM_VALUE_NO_INPUT_NEEDED",
            "title": $("#song_title").val(),
            "tutorial_link": $("#song_tutorial_link").val()
        },
        "firebase_location": "CUSTOM_VALUE_NO_INPUT_NEEDED",
        "music": {
            "bpm": $("#song_bpm").val(),
            "file_name": "CUSTOM_VALUE_NO_INPUT_NEEDED",
            "is_gesture": isGesturePreset(),
            "name": "CUSTOM_VALUE_NO_INPUT_NEEDED",
            "sound_count": "PROGRAMMATIC_INPUT"
        }
    };
    //change object into String
    var jsonStr = JSON.stringify(jsonObject);
    console.log(jsonStr);
}

function createPreset() {
    //if create button clicked
    makeJSON();
    sound_count = document.getElementById("upload_sound").files.length;
    alert(sound_count); //test for sound_count
}

function locateSound() {
}

function setDropDownMenu(string) {
    document.getElementById("dropdown-preset-type").innerText = string;
}

function isGesturePreset() {
    var type = document.getElementById("dropdown-preset-type").innerText;
    if (type === "GESTURE PRESET") {
        return true;
    } else {
        return false;
    }
}
