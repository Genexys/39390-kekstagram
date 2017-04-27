'use strict';

window.initializeScale = function (scaleElement, setNewPersent, valueZoom) {
  var MIN_PERCENT = 25;
  var MAX_PERCENT = 100;
  var getPlusZoomImage = function () {
    var percentValue = parseInt(valueZoom.value, 10) + MIN_PERCENT;
    percentValue = (percentValue > MAX_PERCENT) ? MAX_PERCENT : percentValue;

    setNewPersent(percentValue);
  };
  var getMinusZoomImage = function () {
    var percentValue = parseInt(valueZoom.value, 10) - MIN_PERCENT;
    percentValue = (percentValue < MIN_PERCENT) ? MIN_PERCENT : percentValue;

    setNewPersent(percentValue);
  };

  btnPlusZoom.addEventListener('click', function () {
    getPlusZoomImage();
  });

  btnMinusZoom.addEventListener('click', function () {
    getMinusZoomImage();
  });

};


