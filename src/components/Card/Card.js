import React from 'react';
import { getImageWeather } from '../../utils/getImageWeather';

import './Card.css';

export const Card = ({ data, handleAddFavorite }) => {
  const { location, current } = data;

  return (
    <section className="app__card card theme_color_weather_default">
      <div className="card__header">
        <h3 className="card__location">
          {location.name}, {location.country}
        </h3>
        <button
          className="card__add"
          onClick={() => handleAddFavorite(location.name)}>
          +
        </button>
      </div>
      <img
        src={getImageWeather(current.weather_descriptions)}
        alt={current.weather_descriptions}
        className="card__image"
      />
      <h2 className="card__temperature">
        {current.temperature}&deg; {current.weather_descriptions}
      </h2>
      <div className="card__more">
        <div>
          <div className="card__point">
            Wind <strong>{current.wind_speed} км/ч</strong>
          </div>
          <div className="card__point">
            Feelslike <strong>{current.feelslike}&deg;</strong>
          </div>
        </div>
        <div>
          <div className="card__point">
            Humidity <strong>{current.humidity}%</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
