'use strict';
(function () {
  var photos;
  var filters = document.querySelector('.filters');
  var DEBOUNCE_INTERVAL = 300;

  var lastTimeout = null;
  var debounce = function (fun) {
    console.log(lastTimeout);
    if (lastTimeout !== null) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var onFilters = function (currentFilters) {
    switch (currentFilters) {
      case 'popular':
        getListPhotos(photos);
        break;
      case 'new':
        getListPhotos(GetNewPhotos(photos));
        break;
      case 'discussed':
        getListPhotos(GetDiscussedPhotos(photos));
        break;
    }
  };

  filters.addEventListener('change', function (evt) {
    var currentFilters = evt.target.value;
      debounce(function () {
        onFilters(currentFilters);
      });
  });

  var onLoad = function (data) {
    filters.classList.remove('hidden');
    photos = data;
    getListPhotos(photos);
  };

  var GetNewPhotos = function () {
    var randomPhoto = [];

    var getRandom = function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    };

    while (randomPhoto.length < 10) {
      var randomItem = photos[getRandom(0, photos.length - 1)];
      if (randomPhoto.indexOf(randomItem) < 0) {
        randomPhoto.push(randomItem);
      }
    }
    return randomPhoto;
  };

  var GetDiscussedPhotos = function (photos) {
    var discussed = photos.slice(0);
    discussed.sort(function (first, second) {
      if(first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    return discussed;
  };


  var onError = function (errorMessage) {
    var errorBlock = document.createElement('div');
    errorBlock.setAttribute('class', 'error-block');
    errorBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBlock);
  };

  var getListPhotos = function (photos) {
    var picturesContainer = document.querySelector('.pictures');
    picturesContainer.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.picture.render(photos[i]));
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
        window.preview.GetDrawPhoto(getPhotoByUrl(evt.currentTarget.href));
      });
    }
  };

  window.load('https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data', onLoad, onError);
  window.formPictire.closeOverlay();
})();


