import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryItem(image) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          src="${image.webformatURL}"
          alt="${image.tags}"
          loading="lazy"
        />
        <div class="image-info">
          <p><b>Likes</b>${image.likes}</p>
          <p><b>Views</b>${image.views}</p>
          <p><b>Comments</b>${image.comments}</p>
          <p><b>Downloads</b>${image.downloads}</p>
        </div>
      </a>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(createGalleryItem).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-visible');
}

export function hideLoader() {
  loader.classList.remove('is-visible');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('is-visible');
}
