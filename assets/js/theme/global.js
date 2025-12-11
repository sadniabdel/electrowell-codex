import $ from 'jquery';
import './common/select-option-plugin';
import 'html5-history-api';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import compareProducts from './global/compare-products';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import 'lazysizes';
import loadingProgressBar from './global/loading-progress-bar';
import FastClick from 'fastclick';

/* eslint-disable  no-unused-vars */
import Bootstrap from 'bootstrap';

import 'jquery.browser';
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import haloProductImageSwap from './halothemes/haloProductImageSwap';
import owlCarousel from 'owl.carousel';
import carousel from './common/carousel';
import mouseWheel from 'jquery-mousewheel';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';
import magnificPopup from 'magnific-popup';

import haloGlobal from './halothemes/haloGlobal';

import backToTop from './halothemes/backToTop';

import topBarPromotion from './halothemes/topBarPromotion';

import stickyNavigation from './halothemes/stickyNavigation';
    window.stickyNavigation = stickyNavigation;

import haloProductNewLabel from './halothemes/haloProductNewLabel';

import haloDropdownLogin from './halothemes/haloDropdownLogin';

import haloNewsletterPopup from './halothemes/haloNewsletterPopup';
    window.haloNewsletterPopup = haloNewsletterPopup;

import haloSizeChart from './halothemes/haloSizeChart';
    window.haloSizeChart = haloSizeChart;

/* Halo Catalog Category Search */
import HaloCatalogCategorySearch  from './halothemes/halo-catalog-category-search';

import halothemesRecentlyBought from './halothemes/halothemes_RecentlyBought';

function fastClick(element) {
    return new FastClick(element);
}

export default class Global extends PageManager {
    /**
     * You can wrap the execution in this method with an asynchronous function map using the async library
     * if your global modules need async callback handling.
     * @param next
     */
    loaded(next) {
        topBarPromotion();
        haloDropdownLogin();
        haloProductImageSwap();
        haloGlobal();
        haloProductNewLabel();
        backToTop();
        carousel();
        fastClick(document.body);
        //quickSearch();
        HaloCatalogCategorySearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        cartPreview();
        compareProducts(this.context.urls);
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        next();
        halothemesRecentlyBought(this.context);
    }
}

