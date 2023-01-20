/* eslint-disable no-console */
const urls = [
  'https://swapi.dev/api/planets/',
  'https://swapi.dev/api/planets/?page=2',
  'https://swapi.dev/api/planets/?page=3',
  'https://swapi.dev/api/planets/?page=4',
  'https://swapi.dev/api/planets/?page=5',
  'https://swapi.dev/api/planets/?page=6',
];

const urlsPeople = [
  'https://swapi.dev/api/people/',
  'https://swapi.dev/api/people/?page=2',
  'https://swapi.dev/api/people/?page=3',
  'https://swapi.dev/api/people/?page=4',
  'https://swapi.dev/api/people/?page=5',
  'https://swapi.dev/api/people/?page=6',
  'https://swapi.dev/api/people/?page=7',
  'https://swapi.dev/api/people/?page=8',
  'https://swapi.dev/api/people/?page=9',
];

const urlBase = 'https://swapi.dev/api';
const imgBase = 'https://starwars-visualguide.com/assets/img';

export const checkStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response);
  }

  return Promise.reject(new Error(response.statusText));
};

export const getPlanets = async () => {
  const results = await Promise.all(
    urls.map((url) => fetch(url)
      .then(checkStatus)
      .then((res) => res.json())
      .catch((err) => console.log(err))),
  );

  const planets = results.reduce((acc, curr) => {
    return [...acc, ...curr.results];
  }, []);

  return planets;
};

export const getResourse = async (url) => {
  const res = await fetch(`${urlBase}${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} , received ${res.status}`);
  }

  return res.json();
};

export const getPeople = async () => {
  const results = await Promise.all(
    urlsPeople.map((url) => fetch(url)
      .then(checkStatus)
      .then((res) => res.json())
      .catch((err) => console.log(err))),
  );

  const people = results.reduce((acc, curr) => {
    return [...acc, ...curr.results];
  }, []);

  return people;
};

export const getPlanetById = async (id) => {
  const planet = await getResourse(`/planets/${id}`);

  return planet;
};

export const getPlanetImg = (id) => {
  return `${imgBase}/planets/${id}.jpg`;
};

export const getFilmById = async (id) => {
  const film = await getResourse(`/films/${id}`);

  return film;
};

export const getPersonById = async (id) => {
  const person = await getResourse(`/people/${id}`);

  return person;
};

export const getItemByUrl = async (url) => {
  const res = await fetch(`${url}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url} , received ${res.status}`);
  }

  return res.json();
};

export const getPersonImg = (id) => {
  return `${imgBase}/characters/${id}.jpg`;
};
