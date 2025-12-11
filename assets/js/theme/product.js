/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import productViewMagnificPopup from './halothemes/productViewMagnificPopup';
import setActiveCategory from './halothemes/setActiveCategory';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        // HaloThemes functions
        productViewMagnificPopup();
        setActiveCategory();

        // $('a.videos-tab').click(function(event) {
        //     event.preventDefault();
        //     $('.productView-images').addClass('current-videos-tab');
        //     $('a.photos-tab').removeClass('current-tab');
        //     $('#product-photos').addClass('hide');
        //     $(this).addClass('current-tab');
        //     $('#product-videos').removeClass('hide');
        //     $('.productView-image').addClass('hide');
        //     $('.productView-videos').removeClass('hide');
        //     $('.productView-videos iframe')[0].contentWindow.postMessage('{'+'"event":"command",'+'"func":"playVideo"'+',"args":""}', '*');
        // });

        // $('a.photos-tab').click(function(event) {
        //     event.preventDefault();
        //     $('.productView-images').removeClass('current-videos-tab');
        //     $('a.videos-tab').removeClass('current-tab');
        //     $('#product-videos').addClass('hide');
        //     $(this).addClass('current-tab');
        //     $('#product-photos').removeClass('hide');
        //     $('.productView-image').removeClass('hide');
        //     $('.productView-videos').addClass('hide');
        //     $('.productView-videos iframe')[0].contentWindow.postMessage('{'+'"event":"command",'+'"func":"pauseVideo"'+',"args":""}', '*');
        // });

        // $('a.video-thumbnail').click(function(event) {
        //     event.preventDefault();
        //     $('.productView-videos iframe').attr('src', '//www.youtube.com/embed/'+$(this).data('video-id')+'?enablejsapi=1');
        //     setTimeout(function() {
        //         $('.productView-videos iframe')[0].contentWindow.postMessage('{'+'"event":"command",'+'"func":"playVideo"'+',"args":""}', '*');
        //     }, 500);
        // });

        $('a.videos-tab').click(function(event) {
            event.preventDefault();
            $('.productView-1 .productView-videos-wrap').removeClass('is-hidden');
            $('.productView-1 .productView-image-wrap').addClass('is-hidden');
        });

        $('a.photos-tab').click(function(event) {
            event.preventDefault();
            $('.productView-1 .productView-image-wrap').removeClass('is-hidden');
            $('.productView-1 .productView-videos-wrap').addClass('is-hidden');
        });

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
