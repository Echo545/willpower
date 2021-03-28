import Vue from "vue";
import ScreenWall from "./components/ScreenWall.vue";
import { readData } from "./assets/modules/chrome";

Vue.config.productionTip = false;

const showScreenWall = (data, matchedPattern) => {
  const anchor = document.createElement("div");
  anchor.id = "oh-really-mega-app";

  document.body.appendChild(anchor);

  new Vue({
    render: (h) => h(ScreenWall, {
      props: {
        proceedCount: data.proceedCount || 0,
        fuckItCount: data.fuckItCount || 0,
        shownCount: data.shownCount || 0,
        pattern: matchedPattern,
        proceedTimer: data.proceedTimer || 15
      }
    }),
  }).$mount("#oh-really-mega-app");
};

const STORAGE_KEYS = [
  "proceedCount",
  "fuckItCount",
  "shownCount",
  "patterns",
  "activePatterns",
  "proceedTimer"
];
const MAX_BROWSING_TIME = 15; // min

readData(STORAGE_KEYS, data => {
  console.log("--> OH REALLY DATA ", data);
  console.log("--> ACTIVE PATTERNS: ", data.activePatterns);

  const patterns = (data.patterns || []).map(p => p.value.replaceAll(".", "\\.").replaceAll("*", ".*"));

  const matchedPattern = patterns.find(pattern => {
    const regex = new RegExp(pattern);

    return regex.test(window.location.href);
  });

  if(matchedPattern) {
    const activePatterns = data.activePatterns || {};
    let activeAt = activePatterns[matchedPattern];
    console.log("--> ACTIVE_AT: ", activeAt);

    if(activeAt) {
      try {
        activeAt = new Date(activeAt);
      } catch(error) {
        console.log("--> ACTIVE AT ERROR: ", error);

        showScreenWall(data, matchedPattern);
      }
      const now = (new Date()).getTime();

      if((now - activeAt) / 1000 / 60 > MAX_BROWSING_TIME) {
        showScreenWall(data, matchedPattern);
      }
    } else {
      showScreenWall(data, matchedPattern);
    }
  }
});
