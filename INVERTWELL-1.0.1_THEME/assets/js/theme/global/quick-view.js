import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal, modalTypes } from './modal';
import 'slick-carousel';
import { setCarouselState, onSlickCarouselChange, onUserCarouselChange } from '../common/carousel';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', event => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('productId');

        modal.$modal.removeClass('modal--editOptions');
        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            const $carousel = modal.$content.find('[data-slick]');

            if ($carousel.length) {
                $carousel.on('init afterChange', (e, carousel) => onSlickCarouselChange(e, carousel, context));
                $carousel.on('click', '.slick-arrow, .slick-dots', $carousel, e => onUserCarouselChange(e, context));
                $carousel.on('swipe', (e, carouselObj) => onUserCarouselChange(e, context, carouselObj.$slider));

                $carousel.slick();
            }

            modal.setupFocusableElements(modalTypes.QUICK_VIEW);

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}
