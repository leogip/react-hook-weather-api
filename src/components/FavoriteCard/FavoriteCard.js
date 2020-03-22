import React from 'react';
import { getImageWeather } from '../../utils/getImageWeather';

import './FavoriteCard.css';

export const FavoriteCard = ({
  name,
  country,
  temperature,
  weather_descriptions,
  handleRemoveFavorite
}) => {
  return (
    <div className="latest__box theme_color_weather_sun">
      <div className="latest__content">
        <h3 className="latest__location">
          {name}, {country}
        </h3>
        <div className="latest__temp">
          {temperature}&deg; {weather_descriptions}
        </div>
      </div>
      <img
        src={getImageWeather(weather_descriptions)}
        alt={weather_descriptions}
        className="latest__image"
      />
      <button
        className="latest__remove"
        onClick={() => handleRemoveFavorite(name)}>
        &times;
      </button>
    </div>
  );
};
