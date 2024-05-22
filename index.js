document.addEventListener("DOMContentLoaded", function () {
  const speedInput = document.getElementById("speed");
  const setSpeed = document.getElementById("btn");

  setSpeed.addEventListener("input", setPlaybackSpeed);

  speedInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      setPlaybackSpeed();
    }
  });

  function setPlaybackSpeed() {
    const rate = parseFloat(speedInput.value);
    if (!isNaN(rate) && rate >= 0.1) {
      // input valid xa ki nai check garne
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        function (tabs) {
          chrome.scripting.executeScript({
            target: {
              tabId: tabs[0].id,
            },
            func: function (rate) {
              var vid = document.querySelector("video");
              //   var rate = prompt("Set the playback rate");
              vid.playbackRate = rate;
            },
            args: [rate],
          });
        }
      );
    } else {
      alert("Invalid Entry!");
    }
  }
});
