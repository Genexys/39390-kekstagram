'use strict';

var picturesContainer = document.querySelector('.pictures');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var uploadForm = document.querySelector('.upload-image');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('.upload-form-cancel');
var uploadComment = document.querySelector('.upload-form-description');
var uploadSubmit = document.querySelector('.upload-form-submit');
var btnFilterControl = document.querySelector('.upload-filter-controls');
var imagePreview = document.querySelector('.filter-image-preview');
var btnMinusZoom = document.querySelector('.upload-resize-controls-button-dec');
var btnPlusZoom = document.querySelector('.upload-resize-controls-button-inc');
var valueZoom = document.querySelector('.upload-resize-controls-value');
uploadForm.classList.remove('invisible');

var closeOverlay = function () {
  uploadOverlay.classList.add('invisible');
};
closeOverlay();

var closeGallery = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.add('invisible');
};

var getFilterImage = function () {
  var countClass = 'filter-none';
  btnFilterControl.addEventListener('change', function (evt) {
    imagePreview.classList.remove(countClass);
    countClass = 'filter-' + evt.target.value;
    imagePreview.classList.add(countClass);
  });
};

function uploadFormValid() {
  var inpObj = document.querySelector('.upload-form-description');
  if (inpObj.checkValidity() === false) {
    inpObj.style.border = '2px solid red';
  } else {
    inpObj.style.border = 'none';
  }
  return inpObj.checkValidity();
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

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('invisible');
  uploadCancel.addEventListener('click', function () {
    uploadFile.value = '';
    closeOverlay();
  });
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      uploadFile.value = '';
      closeOverlay();
    }
  });

  uploadComment.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.stopPropagation();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      uploadFile.value = '';
      closeOverlay();
    }
  });
  getFilterImage();

  // uploadOverlay.addEventListener('click', function (evt) {
  //   if (evt.target !== uploadOverlay) {
  //     evt.preventDefault();
  //   } else {
  //     uploadFile.value = '';
  //     closeOverlay();
  //   }
  // });

  uploadSubmit.addEventListener('click', function () {
    if (uploadFormValid()) {
      uploadFile.value = '';
      closeOverlay();
    }
  });

  uploadSubmit.addEventListener('keydown', function (evt) {
    if (uploadFormValid()) {
      if (evt.keyCode === 13) {
        uploadFile.value = '';
        closeOverlay();
      }
    }
  });
});

btnPlusZoom.addEventListener('click', function () {
  if (valueZoom.value === '25%') {
    valueZoom.value = '50%';
    imagePreview.style = 'transform: scale(0.50)';
  } else if (valueZoom.value === '50%') {
    valueZoom.value = '75%';
    imagePreview.style = 'transform: scale(0.75)';
  } else if (valueZoom.value === '75%') {
    valueZoom.value = '100%';
    imagePreview.style = 'transform: scale(1)';
  }
});

btnMinusZoom.addEventListener('click', function () {
  if (valueZoom.value === '100%') {
    valueZoom.value = '75%';
    imagePreview.style = 'transform: scale(0.75)';
  } else if (valueZoom.value === '75%') {
    valueZoom.value = '50%';
    imagePreview.style = 'transform: scale(0.50)';
  } else if (valueZoom.value === '50%') {
    valueZoom.value = '25%';
    imagePreview.style = 'transform: scale(0.25)';
  }
});

var arrayPhotos = function () {
  var photos = [];

  var getRandomArbitary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };


  for (var i = 1; i < 26; i++) {
    var obj = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomArbitary(15, 200),
      comments: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.']
    };

    photos.push(obj);
  }

  return photos;
};

var listPhotos = arrayPhotos();

var pictureTemplate = document.querySelector('#picture-template').content;

var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('a.picture').href = picture.url;
  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-comments').innerHTML = picture.comments.length;
  pictureElement.querySelector('.picture-likes').innerHTML = picture.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < listPhotos.length; i++) {
  fragment.appendChild(renderPictures(listPhotos[i]));
}

picturesContainer.appendChild(fragment);

var galleryImage = document.querySelector('.gallery-overlay-image');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');

var drawPhoto = function (photo) {
  galleryImage.src = photo.url;
  likesCount.innerHTML = photo.likes;
  commentsCount.innerHTML = photo.comments.length;
};

var urlPicture = window.location.href.replace('index.html', '');

var pictureBlock = picturesContainer.querySelectorAll('a.picture');
var getPhotoByUrl = function (url) {
  var selected = 0;
  listPhotos.forEach(function (el) {
    if (urlPicture + el.url === url) {

      selected = el;
    }
  });
  return selected;

};

for (var y = 0; y < pictureBlock.length; y++) {
  pictureBlock[y].addEventListener('click', function (evt) {
    evt.preventDefault();
    drawPhoto(getPhotoByUrl(evt.currentTarget.href));
    openGallery();
  });
}

