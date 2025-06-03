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
      message: 'Please enter a search query!',
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
        message: 'Sorry, there are no images matching your search query. Please try again!',
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
      message: 'An error occurred. Please try again later.',
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

    // Плавний скрол (дві висоти картки)
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    const loadedImages = gallery.children.length;
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'An error occurred. Please try again later.',
      position: 'topRight',
    });
  }
});
