// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

hideLoader();

form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();

  const searchValue = evt.target.elements['search-text'].value.trim();

  if (!searchValue) {
    iziToast.warning({
      message: 'Пустий рядок',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(searchValue)
    .then(hits => {
      if (hits.length > 0) {
        createGallery(hits);
      } else {
        iziToast.show({
          message:
            'Sorry, there are no images matching <br> your search query. Please try again!',
          color: '#ef4040',
          position: 'topRight',
          messageColor: '#fafafb',
        });
      }
    })
    .catch(err => {
      iziToast.error({
        message: err.message,
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      evt.target.reset();
    });
}
