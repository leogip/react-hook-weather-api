const api = {
  key: '3007c9f12d23efbfc3caa8b9cf11ff06',
  base: 'http://api.weatherstack.com/'
};

export async function fetchData(query) {
  const res = await fetch(
    `${api.base}current?access_key=${api.key}&query=${query}&units=m`
  );

  return await res.json();
}
