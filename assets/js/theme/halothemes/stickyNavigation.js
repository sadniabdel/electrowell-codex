import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable padded-blocks */

export default function() {

   function doSticky() {
      const $headerHeight = $('header.header').outerHeight();
      $(window).scroll(function() {
         const scrollTop = $(this).scrollTop();
         if (scrollTop > $headerHeight + 100) {
            $('body').addClass('is-sticky');
            $('body.is-sticky').css('margin-top', $headerHeight);

            if ($('.quickSearchResultsWrap').hasClass('hasResults')) {
               $('.is-sticky #quickSearch').addClass('is-open');
            }
         } else {
            $('body').removeClass('is-sticky');
            $('body').css('margin-top', '0px');
            $('#quickSearch').remove('is-open');
         }
      });
   }
   if ($(window).width() >= 992) {
      doSticky();
   }
   $(window).resize(function() {
      if ($(window).width() >= 992) {
         doSticky();
      }
   });
}
