import React from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Forecast({ data, unit }) {
  let daily = data.list.filter((x, y) => y % 10 === 9);
  daily.unshift(data.list[0]);
  return (
    <>
      {data && (
        <div className="forecast">
          <div className="hourly">
            <h5>3-HOUR FORECAST</h5>
            <ul>
              {data.list.slice(0, 10).map((item, idx) => {
                let time = item.dt_txt.split(" ")[1].slice(0, 2);

                return (
                  <li key={idx}>
                    <h4 className="hour">
                      {time > 12 ? `${time - 12}PM` : `${time}AM`}
                    </h4>
                    <div className="icon">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    <div className="temp">
                      {Number.parseFloat(
                        Math.round(item.main.temp) * unit + (unit > 1 ? 32 : 0)
                      ).toFixed(1)}
                      °
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="daily">
            <h5>5-DAY FORECAST</h5>
            <ul>
              {daily.map((item, idx) => {
                let numberOfDay = new Date(
                  item.dt_txt.split(" ")[0] + "T" + item.dt_txt.split(" ")[1]
                );
                let dayOfWeek = days[numberOfDay.getDay()];

                return (
                  <li key={idx}>
                    <h3>{dayOfWeek.slice(0, 3)}</h3>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt=""
                    />
                    <div className="high_low">
                      <span>
                        {Number.parseFloat(
                          Math.round(item.main.temp_min) * unit +
                            (unit > 1 ? 32 : 0)
                        ).toFixed(1)}
                        °
                      </span>
                      ----
                      <span>
                        {Number.parseFloat(
                          Math.round(item.main.temp_max) * unit +
                            (unit > 1 ? 32 : 0)
                        ).toFixed(1)}
                        °
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
