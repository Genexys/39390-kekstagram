'use strict';

window.getFilterImage = (function () {
  return function (applyFilter, oldClass) {
    var btnFilterControl = document.querySelector('.upload-filter-controls');
    btnFilterControl.addEventListener('change', function (evt) {
      oldClass = evt.target.value;
      applyFilter(oldClass);
    });
  };
})();
