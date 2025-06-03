import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = form.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message: 'Введіть слово для пошуку!',
      position: 'topRight',
    });
    return;
  }
  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        message: 'Нічого не знайдено. Спробуйте інший запит!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (totalHits > 15) showLoadMoreButton();
    else hideLoadMoreButton();
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше.',
      position: 'topRight',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();

    createGallery(data.hits);

    // Плавний скрол до нової порції
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const loadedImages = gallery.children.length;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "Ви дійшли до кінця результатів.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Сталася помилка. Спробуйте пізніше.',
      position: 'topRight',
    });
  }
});
