'use strict';
window.preview = (function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var closeGallery = function () {
    galleryOverlay.classList.add('invisible');
  };

  var GetDrawPhoto = function (photo) {
    galleryImage.src = photo.url;
    likesCount.innerHTML = photo.likes;
    commentsCount.innerHTML = photo.comments.length;
    openGallery();
  };

  var openGallery = function () {
    galleryOverlay.classList.remove('invisible');

    galleryOverlayClose.addEventListener('click', closeGallery);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closeGallery();
      }
    });
    galleryOverlayClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        closeGallery();
      }
    });
    galleryOverlay.addEventListener('click', function (evt) {
      if (evt.target !== galleryOverlay) {
        evt.preventDefault();
      } else {
        closeGallery();
      }
    });
  };
  return {
    GetDrawPhoto: GetDrawPhoto
  };
})();

