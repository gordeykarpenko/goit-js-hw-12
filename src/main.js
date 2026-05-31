import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const submitButton = form.querySelector('button');
const loadMoreButton = document.querySelector('.load-more-button');
const PER_PAGE = 15;

let searchQuery = '';
let currentPage = 1;
let loadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  searchQuery = query;
  currentPage = 1;
  loadedImages = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();
  submitButton.disabled = true;

  try {
    const { hits, totalHits } = await getImagesByQuery(
      searchQuery,
      currentPage
    );

    if (hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    loadedImages = hits.length;

    updateLoadMoreState(totalHits);
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    submitButton.disabled = false;
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(
      searchQuery,
      currentPage
    );

    createGallery(hits);
    loadedImages += hits.length;

    scrollAfterLoad();
    updateLoadMoreState(totalHits);
  } catch {
    currentPage -= 1;

    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });

    showLoadMoreButton();
  } finally {
    hideLoader();
  }
});

function updateLoadMoreState(totalHits) {
  if (loadedImages >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
    return;
  }

  showLoadMoreButton();
}

function scrollAfterLoad() {
  const galleryItem = document.querySelector('.gallery-item');

  if (!galleryItem) {
    return;
  }

  const cardHeight = galleryItem.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
