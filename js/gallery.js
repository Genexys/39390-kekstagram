'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');
  var urlPicture = window.location.href.replace('index.html', '');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.arrayPhotos.length; i++) {
    fragment.appendChild(window.picture.renderPicture(window.arrayPhotos[i]));
  }

  picturesContainer.appendChild(fragment);

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
      window.preview.drawPhoto(getPhotoByUrl(evt.currentTarget.href));
    });
  }

  window.formPictire.closeOverlay();
})();


