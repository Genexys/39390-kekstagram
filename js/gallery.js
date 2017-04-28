'use strict';
(function () {
  var onLoad = function (data) {
    var photos = data;

    getListPhotos(photos);
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.setAttribute('class', 'error-block');
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getListPhotos = function (photos) {
    var picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.picture.renderPicture(photos[i]));
    }
    picturesContainer.appendChild(fragment);

    var urlPicture = window.location.href.replace('index.html', '');
    var pictureBlock = document.querySelectorAll('a.picture');
    var getPhotoByUrl = function (url) {
      var selected = 0;
      photos.forEach(function (el) {
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
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data', onLoad, onError);
  window.formPictire.closeOverlay();
})();


