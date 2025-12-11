import $ from 'jquery';
import _ from 'lodash';
import utils from '@bigcommerce/stencil-utils';
import StencilDropDown from '../global/stencil-dropdown';
import HaloQuickSearch from './haloquicksearch';

export default function(){
	const TOP_STYLING = 'top: 49px;';
    const $quickSearchResults = $('.quickSearchResults');
    const $quickSearchDiv = $('.quickSearchResultsWrap');
    const $searchQuery = $('#search_query');
    const stencilDropDownExtendables = {
        hide: () => {
            $searchQuery.blur();
        },
        show: (event) => {
            $searchQuery.focus();
            event.stopPropagation();
        },
    };
    const stencilDropDown = new StencilDropDown(stencilDropDownExtendables);
    stencilDropDown.bind($('[data-search="quickSearch"]'), $quickSearchDiv, TOP_STYLING);

    stencilDropDownExtendables.onBodyClick = (e) => {
        // If the target element has this data tag or one of it's parents, do not close the search results
        // We have to specify `.modal-background` because of limitations around Foundation Reveal not allowing
        // any modification to the background element.
        if ($(e.target).closest('[data-prevent-quick-search-close], #search_query, .modal-background').length === 0) {
            // stencilDropDown.hide($container);
            $quickSearchDiv.removeClass('hasResults');
        }
    };

    // stagger searching for 200ms after last input
    const doSearch = _.debounce((searchQuery, category) => {

    	var quickSearch = new HaloQuickSearch;

        quickSearch.search(searchQuery, category, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            if (response.search('quickSearchMessage') > 0) {
                $quickSearchDiv.addClass('hasNoResults');
            } else {
                $quickSearchDiv.removeClass('hasNoResults');
            }
            $quickSearchResults.mCustomScrollbar('destroy');
            $quickSearchDiv.addClass('hasResults');
            $quickSearchResults.html(response);
            $quickSearchResults.mCustomScrollbar({
                scrollInertia: 400,
            });
        });
    }, 200);

    utils.hooks.on('search-quick', (event) => {
        var searchQuery = $(event.currentTarget).val();

        // server will only perform search with at least 3 characters
        if (searchQuery.length < 3) {
            return;
        }
        var category = $(event.currentTarget).parents('form').find('select[name="category"]').val();
        doSearch(searchQuery, category);
    });

    // Catch the submission of the quick-search
    $quickSearchDiv.on('submit', (event) => {
        const searchQuery = $(event.currentTarget).find('input').val();

        if (searchQuery.length === 0) {
            return event.preventDefault();
        }

        return true;
    });

    //------------------new seach

	var getUrlParameter = function getUrlParameter(sParam) {
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
	};

	$(document).ready(function(){
		var category = getUrlParameter('category');
		$('#search_category').val(category).trigger("change");
        $('select[name="category"]').val(category).trigger("change");       
    });

    $('form[action="/search.php"]').on('submit', (event) => {        
        if($(event.currentTarget).find('select[name="category"]').val() === ''){            
            $(event.currentTarget).find('select').attr('name','');            
        }
    });
    
}

