'use strict';

window.form = (function () {
  var uploadForm = document.querySelector('.upload-image');
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('.upload-form-cancel');
  var uploadComment = document.querySelector('.upload-form-description');
  var uploadSubmit = document.querySelector('.upload-form-submit');
  var btnFilterControl = document.querySelector('.upload-filter-controls');
  var imagePreview = document.querySelector('.filter-image-preview');
  var btnMinusZoom = document.querySelector('.upload-resize-controls-button-dec');
  var btnPlusZoom = document.querySelector('.upload-resize-controls-button-inc');
  var textInputImage = document.querySelector('.upload-form-description');
  var valueZoom = document.querySelector('.upload-resize-controls-value');


  uploadForm.classList.remove('invisible');
  var countClass = 'filter-none';
  var getFilterImage = function () {

    btnFilterControl.addEventListener('change', function (evt) {
      imagePreview.classList.remove(countClass);
      countClass = 'filter-' + evt.target.value;
      imagePreview.classList.add(countClass);
    });
  };

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

  var setNewPersent = function (percentValue) {
    valueZoom.value = percentValue + '%';
    imagePreview.style = 'transform: scale(' + (percentValue / 100) + ')';
  };

  var uploadFormValid = function () {
    if (textInputImage.checkValidity() === false) {
      textInputImage.style.border = '2px solid red';
    } else {
      textInputImage.style.border = 'none';
    }
  };

  uploadFile.addEventListener('change', function () {
    uploadOverlay.classList.remove('invisible');
    uploadCancel.addEventListener('click', function () {
      uploadFile.value = '';
      imagePreview.classList.remove(countClass);
      textInputImage.style.border = 'none';
      window.pictures.closeOverlay();
    });
    uploadCancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        uploadFile.value = '';
        imagePreview.classList.remove(countClass);
        textInputImage.style.border = 'none';
        window.pictures.closeOverlay();
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
        imagePreview.classList.remove(countClass);
        textInputImage.style.border = 'none';
        window.pictures.closeOverlay();
      }
    });
    getFilterImage();
    uploadSubmit.addEventListener('click', function () {
      if (uploadFormValid()) {
        uploadFile.value = '';
        window.pictures.closeOverlay();
      }
    });

    uploadSubmit.addEventListener('keydown', function (evt) {
      if (uploadFormValid()) {
        if (evt.keyCode === 13) {
          uploadFile.value = '';
          window.pictures.closeOverlay();
        }
      }
    });
  });

  btnPlusZoom.addEventListener('click', function () {
    getPlusZoomImage();
  });

  btnMinusZoom.addEventListener('click', function () {
    getMinusZoomImage();
  });
})();
