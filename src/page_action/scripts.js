function urlParamToggler(paramName) {
    chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function (tabs) {
            var url = tabs[0].url;
            if (url.includes("bubbleapps.io") == true) {
                tabURL = new URL(url.toString());
                console.log(tabURL);

                let params = new URLSearchParams(tabURL.search.slice(1));
                console.log(params.toString());

                if (params.has(paramName) == false) {
                    params.set(paramName, true);
                    chrome.tabs.update(tabs.id, {
                        url: tabURL + '?' + params
                    });
                    // window.close();
                } else {
                    chrome.tabs.update(tabs.id, {
                        url: tabURL.origin + tabURL.pathname
                    });
                    // window.close();
                }

            } else {
                alert("This ain't no Bubble.io app!");
            }
        }
    );
}

function urlVersionToggler(versionName) {
    chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        },
        function (tabs) {
            var url = tabs[0].url;
            if (url.includes("bubbleapps.io") == true) {
                tabURL = new URL(url.toString());
                // console.log(tabURL);
                let params = new URLSearchParams(tabURL.search.slice(1));
                let version = tabURL.pathname.slice(1);
                let newVersion = version.replace(versionName, "")
                // console.log(version.replace("version-test",""));
                // console.log(params.toString());
                // console.log(tabURL.origin + newVersion + '?' + params)
                if (params != null && params != "") {
                    if (url.includes(versionName) == false) {
                        // console.log(tabURL.origin + versionName + '?' + params)
                        chrome.tabs.update(tabs.id, {
                            url: tabURL.origin + '/' + versionName  + '/' + newVersion + '?' + params
                        });
                        // console.log('Updated to: ' + versionName)
                    }
                    else {
                        // console.log(tabURL.origin + newVersion + '?' + params)
                        chrome.tabs.update(tabs.id, {
                            url: tabURL.origin + newVersion + '?' + params
                        });
                        // console.log('Updated to: ' + newVersion)
                    }
                } else {
                    if (url.includes(versionName) == false) {
                        // console.log(tabURL.origin + versionName)
                        chrome.tabs.update(tabs.id, {
                            url: tabURL.origin + '/' + versionName + '/' + newVersion
                        });
                        // console.log('Updated to: ' + versionName)
                    }
                    else {
                        // console.log(tabURL.origin + newVersion )
                        chrome.tabs.update(tabs.id, {
                            url: tabURL.origin + newVersion
                        });
                        // console.log('Updated to: ' + newVersion)
                    }
                } 

            } else {
                alert("This ain't no Bubble.io app!");
            }
        }
    );
}

document.addEventListener('DOMContentLoaded', function () {
    var debugToggle = document.getElementById('debugtoggle');
    // onClick's logic below:
    debugToggle.addEventListener('click', function () {
        urlParamToggler('debug_mode');
    });
    var versionToggle = document.getElementById('versiontoggle');
    // onClick's logic below:
    versionToggle.addEventListener('click', function () {
        urlVersionToggler('version-test');
    });
});

// var gear = document.getElementsByClassName('gear')[0];
// var bubble = document.getElementById('bubble');
// if (gearbubble) {
//     gear.addEventListener('animationend', function (e) {
//         gear.classList.remove('fast');
//     });

//     bubble.addEventListener('mouseover', function (e) {
//         gear.classList.add('fast')
//     })
// }