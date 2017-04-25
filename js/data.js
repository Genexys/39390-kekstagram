'use strict';

window.arrayPhotos = (function () {
  var photos = [];

  var photosComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];

  var getRandomArbitary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  for (var i = 1; i < 26; i++) {
    var obj = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomArbitary(15, 200),
      comments: photosComments[getRandomArbitary(0, photosComments.length)]
    };

    photos.push(obj);
  }
  return photos;
})();
