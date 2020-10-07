// Function to toggle a defined URL parameter on or off
function urlParamToggler(paramName) {
  chrome.tabs.query(
    {
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT,
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
            url: tabURL + "?" + params,
          });
        } else {
          chrome.tabs.update(tabs.id, {
            url: tabURL.origin + tabURL.pathname,
          });
        }
      } else {
        alert("This ain't no Bubble.io app!");
      }
    }
  );
}

// Function to toggle between a defined version and live
function urlVersionToggler(versionName) {
  chrome.tabs.query(
    {
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT,
    },
    function (tabs) {
      var url = tabs[0].url;
      if (url.includes("bubbleapps.io") == true) {
        tabURL = new URL(url.toString());
        let params = new URLSearchParams(tabURL.search.slice(1));
        let version = tabURL.pathname.slice(1);
        let newVersion = version.replace(versionName, "");
        if (params != null && params != "") {
          if (url.includes(versionName) == false) {
            chrome.tabs.update(tabs.id, {
              url:
                tabURL.origin +
                "/" +
                versionName +
                "/" +
                newVersion +
                "?" +
                params,
            });
          } else {
            chrome.tabs.update(tabs.id, {
              url: tabURL.origin + newVersion + "?" + params,
            });
          }
        } else {
          if (url.includes(versionName) == false) {
            chrome.tabs.update(tabs.id, {
              url: tabURL.origin + "/" + versionName + "/" + newVersion,
            });
          } else {
            chrome.tabs.update(tabs.id, {
              url: tabURL.origin + newVersion,
            });
          }
        }
      } else {
        alert("This ain't no Bubble.io app!");
      }
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var debugToggle = document.getElementById("debugtoggle");
  debugToggle.addEventListener("click", function () {
    urlParamToggler("debug_mode");
  });
  var versionToggle = document.getElementById("versiontoggle");
  versionToggle.addEventListener("click", function () {
    urlVersionToggler("version-test");
  });
});
