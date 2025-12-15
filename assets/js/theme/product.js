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
import nod from './common/nod';
import forms from './common/models/forms';

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
            // Register quotation form validation instead of review validation
            validator = this.registerQuotationValidation($reviewForm);
        });

        $reviewForm.on('submit', (event) => {
            if (validator) {
                validator.performCheck();

                if (!validator.areAll('valid')) {
                    return false;
                }
            }

            // Intercept form submission to handle quotation via AJAX
            event.preventDefault();
            this.handleQuotationSubmit($reviewForm);
            return false;
        });

        next();
    }

    registerQuotationValidation($form) {
        const quotationValidator = nod({
            submit: $form.find('input[type="submit"]'),
        });

        quotationValidator.add([
            {
                selector: '[name="contact_fullname"]',
                validate: 'presence',
                errorMessage: 'Full Name is required.',
            },
            {
                selector: '[name="contact_email"]',
                validate: (cb, val) => {
                    const result = forms.email(val);
                    cb(result);
                },
                errorMessage: 'Please use a valid email address, such as user@example.com.',
            },
            {
                selector: '[name="quote_country"]',
                validate: 'presence',
                errorMessage: 'Country is required.',
            },
            {
                selector: '[name="contact_question"]',
                validate: 'presence',
                errorMessage: 'Message/Requirements is required.',
            },
        ]);

        return quotationValidator;
    }

    handleQuotationSubmit($form) {
        const $submitBtn = $form.find('input[type="submit"]');
        const $responseMsg = $('#quotation-response-message');
        const originalBtnValue = $submitBtn.val();

        // Disable submit button and show loading state
        $submitBtn.prop('disabled', true).val('Sending...');
        $responseMsg.hide();

        // Gather form data
        const formData = {
            fullname: $form.find('[name="contact_fullname"]').val(),
            email: $form.find('[name="contact_email"]').val(),
            companyname: $form.find('[name="contact_companyname"]').val() || 'N/A',
            country: $form.find('[name="quote_country"]').val(),
            quantity: $form.find('[name="quote_quantity"]').val() || '1',
            message: $form.find('[name="contact_question"]').val(),
            productName: $('#quote_product_name').val(),
            productSku: $('#quote_product_sku').val(),
            productUrl: $('#quote_product_url').val(),
        };

        // Format the complete message with product details
        const fullMessage = `
=== QUOTATION REQUEST ===

Customer Information:
- Name: ${formData.fullname}
- Email: ${formData.email}
- Company: ${formData.companyname}
- Country: ${formData.country}

Product Information:
- Product: ${formData.productName}
- SKU: ${formData.productSku}
- URL: ${formData.productUrl}
- Requested Quantity: ${formData.quantity}

Customer Message:
${formData.message}
`;

        // Submit via AJAX
        $.ajax({
            type: 'POST',
            url: '/pages.php?action=sendContactForm',
            data: {
                contact_fullname: formData.fullname,
                contact_email: formData.email,
                contact_companyname: formData.companyname,
                contact_question: fullMessage,
                page_id: 6,
            },
            success: () => {
                $responseMsg
                    .removeClass('alertBox-message--error')
                    .addClass('alertBox alertBox-message alertBox-message--success')
                    .html('<p>Thank you! Your quote request has been sent successfully. We will contact you soon.</p>')
                    .show();

                // Reset form
                $form[0].reset();
                $submitBtn.prop('disabled', false).val(originalBtnValue);

                // Auto-close modal after 3 seconds
                setTimeout(() => {
                    $('#modal-review-form').foundation('reveal', 'close');
                }, 3000);
            },
            error: () => {
                $responseMsg
                    .removeClass('alertBox-message--success')
                    .addClass('alertBox alertBox-message alertBox-message--error')
                    .html(`<p>There was an error sending your quote request. Please email us directly at <a href="mailto:info@electrowell.com">info@electrowell.com</a> or call us.</p>`)
                    .show();

                $submitBtn.prop('disabled', false).val(originalBtnValue);
            },
        });
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
