'use strict';

(function () {
  var INTERVAL = 1000;
  var headerElement = document.querySelector('.header');
  var headerNavElement = headerElement.querySelectorAll('.header__link');
  var sliderListElement = headerElement.querySelector('.slider__nav-list');
  var sliderButtonElements = headerElement.querySelectorAll('.slider__nav-button');
  var slideItemElements = headerElement.querySelectorAll('.slider__item');
  var prevActiveIndex = 1;
  var index = 0;

  var addNAvAnimation = function () {
    headerNavElement.forEach(function (item, i) {
      var time = i * 0.5;
      item.style = 'animation-name: showBlock;' +
        'animation-duration: 2.5s;' +
        'animation-delay:' + time + 's;' +
        'animation-timing-function: linear;' +
        'animation-fill-mode: both;';
    });
  };
  addNAvAnimation();

  var removeItemActiveHandler = function () {
    slideItemElements.forEach(function (item) {
      item.classList.remove('slider__item--active');
    });
  };
  var removeButtonActiveHandler = function () {
    sliderButtonElements.forEach(function (item) {
      item.classList.remove('slider__nav-button--active');
    });
  };
  var addButtonActiveHandler = function () {
    sliderButtonElements[index].classList.add('slider__nav-button--active');
  };
  var openSlideHandler = function () {
    slideItemElements[index].classList.add('slider__item--active');
  };
  var removeEndEffectHandler = function () {
    slideItemElements[prevActiveIndex - 1].classList.remove('slider__item--end-' + prevActiveIndex);
  };

  var selectSlide = function (target) {
    sliderButtonElements.forEach(function (item, i) {
      if (target === item) {
        index = i;
        setTimeout(addButtonActiveHandler, INTERVAL);
        setTimeout(openSlideHandler, INTERVAL);
        headerElement.classList.remove('header--slide-' + prevActiveIndex);
        slideItemElements[prevActiveIndex - 1].classList.add('slider__item--end-' + prevActiveIndex);
        setTimeout(removeEndEffectHandler, INTERVAL);
        prevActiveIndex = i + 1;
        headerElement.classList.add('header--slide-' + prevActiveIndex);
      }
    });
  };


  sliderListElement.addEventListener('click', function (evt) {
    var target = evt.target;
    var isPin = target.closest('.slider__nav-button:not(.slider__nav-button--active)');
    if (isPin) {
      setTimeout(removeItemActiveHandler, INTERVAL);
      setTimeout(removeButtonActiveHandler, INTERVAL);
      selectSlide(target);
    }
  });
})();
