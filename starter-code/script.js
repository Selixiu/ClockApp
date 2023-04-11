const upperDiv = document.querySelector(".upper-div");
const lowerDiv = document.querySelector(".lower-div");
const moreBttn = document.querySelector(".bttn");
const quoteContainer = document.querySelector(".quote-container");
const verticalCont = document.querySelector(".vertical-container");
const bttnText = document.querySelector(".bttn-text");
const arrow = document.querySelector(".arrow");
const greetingMsg = document.querySelector(".greeting-msg");
const sunIcon = document.querySelector(".daytime-indicator");
const moonIcon = document.querySelector(".nighttime-indicator");
const section = document.querySelector(".sec");
const child = document.querySelectorAll(".child");
const quoteLine = document.querySelector(".quote-paragraph");
const author = document.querySelector(".author");
const refreshBttn = document.querySelector(".refresh-bttn");
//
const timeSetup = document.querySelector(".time-paragraph");
const locationSetUp = document.querySelector(".location-paragraph");
const currentTimeZone = document.querySelector(".lower-location");
const doy = document.querySelector(".dayof-year");
const dow = document.querySelector(".dayof-week");
const numberOfWeek = document.querySelector(".week-number");

const time = document.querySelector(".time-paragraph");
const cityCountry = document.querySelector(".location-paragraph");
const greeting = document.querySelector(".greeting-paragraph");
const quoteGenerator = async () => {
  const quote = await fetch("https://api.quotable.io/random");
  const quoteResult = await quote.json();
  quoteLine.innerHTML = quoteResult.content;
  author.innerHTML = quoteResult.author;
};
quoteGenerator();

const receiveIp = async () => {
  const myIp = await fetch("http://worldtimeapi.org/api/ip");
  const ipInfo = await myIp.json();
  //Updating the DOM
  let time;
  let start;
  let end;
  start = ipInfo.datetime.indexOf("T");
  end = start + 6;
  time = ipInfo.datetime.slice(start + 1, end);
  timeSetup.innerHTML = time;
  currentTimeZone.innerHTML = ipInfo.timezone;
  doy.innerHTML = ipInfo.day_of_year;
  dow.innerHTML = ipInfo.day_of_week;
  numberOfWeek.innerHTML = ipInfo.week_number;
  const locationAid = ipInfo.timezone.slice(
    ipInfo.timezone.indexOf("/") + 1,
    ipInfo.timezone.length
  );
  locationSetUp.innerHTML = locationAid;
  const timeSlice = 05;

  let timeOfDay;
  let firstBit = 17;
  // let firstBit = parseInt(time.slice(0, 2));

  function dayMode() {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    if (window.innerWidth > 800) {
      section.style.backgroundImage =
        "url(./assets/desktop/bg-imagePS1-daytime.jpg)";
    }
    if (window.innerWidth < 800) {
      section.style.backgroundImage =
        "url(./assets/mobile/bg-image2-daytime.jpg)";
    }
  }
  function nightMode() {
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
    child.forEach((elem) => (elem.style.color = "white"));
    if (window.innerWidth > 800) {
      section.style.backgroundImage =
        "url(./assets/desktop/bg-image-nighttime.jpg)";
    }
    if (window.innerWidth < 800) {
      section.style.backgroundImage =
        "url(./assets/mobile/bg-image-nighttime.jpg)";
    }
  }
  if (firstBit >= 05 && firstBit < 12) {
    timeOfDay = "morning";

    dayMode();
    greetingMsg.innerHTML = `Good ${timeOfDay}, it's currently`;
  }
  if (firstBit >= 12 && firstBit < 18) {
    timeOfDay = "afternoon";
    dayMode();
    greetingMsg.innerHTML = `Good ${timeOfDay}, it's currently`;
  }
  if (firstBit >= 18 && firstBit <= 23) {
    timeOfDay = "evening";
    document.documentElement.style.setProperty(
      "--lowerdiv-background",
      "black"
    );
    nightMode();
    greetingMsg.innerHTML = `Good ${timeOfDay}, it's currently`;
  }
  if (firstBit >= 00 && firstBit < 05) {
    timeOfDay = "evening";
    document.documentElement.style.setProperty(
      "--lowerdiv-background",
      "black"
    );
    nightMode();
    greetingMsg.innerHTML = `Good ${timeOfDay}, it's currently`;
  }
};
receiveIp();
setTimeout(function () {
  setInterval(receiveIp, 1000);
}, 2000);
// setInterval(receiveIp, 10000);
function more() {
  lowerDiv.classList.contains("hidden")
    ? lowerDiv.classList.remove("hidden")
    : lowerDiv.classList.add("hidden");

  lowerDiv.classList.contains("hidden")
    ? quoteContainer.classList.remove("hidden")
    : quoteContainer.classList.add("hidden");
  lowerDiv.classList.contains("hidden")
    ? (verticalCont.style.justifyContent = "space-between")
    : (verticalCont.style.justifyContent = "space-around");
  lowerDiv.classList.contains("hidden")
    ? (bttnText.innerHTML = `More `)
    : (bttnText.innerHTML = "Less");
  lowerDiv.classList.contains("hidden")
    ? arrow.classList.add("rotate")
    : arrow.classList.remove("rotate");
}
moreBttn.addEventListener("click", more);
refreshBttn.addEventListener("click", quoteGenerator);
