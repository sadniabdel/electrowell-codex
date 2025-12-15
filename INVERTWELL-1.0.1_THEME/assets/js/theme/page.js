import utils from '@bigcommerce/stencil-utils';
import PageManager from './page-manager';
import haloProductLookbook from './halothemes/haloProductLookbook';

export default class Page extends PageManager {
    constructor(context) {
        super(context);
    }

    onReady() {
        haloProductLookbook($('#halo-lookbook-slider'));

        this.faqsPage();
        this.faqsToggle();
        this.lookbookSlider();
    }

    faqsPage(){
        $('.faq-desc').appendTo('.page-normal .page-description');
    }

    faqsToggle(){
        $('.page-normal .card .title').on('click', event => {
            event.preventDefault();

            var target = $(event.currentTarget);

            $('.page-normal .card .title').not(target).removeClass('collapsed');

            if(target.hasClass('collapsed')){
                target.removeClass('collapsed');
            } else{
                target.addClass('collapsed');
            }

            $('.page-normal .card').each((index, element) => {
                if($('.title', element).hasClass('collapsed')){
                    $(element).find('.collapse').slideDown("slow");
                } else{
                    $(element).find('.collapse').slideUp("slow");
                }
            });
        });
    }

    lookbookSlider() {
        if($('#halo-lookbook-slider').length > 0){
            var $block = $('#halo-lookbook-slider'),
                wrap = $block.find('.halo-lookbook-slider');

            slickCarousel(wrap);
        }

        function slickCarousel(wrap){
            if(wrap.length > 0){
                wrap.slick({
                    dots: true,
                    arrows: false,
                    fade: true,
                    infinite: false,
                    mobileFirst: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            dots: false,
                            arrows: true
                        }
                    }]
                });
            }
        }
    }
}
