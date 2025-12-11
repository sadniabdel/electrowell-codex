import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

export default function() {
   if ($('.productView-options').length > 0) {
      $('.productView-options [data-product-option-change]').children('.form-field').each(function(index, el) {
         if ($(this).children('.form-label').text().toLowerCase().indexOf('size') > 0) {
            $('a[data-reveal-id="modal-size-chart-form"]').appendTo($(this).children('.form-label')).removeClass('hide');
         }
      });
   }
}
