import imageRain from '../assets/rain.svg';
import imageCloudy from '../assets/cloudy.svg';
import imageSun from '../assets/sun.svg';

export const getImageWeather = weather => {
  switch (weather) {
    case weather.includes('rain'):
      return imageRain;

    case weather.includes('cloudy'):
      return imageCloudy;

    default:
      return imageSun;
  }
};
