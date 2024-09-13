// let BASE_URL: string = 'https://movies-backend-alpha.vercel.app/api';
let BASE_URL: string = 'http://192.168.1.67:8000/api';
// let BASE_URL: string = 'http://192.168.1.10:8000/api';

//list of movies of different genres
export const upcoming_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/upcoming/${page}`);
  const movies = await response.json();
  return movies;
};

export const horror_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/horror/${page}`);
  const movies = await response.json();
  return movies;
};

export const comedy_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/comedy/${page}`);
  const movies = await response.json();
  return movies;
};

export const scifi_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/scifi/${page}`);
  const movies = await response.json();
  return movies;
};

export const animation_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/animation/${page}`);
  const movies = await response.json();
  return movies;
};

export const romance_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/romance/${page}`);
  const movies = await response.json();
  return movies;
};

export const trending_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/trending/${page}`);
  const movies = await response.json();
  return movies;
};

export const western_movies = async (page: any) => {
  const response = await fetch(`${BASE_URL}/western/${page}`);
  const movies = await response.json();
  return movies;
};

export const single_movies = async (id: number) => {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  const movies = await response.json();
  return movies;
};

export const movies_videos = async (movieID: number) => {
  const response = await fetch(`${BASE_URL}/videos/${movieID}`);
  const movies = await response.json();
  return movies;
};

export const movies_cast = async (movieID: number) => {
  const response = await fetch(`${BASE_URL}/credits/${movieID}`);
  const movies = await response.json();
  return movies;
};

export const recommended_movies = async (movieID: number) => {
  const response = await fetch(`${BASE_URL}/recommendations/${movieID}`);
  const movies = await response.json();
  return movies;
};

//list of api for authentication and authorization
export const signUp = async (payload: any) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
};

export const signIn = async (payload: any) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
};

export const recordTrailerWatch = async (payload: any) => {
  console.log(payload);
  return fetch(`${BASE_URL}/recordtrailer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
};

export const trailer_movies = async (id: any) => {
  const response = await fetch(`${BASE_URL}/gettrailer/${id}`);
  const movies = await response.json();
  return movies;
};

export const uplaodImage = async (payload: any, id: any) => {
  return fetch(`${BASE_URL}/profile/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: payload,
  })
    .then(response => response.json())
    .catch(error => {});
};

export const getProfile = async (id: any) => {
  const response = await fetch(`${BASE_URL}/profile/${id}`);
  const profile = await response.json();
  return profile;
};
