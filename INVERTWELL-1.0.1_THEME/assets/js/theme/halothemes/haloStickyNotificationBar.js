import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable padded-blocks */
/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-else-return */

export default function (t, ev) {
   function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
   }

   function getCookie(cname) {
      const name = cname + '=';
      const ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) === ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
         }
      }
      return '';
   }

   const deleteCookie = function(name) {
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
   };

   if ((ev === true) && (getCookie('haloStickyNotificationBar') === '')) {
      $('#sticky-notification').addClass('show');

      function setClosePopup() {
         setCookie('haloStickyNotificationBar', 'closed', t);
         $('#sticky-notification').removeClass('show');
      }
     
      $(document).on('click', '.close-btn', function() {
         setClosePopup();
      });
      
      $(document).keyup(function(e) {
         if (e.keyCode === 27) { // escape key maps to keycode `27`
            setClosePopup();
         }
      });
   }
   else {
      $('#sticky-notification').removeClass('show');
   }

   if (ev === false) {
      deleteCookie('haloStickyNotificationBar');
   }

   let interval;

   function startTextSlideOnMobile() {
      if ($(window).width() > 767)  return;

      clearInterval(interval)
      interval = setInterval(function() {
         $('.text-wrapper').toggleClass('slide-down');
      }, 4000);
   }

   let currentScrollTop = 0;

   function scrollHandle() {
      if ($(window).width() > 767)  return;

      const currentTop = window.pageYOffset

      if (currentTop < 100) {
         currentScrollTop = currentTop
         return;
      };

      if (currentTop > currentScrollTop) {
         requestAnimationFrame(() => {
            $('#sticky-notification').removeClass('show');
         })
      } 
      if (currentTop < currentScrollTop) {
         requestAnimationFrame(() => {
            $('#sticky-notification').addClass('show');
         })
      }

      currentScrollTop = currentTop
   }

   function handlePromotionClick(e) {
      if (e.target.matches('[data-close-notification-btn]') || e.target.closest('[data-close-notification-btn]') != null) return 

      const link = e.target.closest('#sticky-notification').querySelector('[data-main-link]');
      if (link) link.click();
   }

   startTextSlideOnMobile();
   window.addEventListener('scroll', scrollHandle);
   window.addEventListener('resize', startTextSlideOnMobile);
   document.getElementById('sticky-notification').addEventListener('click', handlePromotionClick)
}
