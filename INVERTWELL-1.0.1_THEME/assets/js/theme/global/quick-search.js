import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from './stencil-dropdown';
import urlUtils from '../common/utils/url-utils';
import haloQuickSearch from './halosearchCategories';

export default function () {
    const TOP_STYLING = 'top: 49px;';
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchForms = $('[data-quick-search-form]');
    const $quickSearchExpand = $('#quick-search-expand');
    const $searchQuery = $quickSearchForms.find('[data-search-quick]');
    const stencilDropDownExtendables = {
        hide: () => {
            $quickSearchExpand.attr('aria-expanded', false);
            $searchQuery.trigger('blur');
        },
        show: (event) => {
            $quickSearchExpand.attr('aria-expanded', true);
            $searchQuery.trigger('focus');
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $('#quickSearch'), TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e, $container) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], .modal-background').length === 0) {
            stencilDropDown.hide($container);
            $('#quickSearch #nav-quick-search').val('');
            $('#quickSearch .quickSearchResults').empty();
             $('.quickSearchResults').removeClass('show-result');
        }
    };

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery, category, target) => {
        var quickSearch = new haloQuickSearch;
        var dropDownQuickSearch = target.parents('.dropdown--quickSearch');

        if (dropDownQuickSearch.hasClass('haloSeachCategories')) {
            quickSearch.search(searchQuery, category, { template: 'search/quick-results' }, (err, response) => {
                if (err) {
                    return false;
                }
                target.parents('.dropdown--quickSearch').find('.quickSearchResults').addClass('hasResults');
                target.parents('.dropdown--quickSearch').find('.quickSearchResults').html(response);
                $('.quickSearchResults').addClass('show-result');
                $('.header .dropdown--quickSearch').addClass('is-open');
                const $quickSearchResultsCurrent = $quickSearchResults.filter(':visible');

                const $noResultsMessage = $quickSearchResultsCurrent.find('.quickSearchMessage');
                if ($noResultsMessage.length) {
                    $noResultsMessage.attr({
                        role: 'status',
                        'aria-live': 'polite',
                    });
                    $('.quickSearchResults').addClass('noResults');
                } else {
                    const $quickSearchAriaMessage = $quickSearchResultsCurrent.next();
                    $quickSearchAriaMessage.addClass('u-hidden');

                    const predefinedText = $quickSearchAriaMessage.data('search-aria-message-predefined-text');
                    const itemsFoundCount = $quickSearchResultsCurrent.find('.product').length;

                    $quickSearchAriaMessage.text(`${itemsFoundCount} ${predefinedText} ${searchQuery}`);
                    $('.quickSearchResults').removeClass('noResults');

                    setTimeout(() => {
                        $quickSearchAriaMessage.removeClass('u-hidden');
                    }, 100);
                }

                if ($('.quickSearch-re .productCarousel').length) {
                    $('.quickSearch-re .productCarousel').slick('refresh');
                }
            });
        } else {
            utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
                if (err) {
                    return false;
                }
                target.parents('.dropdown--quickSearch').find('.quickSearchResults').html(response);

                $('.quickSearchResults').addClass('show-result');
                $('.header .dropdown--quickSearch').addClass('is-open');
                const $quickSearchResultsCurrent = $quickSearchResults.filter(':visible');

                const $noResultsMessage = $quickSearchResultsCurrent.find('.quickSearchMessage');
                if ($noResultsMessage.length) {
                    $noResultsMessage.attr({
                        role: 'status',
                        'aria-live': 'polite',
                    });
                    $('.quickSearchResults').addClass('noResults');
                } else {
                    const $quickSearchAriaMessage = $quickSearchResultsCurrent.next();
                    $quickSearchAriaMessage.addClass('u-hidden');

                    const predefinedText = $quickSearchAriaMessage.data('search-aria-message-predefined-text');
                    const itemsFoundCount = $quickSearchResultsCurrent.find('.product').length;

                    $quickSearchAriaMessage.text(`${itemsFoundCount} ${predefinedText} ${searchQuery}`);
                    $('.quickSearchResults').removeClass('noResults');

                    setTimeout(() => {
                        $quickSearchAriaMessage.removeClass('u-hidden');
                    }, 100);
                }

                if ($('.quickSearch-re .productCarousel').length) {
                    $('.quickSearch-re .productCarousel').slick('refresh');
                }
            });
        }
         
    }, 200);

    utils.hooks.on('search-quick', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();
        const category = $(currentTarget).parents('form').find('select[name="category"]').val();
        var target = $(currentTarget);

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            $(currentTarget).parent().find('.quickSearchResults').removeClass('show-result');
            $('.header .dropdown--quickSearch').removeClass('is-open');

            return;
        }
        
        if (target.parents('.dropdown--quickSearch').hasClass('haloSeachCategories')) {
            doSearch(searchQuery, category, target);
        } else {
            doSearch(searchQuery, target);
        }
        
    });

    utils.hooks.on('search-quick-2', (event, currentTarget) => {
        const searchQuery = $(currentTarget).val();
        var target = $(currentTarget);

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            $('.quickSearchResults').removeClass('show-result');
            $('.header .dropdown--quickSearch').removeClass('is-open');
            return;
        }

        doSearch(searchQuery, target);
    });

    // Catch the submission of the quick-search forms
    $quickSearchForms.on('submit', event => {
        event.preventDefault();
        
        
        const $target = $(event.currentTarget);
        const searchQuery = $target.find('input').val();
        const searchUrl = $target.data('url');
        var dropDownQuickSearch = $(event.currentTarget).parents('.dropdown--quickSearch');
        const category = $(event.currentTarget).find('select[name="category"]').val();
        console.log("category: " + category)


        if (searchQuery.length === 0) {
            return;
        }

        if (dropDownQuickSearch.hasClass('haloSeachCategories')) {
            urlUtils.goToUrl(`${searchUrl}?search_query=${searchQuery}&category=${category}`);
        } else {
            urlUtils.goToUrl(`${searchUrl}?search_query=${searchQuery}`);
        }
        
        window.location.reload();
    });

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i, len;

        for (i = 0, len = sURLVariables.length; i < len; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    function search_category() {
        var category = getUrlParameter('category');
        $('#search_category').val(category).trigger("change");
        $('select[name="category"]').val(category).trigger("change");
        $(document).on('change', '#search_category .select_category', function() {
           var text_option = $(this).find('option:selected').text();
           var $test_option = $('<span>').html(text_option);
           $test_option.appendTo('body');
           var width_option = $test_option.width() + 62;
           $test_option.remove();
           $(this).parent().css('min-width', width_option);
           console.log("text_option: " + text_option);
           console.log("$test_option: " + $test_option);
        })

        $('.haloSeachCategories form[action="/search.php"]').on('submit', (event) => {
            if($(event.currentTarget).find('select[name="category"]').val() === ''){
                $(event.currentTarget).find('select').attr('name','');
            }
        });
    }
    search_category();

    $(document).ready(function(){
        var category = getUrlParameter('category');
        $('#search_category').val(category).trigger("change");
        $('select[name="category"]').val(category).trigger("change");
          console.log("category: " + category);
    });
}
