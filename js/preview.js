'use strict';
window.preview = (function () {
  var galleryImage = document.querySelector('.gallery-overlay-image');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var closeGallery = function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.classList.add('invisible');
  };

  var drawPhoto = function (photo) {
    galleryImage.src = photo.url;
    likesCount.innerHTML = photo.likes;
    commentsCount.innerHTML = photo.comments.length;
    openGallery();
  };

  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  var openGallery = function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
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
    drawPhoto: drawPhoto
  };
})();

