'use strict';

window.preview = (function () {
  var closeGallery = function () {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    galleryOverlay.classList.add('invisible');
  };

  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var urlPicture = window.location.href.replace('index.html', '');

  var pictureBlock = document.querySelectorAll('a.picture');
  var getPhotoByUrl = function (url) {
    var selected = 0;
    window.arrayPhotos.forEach(function (el) {
      if (urlPicture + el.url === url) {

        selected = el;
      }
    });
    return selected;
  };

  for (var y = 0; y < pictureBlock.length; y++) {
    pictureBlock[y].addEventListener('click', function (evt) {
      evt.preventDefault();
      window.pictures.drawPhoto(getPhotoByUrl(evt.currentTarget.href));
      openGallery();
    });
  }

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
})();

