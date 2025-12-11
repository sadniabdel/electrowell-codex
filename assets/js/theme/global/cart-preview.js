import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
/* eslint-disable func-names */
/* eslint space-before-function-paren: ["error", "never"] */
/* eslint-disable prefer-arrow-callback */

export default function() {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartDropdown = $('#cart-preview-dropdown .cart-preview-inner');
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    $('body').on('cart-quantity-update', (event, quantity) => {
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
    });

    const eventtype = $.browser.mobile ? 'touchstart' : 'click';
    $cart.on(eventtype, function(ev) {
        ev.preventDefault();
        const options = {
            template: 'common/cart-preview',
        };
        $(this).parent().toggleClass('is-open');

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            if (response.search('previewCart-emptyBody') > 0) {
                $('#cart-preview-dropdown .triangle-with-shadow').removeClass('triangle-grey');
            } else {
                $('#cart-preview-dropdown .triangle-with-shadow').addClass('triangle-grey');
            }

            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();

            const $previewCartList = $('.previewCartList');
            $previewCartList.mCustomScrollbar('destroy');
            if ($previewCartList.length) {
                $previewCartList.mCustomScrollbar({
                    scrollInertia: 400,
                });
            }
        });
    });
    $(document).on(eventtype, function(ev) {
        if ($(ev.target).closest('#top-cart').length === 0) {
            $cart.parent().removeClass('is-open');
        }
    });
}
