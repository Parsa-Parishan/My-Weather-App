import React, { useState, useEffect } from "react";
import {
  FaTemperatureLow,
  FaWind,
  FaTachometerAlt,
  FaWater,
} from "react-icons/fa";
import clear_day from "../background/clear_day.gif";
import clear_night from "../background/clear_night.gif";
import cloudy_day from "../background/cloudy_day.gif";
import cloudy_night from "../background/cloudy_night.gif";
import rain_day from "../background/rain_day.gif";
import rain_night from "../background/rain_night.gif";
import snow from "../background/snow.gif";
import thunderstorm from "../background/thunderstorm.gif";


export default function Current({ data, unit }) {
  return (
    <>
      <div className="current">
        <div className="main">
          <div className="city">
            <p>{data.city}</p>
          </div>
          <div className="temp">
            <p>
              {Number.parseFloat(
                Math.round(data.main.temp) * unit + (unit > 1 ? 32 : 0)
              ).toFixed(1)}
              °
            </p>
          </div>
          <div className="description">
            <p>{data.weather[0].description}</p>
          </div>
          <div className="high_low">
            <p>
              H:{" "}
              {Number.parseFloat(
                Math.round(data.main.temp_max) * unit + (unit > 1 ? 32 : 0)
              ).toFixed(1)}
              °
            </p>
            <p>
              L:{" "}
              {Number.parseFloat(
                Math.round(data.main.temp_min) * unit + (unit > 1 ? 32 : 0)
              ).toFixed(1)}
              °
            </p>
          </div>
        </div>
        <div className="details">
          <div className="feels">
            <p className="label">
              {" "}
              <FaTemperatureLow style={{ marginRight: 5 }} />
              FEELS LIKE
            </p>
            <p className="value">
              {Number.parseFloat(
                Math.round(data.main.feels_like) * unit + (unit > 1 ? 32 : 0)
              ).toFixed(1)}
              °
            </p>
          </div>
          <div className="wind">
            <p className="label">
              <FaWind style={{ marginRight: 5 }} /> WIND
            </p>
            <p className="value">{data.wind.speed} m/s</p>
          </div>
          <div className="humidity">
            <p className="label">
              <FaWater style={{ marginRight: 5 }} /> HUMIDITY
            </p>
            <p className="value">{data.main.humidity}%</p>
          </div>
          <div className="pressure">
            <p className="label">
              <FaTachometerAlt style={{ marginRight: 5 }} /> PRESSURE
            </p>
            <p className="value">{data.main.pressure} hpa</p>
          </div>
        </div>
      </div>
    </>
  );
}
