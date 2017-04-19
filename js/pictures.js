'use strict';

window.pictures = (function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var picturesContainer = document.querySelector('.pictures');
  var galleryImage = document.querySelector('.gallery-overlay-image');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');

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
  for (var i = 0; i < window.arrayPhotos.length; i++) {
    fragment.appendChild(renderPictures(window.arrayPhotos[i]));
  }

  picturesContainer.appendChild(fragment);

  return {
    closeOverlay: function () {
      uploadOverlay.classList.add('invisible');
      imagePreview.style = 'transform: scale(1)';
    },
    drawPhoto: function (photo) {
      galleryImage.src = photo.url;
      likesCount.innerHTML = photo.likes;
      commentsCount.innerHTML = photo.comments.length;
    }
  };
})();

window.pictures.closeOverlay();
