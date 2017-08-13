function parseGitHub() {
    document.getElementById("version_code").focus();
    var versionCode = $("#version_code");
    versionCode.val(getLatestRelease());
    versionCode.parent().addClass("is-dirty");
}

function getLatestRelease() {
    var latestRelease = JSON.parse(httpGet("https://api.github.com/repos/berict/Tapad/releases/latest"));
    var latestReleaseTagName = latestRelease.tag_name;
    var tags = JSON.parse(httpGet("https://api.github.com/repos/berict/Tapad/tags"));
    var commitUrl;
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].name == latestReleaseTagName) {
            // commit url should be like this : https://api.github.com/repos/berict/Tapad/commits/########################################
            // url should be replaced to      : https://raw.githubusercontent.com/berict/Tapad/########################################
            commitUrl = tags[i].commit.url.replace("api.github.com/repos", "raw.githubusercontent.com").replace("commits/", "");
            console.log(commitUrl + "/app/build.gradle");
            break;
        }
    }
    var gradle = httpGet(commitUrl + "/app/build.gradle");
    var versionCode = parseInt(gradle.substring(gradle.search("versionCode") + 12, gradle.search("versionName") - 1));
    return versionCode;
}

function updateVersionCode() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (document.getElementById("version_code").value.length != 0) {
                firebase.database().ref().update({
                    versionCode: parseInt(document.getElementById("version_code").value)
                });
            } else {
                console.error("Input error");
            }
        } else {
            // need auth
            var email = prompt("Sign in email");
            var password = prompt("Sign in password");
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + " - " + errorMessage);
            });
        }
    });
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

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
    }
);
