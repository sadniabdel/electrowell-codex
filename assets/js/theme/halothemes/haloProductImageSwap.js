import $ from 'jquery';

export default function () {

   // Product Images Swap
   const sourceSwap = function () {
      const $this = $(this).find('img[data-src-swap]');
      const newSource = $this.data('src-swap');
      $this.data('src-swap', $this.attr('src'));
      $this.attr('src', newSource);
   }

   $(function() {
      $('.prod-item').each(function() {
         new Image().src = $(this).find('img[data-src-swap]').data('src-swap');
      }).hover(sourceSwap, sourceSwap);
   });
}
