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

//---------------------------------------------------------------------------
const getCountryWeather = () => {
  //get value after click on the button
  const zipCode = document.getElementById("zip").value;

  getWeatherData(zipCode).then((data) => {
    //check recieved data
    if (data) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = data;

      const dataInfo = {
        newDate,
        city,
        temp: Math.round(temp), // integer temp
        description,
      };

      postData(server + "/add", dataInfo);
      getData();
      document.getElementById("entry").style.opacity = 3;
    }
  });
};
// fire get weather function on click event on generate button
document
  .getElementById("generate")
  .addEventListener("click", getCountryWeather);

//get weather api data
const getWeatherData = async (zipCode) => {
  try {
    const res = await fetch(baseURL + zipCode + apiKey);
    const data = await res.json();
    if (data.cod != 200) {
      throw data.message;
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Function to POST data
const postData = async (url = "", dataInfo = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInfo),
  });

  try {
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

// get data and update UI
const getData = async () => {
  const res = await fetch(server + "/all");
  try {
    const data = await res.json();
    document.getElementById("date").innerHTML = data.newDate;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("temp").innerHTML = data.temp + "&degC";
    document.getElementById("description").innerHTML = data.description;
  } catch (err) {
    console.log(err);
  }
};
