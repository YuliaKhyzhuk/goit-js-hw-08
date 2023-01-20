import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryListUlEl = document.querySelector('.gallery');

const makeGalleryCard = ({ preview, original, description } = {}) => {
  return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
};

const galleryCardsAll = galleryItems.map(el => makeGalleryCard(el)).join('');
galleryListUlEl.insertAdjacentHTML('beforeend', galleryCardsAll);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
console.log(galleryItems);
