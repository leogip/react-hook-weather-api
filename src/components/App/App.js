import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/fetchWeather';

import { Search } from '../Search/Search';
import { Card } from '../Card/Card';
import { FavoriteCard } from '../FavoriteCard/FavoriteCard';

function App() {
  const [loading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState(
    JSON.parse(localStorage.getItem('favorite')) || []
  );
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    favoriteList.length !== 0 &&
      favoriteList.forEach(item => {
        fetchData(item).then(response => {
          const {
            location: { name, country },
            current: { temperature, weather_descriptions }
          } = response;
          const data = { name, country, temperature, weather_descriptions };
          setFavoriteWeather(oldArray => [...oldArray, data]);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeySearch = e => {
    if (e.key === 'Enter') {
      if (!query.trim()) return;
      setLoading(true);
      fetchData(query)
        .then(response => {
          if (response.success === false) {
            return;
          } else {
            setWeather(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
      setLoading(false);
    }
  };

  const handleChange = value => setQuery(value);

  const handleAddFavorite = name => {
    if (localStorage.getItem('favorite') && favoriteList) {
      const dataStorage = JSON.parse(localStorage.getItem('favorite'));
      if (!dataStorage.includes(name)) {
        setFavoriteList(oldArray => [...oldArray, name]);
        localStorage.setItem(
          'favorite',
          JSON.stringify([...dataStorage, name])
        );
        fetchData(name).then(response => {
          const {
            location: { name, country },
            current: { temperature, weather_descriptions }
          } = response;
          const data = { name, country, temperature, weather_descriptions };
          setFavoriteWeather(oldArray => [...oldArray, data]);
        });
      }
    } else {
      setFavoriteList([name]);
      localStorage.setItem('favorite', JSON.stringify([name]));
      fetchData(name).then(response => {
        const {
          location: { name, country },
          current: { temperature, weather_descriptions }
        } = response;
        const data = { name, country, temperature, weather_descriptions };
        setFavoriteWeather(oldArray => [...oldArray, data]);
      });
    }
  };

  const handleRemoveFavorite = removeName => {
    const dataStorage = JSON.parse(localStorage.getItem('favorite'));
    let index = dataStorage.indexOf(removeName);
    const newData = [...dataStorage.filter((_, i) => i !== index)];
    localStorage.setItem('favorite', JSON.stringify(newData));

    setFavoriteList(oldArray => {
      let index = oldArray.indexOf(removeName);
      return [...oldArray.filter((_, i) => i !== index)];
    });

    setFavoriteWeather(oldArray => [
      ...oldArray.filter(item => item.name !== removeName)
    ]);
  };

  const card = weather.length !== 0 && (
    <Card data={weather} handleAddFavorite={handleAddFavorite} />
  );

  const favoriteCards =
    favoriteWeather.length !== 0 && !loading
      ? favoriteWeather.map(item => {
          const { name, country, temperature, weather_descriptions } = item;

          return (
            <FavoriteCard
              key={name}
              name={name}
              country={country}
              temperature={temperature}
              weather_descriptions={weather_descriptions}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          );
        })
      : 'Favorite list empty';

  return (
    <div className="app theme">
      <main className="app__main">
        <Search
          handleKeySearch={handleKeySearch}
          handleChange={handleChange}
          query={query}
        />
        {card}
        <section className="app__latest latest">
          <h3>Your favorite city list</h3>
          {favoriteCards}
        </section>
      </main>
    </div>
  );
}

export default App;
