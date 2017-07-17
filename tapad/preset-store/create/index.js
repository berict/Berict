var sound_count;
var audiofolder=0;
var pubstr;
var chdimg1=0,chdimg2=0,chdimg3=0;
var imglink = new Array();
zip = new JSZip();
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
            "sound_count": sound_count
        }
    };
    //change object into String
    var jsonStr = JSON.stringify(jsonObject);
    pubstr = jsonStr;
    console.log(jsonStr);
}
function createPreset() {
if(audiofolder==0)
{
  alert("Please upload audio folder.")
}
else if(chdimg1==0||chdimg2==0||chdimg3==0)
{
  alert("Please upload all files.");
}
else if($("#song_bpm").val()==""||$("#song_tutorial_link").val()==""||$("#song_title").val()==""||$("#song_preset_creator").val()==""||$("#store_pandora").val()==""||$("#store_amazon").val()==""||$("#store_apple").val()==""||$("#story_googleplay").val()==""||$("#store_spotify").val()==""||$("#store_youtube").val()==""||$("#store_soundcloud").val()==""||$("#song_artist").val()==""||$("#artist_web").val()==""||$("#artist_youtube").val()==""||$("#artist_google").val()==""||$("#artist_insta").val()==""||$("#artist_soundcloud").val()==""||$("#artist_twitter").val()==""||$("#artist_facebook").val()==""||
$("#song_artist").val()==""||$("#bio_text").val()==""||$("#bio_source").val()==""||$("#bio_name").val()==""||$("#song_theme_color").val()==""){
  alert("Please fill out all information.");
}
else
{
  //if create button clicked
  var reader = new FileReader();
  sound_count = document.getElementById("upload_sound").files.length;
  makeJSON(); //make JSON with changed sound_count
  alert(sound_count); //test for sound_count
  var zip = new JSZip(); //make zip file
  var about = zip.folder("about");
  var sounds = zip.folder("sounds");
  var timing = zip.folder("timing");
  about.file("json", pubstr); //create JSON.txt
  var pattern = /.+,/g;
  for(var i=0; i<imglink.length; i++)
  {
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
  zip.generateAsync({type:"blob"})
  .then(function(content) {
  saveAs(content, "preset.zip"); //save zip file
});
}
}

function locateSound() {
}

function changed(){
  audiofolder=1;
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
$(function() {
            $("#albumart").on('change', function(){
                readURL1(this);
            });
        });
$(function() {
            $("#artist_image").on('change', function(){
                readURL2(this);
            });
        });
$(function() {
            $("#artist_icon").on('change', function(){
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
                }

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
                }

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
                }

              reader.readAsDataURL(input.files[0]);
            }
        }
