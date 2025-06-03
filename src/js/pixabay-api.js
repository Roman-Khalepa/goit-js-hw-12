import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50644019-b9f34b82140387cf531c9f13f'; // заміни на свій ключ

export async function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
