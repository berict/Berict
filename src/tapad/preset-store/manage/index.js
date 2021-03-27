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
    // TODO add update code
    // use adminMongo for now
}

function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}