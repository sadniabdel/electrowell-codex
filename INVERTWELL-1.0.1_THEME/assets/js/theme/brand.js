import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import compareProducts from './global/compare-products';
import FacetedSearch from './common/faceted-search';
import { createTranslationDictionary } from '../theme/common/utils/translations-utils';
import productDisplayMode from './halothemes/haloProductDisplayMode';
import haloStickyToolbar from './halothemes/haloStickyToolbar';

export default class Brand extends CatalogPage {
    constructor(context) {
        super(context);
        this.validationDictionary = createTranslationDictionary(context);
    }

    onReady() {
        compareProducts(this.context.urls);

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        /* Halothemes */
        this.category_sidebar();
        productDisplayMode(this.context);
        haloStickyToolbar();
        this.showProductsPerPage();
        if (this.context.themeSettings.halo_show_more == true) {
            this.showmore_product();
        }
    }

    initFacetedSearch() {
        const {
            price_min_evaluation: onMinPriceError,
            price_max_evaluation: onMaxPriceError,
            price_min_not_entered: minPriceNotEntered,
            price_max_not_entered: maxPriceNotEntered,
            price_invalid_value: onInvalidPrice,
        } = this.validationDictionary;
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.brandProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'brand/product-listing',
                sidebar: 'brand/sidebar',
            },
            config: {
                shop_by_brand: true,
                brand: {
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            showMore: 'brand/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            /* Halothemes */
            this.category_sidebar();
            this.showProductsPerPage();
            haloStickyToolbar();
            productDisplayMode(this.context);

        }, {
            validationErrorMessages: {
                onMinPriceError,
                onMaxPriceError,
                minPriceNotEntered,
                maxPriceNotEntered,
                onInvalidPrice,
            },
        });
    }

    /* Halothemes Functions */

    category_sidebar() {
        if ($('.all-categories-list').length > 0) {
            $('ul.all-categories-list li').each(function() {
              const breadLink = $('.page-type-product #breadcrumbs-wrapper ul li.breadcrumb.is-active').prev('.breadcrumb').children('a').attr('href');
              if (($(this).children('a').attr('href') == window.location) || ($(this).children('a').attr('href') == window.location.pathname)) {
                 $(this).addClass('current-cat');
                 $(this).children('.dropdown-category-list').addClass('cat-expanded').siblings('.icon-dropdown').addClass('is-clicked');
                 $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('.icon-dropdown').addClass('is-clicked');
              }
              if ($(this).children('a').attr('href') == breadLink) {
                 $(this).addClass('current-cat');
                 $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('.icon-dropdown').addClass('is-clicked');
                 
              }
           });
                    
            $('.all-categories-list .icon-dropdown').on('click', function() {
                $(this).parent().siblings().removeClass('is-clicked');
                $(this).parent().siblings().find("> .dropdown-category-list").slideUp( "slow" );
                $(this).parent().siblings().find("> .icon-dropdown").removeClass('is-clicked');
                $(this).parent().find("> .dropdown-category-list").slideToggle( "slow" );
                $(this).parent().siblings().removeClass('open');
                if ($(this).hasClass('is-clicked')) {
                    $(this).removeClass('is-clicked');
                    $(this).parent().removeClass('open');
                } else {
                    $(this).addClass('is-clicked');
                    $(this).parent().addClass('open');
                }
           });
        }
    }

    showProductsPerPage(){
        try {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("limit");
            if(c != null){
                var limit = document.querySelectorAll('select#limit option');
                Array.prototype.forEach.call(limit, function(element) {
                    if(element.value == c){
                        element.selected = true;
                    }
                });
            }
        } catch(e) {}
    }

    showmore_product() {
        const context = this.context;

        $('#button-showmore-category').on('click', (event) => {
            event.preventDefault();
            var nextPage = $(".pagination-wrapper .pagination-item--current").next(),
                link = nextPage.find("a").attr("href");

            if (link == undefined) {
                if (!$('#button-showmore-category').hasClass('disable')) {
                    $('#button-showmore-category').addClass('disable');
                }
            } else {
                $('#button-showmore-category').addClass('loading');

                $.ajax({
                    type: 'get',
                    url: link.replace("http://", "//"),
                    context: this.content,
                    success: function(data) {
                        if ($(data).find('#product-listing-container .productListing').length > 0) {
                            $('#product-listing-container .productListing').append($(data).find('#product-listing-container .productListing').children());
                            $('.pagination-list').html($(data).find(".pagination-list").html());
                            $('#button-showmore-category').removeClass('loading');
                            nextPage = $(".pagination-wrapper .pagination-item--current").next();
                            
                            if (Number($(data).find('.pagination-info .end').text()) < Number($(data).find('.pagination-info .total').text())) {
                                $('.pagination .pagination-info .end').html($(data).find('.pagination-info .end').text());
                            } else {
                                $('.pagination .pagination-info .end').html($(data).find('.pagination-info .total').text());
                            }
                            if (nextPage.length === 0) {
                                $('#button-showmore-category').addClass('disable');
                                $('#button-showmore-category > span').text('No more product');
                            }

                            var $prodWrapId = $('#product-listing-container .card-variant').attr('id');
                            //haloColorVariants(context, $prodWrapId);
                        }
                    }
                })
            }
        });
    }
}
