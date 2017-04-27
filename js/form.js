'use strict';
window.formPictire = (function () {
  var uploadForm = document.querySelector('.upload-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadSubmit = uploadOverlay.querySelector('.upload-form-submit');
  var btnFilterControl = uploadOverlay.querySelector('.upload-filter-controls');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');
  var btnMinusZoom = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var btnPlusZoom = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var textInputImage = document.querySelector('.upload-form-description');
  var valueZoom = uploadOverlay.querySelector('.upload-resize-controls-value');
  var filterLevel = uploadOverlay.querySelector('.upload-filter-level');
  var filterpin = uploadOverlay.querySelector('.upload-filter-level-pin');
  var filterLineVal = uploadOverlay.querySelector('.upload-filter-level-val');
  var filterLine = uploadOverlay.querySelector('.upload-filter-level-line');
  var countClass = 'filter-none';

  filterLevel.style.display = 'none';
  filterpin.style.left = filterLine.offsetWidth + 'px';
  filterLineVal.style.width = filterLine.offsetWidth + 'px';

  filterpin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var filterOffset = 0;
    var startCoord = {
      x: evt.clientX
    };
    var onMouseMove = function (evtMove) {
      var shift = {
        x: startCoord.x - evtMove.clientX
      };

      startCoord = {
        x: evtMove.clientX
      };

      filterpin.style.left = (filterpin.offsetLeft - shift.x) + 'px';
      filterLineVal.style.width = (filterpin.offsetLeft - shift.x) + 'px';

      filterOffset = (filterpin.offsetLeft - shift.x) * 100 / filterLine.offsetWidth;

      if (filterpin.offsetLeft < 0) {
        filterpin.style.left = '0px';
      } else if (filterpin.offsetLeft > filterLine.offsetWidth) {
        filterpin.style.left = filterLine.offsetWidth + 'px';
      }

      switch (countClass) {
        case 'filter-sepia':
          var filterValue = (filterOffset / 100).toFixed(1);
          imagePreview.style.filter = 'sepia(' + filterValue + ');';
          imagePreview.setAttribute('style', '-webkit-filter: sepia(' + filterValue + ');');
          break;
        case 'filter-marvin':
          filterValue = (filterOffset / 100).toFixed(1);
          imagePreview.style.filter = 'invert(' + filterValue * 100 + '%);';
          imagePreview.setAttribute('style', '-webkit-filter: invert(' + filterValue * 100 + '%);');
          break;
        case 'filter-phobos':
          filterValue = (filterOffset / 100).toFixed(1);
          imagePreview.style.filter = 'blur(' + filterValue * 3 + 'px);';
          imagePreview.setAttribute('style', '-webkit-filter: blur(' + filterValue * 3 + 'px);');
          break;
        case 'filter-chrome':
          filterValue = (filterOffset / 100).toFixed(1);
          imagePreview.style.filter = 'grayscale(' + filterValue + ');';
          imagePreview.setAttribute('style', '-webkit-filter: grayscale(' + filterValue + ');');
          break;
        case 'filter-heat':
          filterValue = (filterOffset / 100).toFixed(1);
          imagePreview.style.filter = 'brightness(' + filterValue * 3 + ');';
          imagePreview.setAttribute('style', '-webkit-filter: brightness(' + filterValue * 3 + ');');
          break;
        default:
          filterLevel.style.display = 'none';
      }
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    var onMouseLeave = function (evtLeave) {
      evtLeave.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

  });

  uploadForm.classList.remove('invisible');

  var getFilterImage = function () {
    btnFilterControl.addEventListener('change', function (evt) {
      imagePreview.classList.remove(countClass);
      countClass = 'filter-' + evt.target.value;
      imagePreview.classList.add(countClass);
      filterpin.style.left = filterLine.offsetWidth + 'px';
      filterLineVal.style.width = filterLine.offsetWidth + 'px';
      if (countClass !== 'filter-none') {
        filterLevel.style.display = 'block';
        imagePreview.removeAttribute('style');
        filterpin.style.left = filterLine.offsetWidth + 'px';
        filterLineVal.style.width = filterLine.offsetWidth + 'px';
      } else {
        filterLevel.style.display = 'none';
      }
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
      imagePreview.style = 'transform: scale(1)';
      closeOverlay();
    });
    uploadCancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        uploadFile.value = '';
        imagePreview.classList.remove(countClass);
        textInputImage.style.border = 'none';
        imagePreview.style = 'transform: scale(1)';
        closeOverlay();
      }
    });

    textInputImage.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        evt.stopPropagation();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        uploadFile.value = '';
        imagePreview.classList.remove(countClass);
        textInputImage.style.border = 'none';
        imagePreview.style = 'transform: scale(1)';
        closeOverlay();
      }
    });
    getFilterImage();
    uploadSubmit.addEventListener('click', function () {
      if (uploadFormValid()) {
        uploadFile.value = '';
        imagePreview.style = 'transform: scale(1)';
        closeOverlay();
      }
    });

    uploadSubmit.addEventListener('keydown', function (evt) {
      if (uploadFormValid()) {
        if (evt.keyCode === 13) {
          uploadFile.value = '';
          imagePreview.style = 'transform: scale(1)';
          closeOverlay();
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

  var closeOverlay = function () {
    uploadOverlay.classList.add('invisible');
  };

  return {
    closeOverlay: closeOverlay
  };
})();
