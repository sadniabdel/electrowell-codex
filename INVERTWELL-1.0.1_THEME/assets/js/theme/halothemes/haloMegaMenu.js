import utils from '@bigcommerce/stencil-utils';

export default class haloMegaMenu{
    constructor() {}

    menuItem(num) {
        return {
            setMegaMenu(param) {
                // Defaut params
                param = $.extend({
                    style: '',
                    dropAlign: 'fullWidth',
                    dropWidth: '493px',
                    cateColumns: 1,
                    disabled: false,
                    bottomCates: '',
                    products:'',
                    productId: '',
                    label: '',
                    options: true
                }, param);

                if ($('.navPages-list-megamenu-2').length) {
                    $('.navPages-list-megamenu-2 > li:nth-child(' + num + ')').each(function(idx, el) {
                        if (param.disabled === false) {
                            const subMegaMenu = $(el).find('> .navPage-subMenu');

                            if(param.style === 'style 1') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-1 fullWidth');
                                    if(!subMegaMenu.find('.cateArea').length){
                                        subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                    }

                                    if(!subMegaMenu.find('.imageArea').length){
                                        subMegaMenu.append('<div class="imageArea"><div class="container"><div class="imageAreaInner"><div class="megamenu-right-item">'+param.images+'</div></div></div></div>');
                                        
                                        if (param.products.length && (param.products !== '')) {
                                            subMegaMenu.find('.imageArea > .container > .imageAreaInner').prepend('<div class="megamenu-product-list">'+param.products+'</div>');
                                        }
                                    }

                                    subMegaMenu.find('.imageArea').css({
                                        'width': '100%',
                                        'max-width': param.imageAreaWidth
                                    });

                                    subMegaMenu.find('.cateArea').css({
                                        'width': '100%',
                                        'max-width': param.cateAreaWidth
                                    });

                                    if (param.productId.length && (param.productId !== '')) {
                                        var productIDS = param.productId,
                                            featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                        const $options = {
                                            template: 'halothemes/halo-megamenu-tmp'
                                        };

                                        if (productIDS !== '') {
                                            var listIDs = JSON.parse("[" + productIDS + "]");

                                            if (featuredProductCarousel.length) {
                                                featuredProductCarousel.find('.megamenu-slider').html('<div class="loadingOverlay" style="display:block;"></div>');

                                                var n = 0;

                                                for (var i = 0; i < listIDs.length; i++) {
                                                    var productId = listIDs[i];
                                                    utils.api.product.getById(productId, $options, (err, response) => {
                                                        var hasProd = $(response).find('.card').data('product-id');

                                                        if(hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length){
                                                             featuredProductCarousel.find('.megamenu-slider').append(response);
                                                             n++;                                                            
                                                        } else {
                                                            n++;
                                                        }

                                                        if (n == listIDs.length) {
                                                            featuredProductCarousel.find('.megamenu-slider .loadingOverlay').remove();
                                                            productSlider(featuredProductCarousel);
                                                            
                                                        }
                                                    });
                                                }                                            
                                            }
                                        }

                                        function productSlider(element){
                                            element.each(function(idx, el) {
                                                if($('.megamenu-slider', el).length){
                                                    $('.megamenu-slider', el).slick({
                                                        dots: true,
                                                        arrows: false,
                                                        mobileFirst: true,
                                                        slidesToShow: 1,
                                                        slidesToScroll: 1,
                                                        responsive: [
                                                            {
                                                                breakpoint: 1440,
                                                                settings: {
                                                                    slidesToShow: 3,
                                                                    slidesToScroll: 1
                                                                }
                                                            },
                                                            {
                                                                breakpoint: 1200,
                                                                settings: {
                                                                    slidesToShow: 2,
                                                                    slidesToScroll: 1
                                                                }
                                                            }
                                                        ]
                                                    });
                                                }
                                            });
                                        }

                                        if ($(window).width() > 1199) {
                                            $(".navPages-list-megamenu li").mouseover(function() {
                                                if ($(this).find('.megamenu-slider.slick-initialized').length) {
                                                    $(this).find('.megamenu-slider').get(0).slick.setPosition();
                                                }
                                            });
                                        }

                                        $('.navPages-list-megamenu > .navPages-item > .navPages-action').on('click',function(event) {
                                            if ($(this).parent().find('.megamenu-slider.slick-initialized').length) {
                                                $(this).parent().find('.megamenu-slider').get(0).slick.setPosition();
                                            }
                                        });
                                    }
                                }
                            }

                            if(param.style === 'style 2') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-2 fullWidth');

                                    if(!subMegaMenu.find('.cateArea').length){
                                        subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                    }

                                    if(!subMegaMenu.find('.imageArea').length){
                                        subMegaMenu.append('<div class="imageArea"><div class="container"><div class="imageAreaInner"><div class="megamenu-left-item">'+param.images+'</div></div></div></div>');
                                        
                                        if (param.products.length && (param.products !== '')) {
                                            subMegaMenu.find('.imageArea > .container > .imageAreaInner').append(param.products);
                                        }
                                    }

                                    subMegaMenu.find('.imageArea').css({
                                        'width': '100%',
                                        'max-width': param.imageAreaWidth
                                    });

                                    subMegaMenu.find('.cateArea').css({
                                        'width': '100%',
                                        'max-width': param.cateAreaWidth
                                    });
                                    if (param.products.length && (param.products !== '')) {
                                        const brand = subMegaMenu.find('.imageArea .megamenu-brands-inner');

                                        if (brand.length) {
                                            const $megamenuBrands = $('.megamenu-brands');
                                            const $menubrandItem = $('.haloMegamenuBrand__list li');

                                            $menubrandItem.each(function(index, element) {
                                                const txt = $(element).data('brand-letter');

                                                if (!$megamenuBrands.find('[data-brand-letter="'+txt+'"]').hasClass('has-letter')) {
                                                    $megamenuBrands.find('[data-brand-letter="'+txt+'"]').addClass('has-letter');
                                                }   
                                            });
                                        }
                                    }
                                }
                            }

                            if(param.style === 'style 3') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-3 fullWidth');
                                }

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="container"><div class="cateArea columns-'+param.cateColumns+'"></div></div>');
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.find('> .container').append('<div class="imageArea"><div class="megamenu-right-item">'+param.images+'</div></div>');
                                    
                                    if (param.products.length && (param.products !== '')) {
                                        subMegaMenu.find('.imageArea').prepend('<div class="megamenu-product-list">'+param.products+'</div>');
                                    }
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });

                                if (param.productId.length && (param.productId !== '')) {
                                    var productIDS = param.productId,
                                        featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                    const $options = {
                                        template: 'halothemes/halo-megamenu-tmp'
                                    };

                                    if (productIDS !== '') {
                                        var listIDs = JSON.parse("[" + productIDS + "]");

                                        if (featuredProductCarousel.length) {
                                            featuredProductCarousel.find('.megamenu-slider2').html('<div class="loadingOverlay" style="display:block;"></div>');

                                            var n = 0;

                                            for (var i = 0; i < listIDs.length; i++) {
                                                var productId = listIDs[i];

                                                utils.api.product.getById(productId, $options, (err, response) => {
                                                    var hasProd = $(response).find('.card').data('product-id');

                                                    if(hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length){
                                                         featuredProductCarousel.find('.megamenu-slider2').append(response);
                                                         n++;                                                            
                                                    } else {
                                                        n++;
                                                    }

                                                    if (n == listIDs.length) {
                                                        featuredProductCarousel.find('.megamenu-slider2 .loadingOverlay').remove();
                                                        productSlider(featuredProductCarousel);
                                                        
                                                    }
                                                });
                                            }

                                            
                                        }
                                    }

                                    function productSlider(element){
                                        element.each(function(idx, el) {
                                            if($('.megamenu-slider2', el).length){
                                                $('.megamenu-slider2', el).slick({
                                                    infinite: false,
                                                    dots: false,
                                                    arrows: true,
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1
                                                });
                                            }
                                        });
                                    }

                                    if ($(window).width() > 1024) {    
                                        $(".navPages-list-megamenu li").mouseover(function() {
                                            if ($(this).find('.megamenu-slider2.slick-initialized').length) {
                                                $(this).find('.megamenu-slider2').get(0).slick.setPosition();
                                            }
                                        });
                                    }
                                    $('.navPages-list-megamenu > .navPages-item > .navPages-action').on('click',function(event) {
                                        if ($(this).parent().find('.megamenu-slider2.slick-initialized').length) {
                                            $(this).parent().find('.megamenu-slider2').get(0).slick.setPosition();
                                        }
                                    });
                                }
                            }

                            if(param.style === 'style 4') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-4 fullWidth');
                                }

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.append('<div class="rightArea itemArea"><div class="container"><div class="megamenu-right-item">'+param.images+'</div></div></div>');
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });
                            }

                            const navPagesAction = $(el).children('.navPages-action').children('.text');

                            if (param.label === 'new') {
                                navPagesAction.append('<span class="navPages-label new-label">New</span>');
                            } else if (param.label === 'sale') {
                                navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                            } else if (param.label === 'hot') {
                                navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                            }
                        } else{
                            const navPagesAction = $(el).children('.navPages-action').children('.text');

                            if (param.label === 'new') {
                                navPagesAction.append('<span class="navPages-label new-label">New</span>');
                            } else if (param.label === 'sale') {
                                navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                            } else if (param.label === 'hot') {
                                navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                            }
                        }
                    });
                } else {
                    $('.navPages-list:not(.navPages-list--user) > li:nth-child(' + num + ')').each(function(idx, el) {
                        if (param.disabled === false) {
                            const subMegaMenu = $(el).find('> .navPage-subMenu');

                            if(param.style === 'style 1') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-1 fullWidth');
                                    if(!subMegaMenu.find('.cateArea').length){
                                        subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                    }

                                    if(!subMegaMenu.find('.imageArea').length){
                                        subMegaMenu.append('<div class="imageArea"><div class="container"><div class="imageAreaInner"><div class="megamenu-right-item">'+param.images+'</div></div></div></div>');
                                        
                                        if (param.products.length && (param.products !== '')) {
                                            subMegaMenu.find('.imageArea > .container > .imageAreaInner').prepend('<div class="megamenu-product-list">'+param.products+'</div>');
                                        }
                                    }

                                    subMegaMenu.find('.imageArea').css({
                                        'width': '100%',
                                        'max-width': param.imageAreaWidth
                                    });

                                    subMegaMenu.find('.cateArea').css({
                                        'width': '100%',
                                        'max-width': param.cateAreaWidth
                                    });

                                    if (param.productId.length && (param.productId !== '')) {
                                        var productIDS = param.productId,
                                            featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                        const $options = {
                                            template: 'halothemes/halo-megamenu-tmp'
                                        };

                                        if (productIDS !== '') {
                                            var listIDs = JSON.parse("[" + productIDS + "]");

                                            if (featuredProductCarousel.length) {
                                                featuredProductCarousel.find('.megamenu-slider').html('<div class="loadingOverlay" style="display:block;"></div>');

                                                var n = 0;

                                                for (var i = 0; i < listIDs.length; i++) {
                                                    var productId = listIDs[i];
                                                    utils.api.product.getById(productId, $options, (err, response) => {
                                                        var hasProd = $(response).find('.card').data('product-id');

                                                        if(hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length){
                                                             featuredProductCarousel.find('.megamenu-slider').append(response);
                                                             n++;                                                            
                                                        } else {
                                                            n++;
                                                        }

                                                        if (n == listIDs.length) {
                                                            featuredProductCarousel.find('.megamenu-slider .loadingOverlay').remove();
                                                            productSlider(featuredProductCarousel);
                                                        }
                                                    });
                                                }                                            
                                            }
                                        }

                                        function productSlider(element){
                                            element.each(function(idx, el) {
                                                if($('.megamenu-slider', el).length){
                                                    $('.megamenu-slider', el).slick({
                                                        dots: true,
                                                        arrows: false,
                                                        mobileFirst: true,
                                                        slidesToShow: 1,
                                                        slidesToScroll: 1,
                                                        responsive: [
                                                            {
                                                                breakpoint: 1200,
                                                                settings: {
                                                                    slidesToShow: 3,
                                                                    slidesToScroll: 1
                                                            }
                                                        }]
                                                    });
                                                }
                                            });
                                        }

                                        if ($(window).width() > 1199) {
                                            $(".navPages-list-megamenu li").mouseover(function() {
                                                if ($(this).find('.megamenu-slider.slick-initialized').length) {
                                                    $(this).find('.megamenu-slider').get(0).slick.setPosition();
                                                }
                                            });
                                        }

                                        $('.navPages-list-megamenu > .navPages-item > .navPages-action').on('click',function(event) {
                                            if ($(this).parent().find('.megamenu-slider.slick-initialized').length) {
                                                $(this).parent().find('.megamenu-slider').get(0).slick.setPosition();
                                            }
                                        });
                                    }
                                }
                            }

                            if(param.style === 'style 2') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-2 fullWidth');

                                    if(!subMegaMenu.find('.cateArea').length){
                                        subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                    }

                                    if(!subMegaMenu.find('.imageArea').length){
                                        subMegaMenu.append('<div class="imageArea"><div class="container"><div class="imageAreaInner"><div class="megamenu-left-item">'+param.images+'</div></div></div></div>');
                                        
                                        if (param.products.length && (param.products !== '')) {
                                            subMegaMenu.find('.imageArea > .container > .imageAreaInner').append(param.products);
                                        }
                                    }

                                    subMegaMenu.find('.imageArea').css({
                                        'width': '100%',
                                        'max-width': param.imageAreaWidth
                                    });

                                    subMegaMenu.find('.cateArea').css({
                                        'width': '100%',
                                        'max-width': param.cateAreaWidth
                                    });
                                    if (param.products.length && (param.products !== '')) {
                                        const brand = subMegaMenu.find('.imageArea .megamenu-brands-inner');

                                        if (brand.length) {
                                            const $megamenuBrands = $('.megamenu-brands');
                                            const $menubrandItem = $('.haloMegamenuBrand__list li');

                                            $menubrandItem.each(function(index, element) {
                                                const txt = $(element).data('brand-letter');

                                                if (!$megamenuBrands.find('[data-brand-letter="'+txt+'"]').hasClass('has-letter')) {
                                                    $megamenuBrands.find('[data-brand-letter="'+txt+'"]').addClass('has-letter');
                                                }   
                                            });
                                        }
                                    }
                                }
                            }

                            if(param.style === 'style 3') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-3 fullWidth');
                                }

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="container"><div class="cateArea columns-'+param.cateColumns+'"></div></div>');
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.find('> .container').append('<div class="imageArea"><div class="megamenu-right-item">'+param.images+'</div></div>');
                                    
                                    if (param.products.length && (param.products !== '')) {
                                        subMegaMenu.find('.imageArea').prepend('<div class="megamenu-product-list">'+param.products+'</div>');
                                    }
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });

                                if (param.productId.length && (param.productId !== '')) {
                                    var productIDS = param.productId,
                                        featuredProductCarousel = subMegaMenu.find('.megamenu-product-list');

                                    const $options = {
                                        template: 'halothemes/halo-megamenu-tmp'
                                    };

                                    if (productIDS !== '') {
                                        var listIDs = JSON.parse("[" + productIDS + "]");

                                        if (featuredProductCarousel.length) {
                                            featuredProductCarousel.find('.megamenu-slider2').html('<div class="loadingOverlay" style="display:block;"></div>');

                                            var n = 0;

                                            for (var i = 0; i < listIDs.length; i++) {
                                                var productId = listIDs[i];

                                                utils.api.product.getById(productId, $options, (err, response) => {
                                                    var hasProd = $(response).find('.card').data('product-id');

                                                    if(hasProd != undefined && hasProd != '' && hasProd != null && !$(response).find('.page-content--err').length){
                                                         featuredProductCarousel.find('.megamenu-slider2').append(response);
                                                         n++;
                                                       
                                                    } else {
                                                        n++;
                                                     }

                                                    if (n == listIDs.length) {
                                                        featuredProductCarousel.find('.megamenu-slider2 .loadingOverlay').remove();
                                                        productSlider(featuredProductCarousel);
                                                    }
                                                });
                                            }

                                            
                                        }
                                    }

                                    function productSlider(element){
                                        element.each(function(idx, el) {
                                            if($('.megamenu-slider2', el).length){
                                                $('.megamenu-slider2', el).slick({
                                                    dots: false,
                                                    arrows: true,
                                                    slidesToShow: 1,
                                                    slidesToScroll: 1
                                                });
                                            }
                                        });
                                    }

                                    if ($(window).width() > 1024) {    
                                        $(".navPages-list-megamenu li").mouseover(function() {
                                            if ($(this).find('.megamenu-slider2.slick-initialized').length) {
                                                $(this).find('.megamenu-slider2').get(0).slick.setPosition();
                                            }
                                        });
                                    }
                                    $('.navPages-list-megamenu > .navPages-item > .navPages-action').on('click',function(event) {
                                        if ($(this).parent().find('.megamenu-slider2.slick-initialized').length) {
                                            $(this).parent().find('.megamenu-slider2').get(0).slick.setPosition();
                                        }
                                    });
                                }
                            }

                            if(param.style === 'style 4') {
                                if(!$(el).hasClass('has-megamenu')){
                                    if($(el).hasClass('has-dropdown')) {
                                        $(el).removeClass('has-dropdown');
                                    }
                                    $(el).addClass('has-megamenu style-4 fullWidth');
                                }

                                if(!subMegaMenu.find('.cateArea').length){
                                    subMegaMenu.find('.navPage-subMenu-list-level1').wrap('<div class="cateArea columns-'+param.cateColumns+'"><div class="container"></div></div>');
                                }

                                if(!subMegaMenu.find('.imageArea').length){
                                    subMegaMenu.append('<div class="rightArea itemArea"><div class="container"><div class="megamenu-right-item">'+param.images+'</div></div></div>');
                                }

                                subMegaMenu.find('.imageArea').css({
                                    'width': '100%',
                                    'max-width': param.imageAreaWidth
                                });

                                subMegaMenu.find('.cateArea').css({
                                    'width': '100%',
                                    'max-width': param.cateAreaWidth
                                });
                            }

                            const navPagesAction = $(el).children('.navPages-action').children('.text');

                            if (param.label === 'new') {
                                navPagesAction.append('<span class="navPages-label new-label">New</span>');
                            } else if (param.label === 'sale') {
                                navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                            } else if (param.label === 'hot') {
                                navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                            }
                        } else{
                            const navPagesAction = $(el).children('.navPages-action').children('.text');

                            if (param.label === 'new') {
                                navPagesAction.append('<span class="navPages-label new-label">New</span>');
                            } else if (param.label === 'sale') {
                                navPagesAction.append('<span class="navPages-label sale-label">Sale</span>');
                            } else if (param.label === 'hot') {
                                navPagesAction.append('<span class="navPages-label hot-label">Hot</span>');
                            }
                        }
                    });
                }
                
                return this;
            }
        }
    }
}
