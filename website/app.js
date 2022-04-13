/* Global Variables */
// API Key
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// OpenWeatherMap API Key
const apiKey = ",&appid=a791e030b1ae76b53d9314d14eadf3f4&units=metric";
// server url
const server = "http://127.0.0.1:3000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
//------------------------------------------------------------------------------------------------

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", generate_weather);

/* Function called by event listener */

function generate_weather() {
  //check recieved data

  const zip = document.getElementById("zip").value;

  weatherD(baseURL, zip, apiKey)
    .then(function (res) {
      console.log(res);
      // add data to POST request
      postData("/add", { date: newDate, temp: Math.round(res.main.temp), description: res.weather, city: res.name});
    })

    .then(function (res) {
      // call updateUI to update browser content
      updateUI();
      document.getElementById("entry").style.opacity = 1;
    });
}

/* Function to GET Web API Data*/
const weatherD = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const weather_data = await res.json();
    console.log("weather data: ", weather_data)
    return weather_data;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */

const postData = async (url = "", info = {}) => {
  console.log("infooo: ",info)

  const feelcontent = document.getElementById("feelings").value;
  console.log("felllllllll: ",feelcontent)

  const req = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    body: JSON.stringify({
      date: info.date,

      temp: info.temp,

      content: feelcontent,

      city: info.city,

      description: info.description[0].description,
      
    }),
  });

  try {
    const Data = await req.json();

    return Data;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const receivedAllData = await request.json();

    // show icons on the page
    // update new entry values
    document.getElementById("temp").innerHTML = receivedAllData.temp + "&degC";
    document.getElementById("description").innerHTML = receivedAllData.description;
    document.getElementById("date").innerHTML = receivedAllData.date;
    document.getElementById("city").innerHTML = receivedAllData.city;
    document.getElementById("content").innerHTML = receivedAllData.content;


  } catch (error) {
    console.log("error", error);
  }
};
