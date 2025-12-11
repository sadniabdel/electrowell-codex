import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

export default function() {
   // Product List
   $('#list-view').click(function() {
      $('#product-listing-container form > .module-wrapper').addClass('productList');

      $(this).attr('class', 'current-view');
      $('#grid-view').removeClass('current-view');
   });

   // Product Grid
   $('#grid-view').click(function() {
      $('#product-listing-container form > .module-wrapper').removeClass('productList');

      $(this).attr('class', 'current-view');
      $('#list-view').removeClass('current-view');
   });
}
