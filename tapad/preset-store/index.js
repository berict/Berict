$(document).ready(
    function () {
        $.ajax({
            url: "https://firebasestorage.googleapis.com/v0/b/tapad-4d342.appspot.com/o/presets%2Fmetadata?alt=media&token=c2e8e053-397d-484b-87b0-f84ef5e9e083",
            success: function (result) {
                alert(result);
            },
            error: function () {
                alert("unji");
            }
        });
    }
);
