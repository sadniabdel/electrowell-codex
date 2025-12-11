import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */

export default function() {
   $('.productView-image').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      image: {
         verticalFit: true
      },
      mainClass: 'mfp-with-zoom',
      zoom: {
         enabled: true, // By default it's false, so don't forget to enable it
         duration: 300, // duration of the effect, in milliseconds
         easing: 'ease-in-out'
      }
   });
}
