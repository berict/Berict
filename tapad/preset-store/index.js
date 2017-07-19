$(document).ready(function(){
  $.getJSON("https://firebasestorage.googleapis.com/v0/b/tapad-4d342.appspot.com/o/presets%2Fmetadata?alt=media",
    function(data){
      alert("success");
    }
  );
});
