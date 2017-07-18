$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "https://firebasestorage.googleapis.com/v0/b/tapad-4d342.appspot.com/o/presets%2Fmetadata?alt=media",
      success: function(data){
        var testjson = eval(data);
        document.getElementById("preset_name").innerHTML += testjson[0].about.title;
      }
  })
})
