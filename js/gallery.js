'use strict';
(function () {
  var picturesContainer = document.querySelector('.pictures');
  var urlPicture = window.location.href.replace('index.html', '');

  var onLoad = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.picture.renderPicture(data[i]));
    }
    picturesContainer.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #232321;';
    errorBlock.style.position = 'absolute';
    errorBlock.style.left = '50%';
    errorBlock.style.top = '50%';
    errorBlock.style.transform = 'translate(-50%, -50%)';
    errorBlock.style.height = '200px';
    errorBlock.style.fontSize = '30px';
    errorBlock.style.lineHeight = '200px';

    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

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

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data', onLoad, onError);

  window.formPictire.closeOverlay();
})();


