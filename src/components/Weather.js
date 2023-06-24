import react from "react";
import { useState } from "react";
import "./weather.css";
import DisplayWeather from "./DisplayWeather";
function Weather() {
  const APIKEY = "edceb7c01c372b4a837cd8f992fda715";

  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  const [weather, setWeather] = useState([]);

  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({
        data: data,
      });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
    console.log(form.city, form.country);
  };

  return (
    <div className="weather">
      <span className="title">weather app</span>
      <br />
      <form>
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="country"
          placeholder="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getWeather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
