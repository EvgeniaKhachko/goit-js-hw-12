import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {fetchImages} from "./js/pixabay-api.js";
import {showGallery} from "./js/render-functions.js";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery .gallery__item');
const loaderElement = document.querySelector('.loader');
const queryElement = document.querySelector('input');
const moreButton = document.querySelector('#show-more');
const formEl = document.querySelector('.feedback-form');

let currentPage = 1;  
let totalHits = 0;
let lastPage = 0;
let currentQuery = '';
const imagesPerPage = 15;
moreButton.style.display = 'none';

function resetToStart() {
  currentPage = 1;  
  totalHits = 0;
  lastPage = 0;
  currentQuery = '';
  moreButton.style.display = 'none';
}
moreButton.addEventListener('click', function(event) {
  document.querySelector('form button').click();
});


formEl.addEventListener('submit', function(event) {
  event.preventDefault();

  loaderElement.style.display = 'block';
  const query = queryElement.value.trim();
  
  if (query === '') {
    loaderElement.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query!',
    });

    return;
  }

  if (currentQuery != query) {
    resetToStart();
    gallery.innerHTML = '';
    currentQuery = query;
  }

fetchImages(currentQuery, currentPage)
    .then(data => {
      if (data.totalHits && (data.totalHits > 0)) {
        totalHits = data.totalHits
        lastPage = Math.ceil(totalHits/imagesPerPage);
        const imagesForDisplay = data.hits; 
        const imageHTML = showGallery(imagesForDisplay);

        gallery.innerHTML += imageHTML;
        let imageDomRect = document.querySelector("a.gallery__item").getBoundingClientRect();
        let heightToScroll = imageDomRect.height * 2; 

        if (currentPage != 1) {
          window.scrollBy({
            top: heightToScroll,
            behavior: "smooth"
          });
        }

        lightbox.refresh();

        if (currentPage == lastPage) {
          resetToStart();
          iziToast.error({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
          });
              
        } else {
          moreButton.style.display = 'block';
          currentPage++;
        }

      } else {
        resetToStart();
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });
      }
      loaderElement.style.display = 'none';
    })
    .catch(error => {
      loaderElement.style.display = 'none';
      console.log(error.message);
    });

});
