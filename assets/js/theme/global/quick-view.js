import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';

export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            const thumbnailCarousel = modal.$content.find('.productView-thumbnails');
            
            modal.$content.find('[data-slick]').slick();

            if($(window).width() > 1024) {
                $(".halo_productView-images .productView-image").zoom();
            }

            modal.$content.find('.productView-thumbnail').each( function(index, el) {
                if ($(this).children('a').data('image-gallery-zoom-image-url') == modal.$content.find('.productView-image').data('zoom-image') ){
                    $(this).children('a').addClass('is-active');
                }
            });

            $('a.videos-tab').click(function(event) {
                event.preventDefault();
                $('.halo_productQuickView .productView-videos-wrap').removeClass('is-hidden');
                $('.halo_productQuickView .productView-image-wrap').addClass('is-hidden');
            });

            $('a.photos-tab').click(function(event) {
                event.preventDefault();
                $('.halo_productQuickView .productView-image-wrap').removeClass('is-hidden');
                $('.halo_productQuickView .productView-videos-wrap').addClass('is-hidden');
            });

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}
