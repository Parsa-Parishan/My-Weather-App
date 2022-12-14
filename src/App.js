import { useState } from "react";
import Search from "./components/Search.js";
import { weatherAPIURL, weatherAPIKey } from "./data/data";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import { CSSTransition } from "react-transition-group";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState(1);
  const [transition, setTransition] = useState(false);

  const handleSearch = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");
    console.log(searchData);
    const currentWeatherFetch = fetch(
      `${weatherAPIURL}/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`
    );

    const forecast = fetch(
      `${weatherAPIURL}/forecast?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecast])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        const forecastResponse = await response[1].json();
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setUnit(() => e.target.value);
  };

  const handleTransition = () => {
    setTransition(!transition);
  };

  return (
    <div className="App">
      <Search handleSearch={handleSearch} transition={handleTransition} />
      {currentWeather && (
        <div onChange={handleChange} className="convert">
          <span className="unit">
            <input
              type="radio"
              id="celcius"
              name="unit"
              value={1}
              defaultChecked={true}
            />
            <label htmlFor="celcius">C</label>
          </span>
          <span className="unit">
            <input type="radio" id="farenheit" name="unit" value={1.8} />
            <label htmlFor="farenheit" id="farenheit">
              F
            </label>
          </span>
        </div>
      )}
      <Loader />
      <CSSTransition
        in={transition}
        timeout={500}
        classNames="appear"
        onEnter={() => handleTransition}
        onExited={() => handleTransition}
      >
        <Current data={currentWeather} unit={unit} />
      </CSSTransition>
      {forecast && <Forecast data={forecast} unit={unit} />}
    </div>
  );
}

export default App;
