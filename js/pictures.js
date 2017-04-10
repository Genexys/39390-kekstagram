'use strict';

var openOeverlay = function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('invisible');
};

openOeverlay();

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

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('.picture-comments').innerHTML = picture.likes;
  pictureElement.querySelector('.picture-likes').innerHTML = picture.comments;

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < listPhotos.length; i++) {
  fragment.appendChild(renderPictures(listPhotos[i]));
}

var galleryImage = document.querySelector('.gallery-overlay-image');
var likesCount = document.querySelector('.likes-count');
var commentsCount = document.querySelector('.comments-count');

var drawPhoto = function (photo) {
  galleryImage.src = listPhotos[1].url;
  likesCount.innerHTML = listPhotos[1].likes;
  commentsCount.innerHTML = listPhotos[1].comments.length;
};

drawPhoto(listPhotos);

var openGallery = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  galleryOverlay.classList.remove('invisible');
};

openGallery();

