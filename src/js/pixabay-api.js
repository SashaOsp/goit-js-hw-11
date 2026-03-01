import axios from 'axios';

const API_KEY = '54844596-95dc6909ab143f64cf2d4cbbe';
const url = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  return axios(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(res => res.data.hits);
}
