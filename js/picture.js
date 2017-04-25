'use strict';

window.picture = (function () {
  var pictureTemplate = document.querySelector('#picture-template').content;
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('a.picture').href = picture.url;
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-comments').innerHTML = picture.comments.length;
    pictureElement.querySelector('.picture-likes').innerHTML = picture.likes;

    return pictureElement;
  };
  return {
    renderPicture: renderPicture
  };
})();
