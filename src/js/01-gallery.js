import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

galleryItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = item.original;

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = item.preview;
  image.alt = item.description;
  image.dataset.source = item.original;

  link.appendChild(image);
  listItem.appendChild(link);

  galleryList.appendChild(listItem);
});

galleryList.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    const largeImageUrl = e.target.dataset.source;

    const instance = new SimpleLightbox(`
      <img src="${largeImageUrl}" width="800" height="600">
    `, {
      captionDelay: 250,
    });

    instance.show();

    const subtitle = document.createElement('div');
    subtitle.classList.add('sl-caption');
    subtitle.innerText = 'title image';

    instance.element().appendChild(subtitle);
  }
});
