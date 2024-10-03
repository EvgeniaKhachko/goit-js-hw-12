export function showGallery(images)
{
    let imageHTML = '';
    images.forEach(image => {
      imageHTML += `
      <a class="gallery__item" href="${image.largeImageURL}">
      <figure class="gallery__figure">
        <img class="gallery__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
        <figcaption class="gallery__figcaption">
          <div class="gallery__caption">Likes: ${image.likes}</div>
          <div class="gallery__caption">Views: ${image.views}</div>
          <div class="gallery__caption">Comments: ${image.comments}</div>
          <div class="gallery__caption">Downloads: ${image.downloads}</div>
    </figcaption>
      </figure>
    </a>`;
    });

    return imageHTML;
}