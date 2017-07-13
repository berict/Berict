function makeJSON(){
  var jsonObject = [
    {"song_title" : $("#song_title").val()},
    {"song_preset_creator" : $("#song_preset_creator").val()}, //make JSON manually because HTML's inputs are customized
    {"song_theme_color" : $("#song_theme_color").val()},
    {"song_tutorial_link" : $("#song_tutorial_link").val()},
    {"song_bpm" : $("#song_bpm").val()}
  ]
  var jsonStr = JSON.stringify(jsonObject); //change object into String
  console.log(jsonStr);
}

function createPreset(){ //if create button clicked
  makeJSON();
}
