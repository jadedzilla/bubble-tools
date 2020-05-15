function urlAppendToggler(appendStringTrue, appendStringFalse) {
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            var url = tabs[0].url;
            if (url.includes("bubbleapps.io") == true) {
                if (url.indexOf(appendStringTrue) > -1) {
                    chrome.tabs.update(tabs.id, { url: url += appendStringFalse });
                    window.close();
                } else {
                    chrome.tabs.update(tabs.id, { url: url += appendStringTrue });
                    window.close();
                }
            }
            else {
                alert("This ain't no Bubble.io app!");
            }
        }
    );
}
document.addEventListener('DOMContentLoaded', function () {
    var debugToggle = document.getElementById('debugtoggle');
    // onClick's logic below:
    debugToggle.addEventListener('click', function () {
        urlAppendToggler('?debug_mode=true', '?debug_mode=false');
    });
    var versionToggle = document.getElementById('versiontoggle');
    // onClick's logic below:
    versionToggle.addEventListener('click', function () {
        urlAppendToggler('version-test', '/');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var versionToggle = document.getElementById('versiontoggle');
    // onClick's logic below:
    versionToggle.addEventListener('click', function () {
        urlAppendToggler('version-test', '/index');
        alert("Pardon me, that button is broken.");
    });
});

// if (url.indexOf('version-test') > -1) {
//     chrome.tabs.update(tabs.id, { url: url += 'version-test?debug_mode=true' });
//     window.close();
//     alert('Debug mode activated!');
// } else {
//     chrome.tabs.update(tabs.id, { url: url += 'version-test?debug_mode=false' });
//     window.close();
//     alert('Debug mode deactivated!');
// }