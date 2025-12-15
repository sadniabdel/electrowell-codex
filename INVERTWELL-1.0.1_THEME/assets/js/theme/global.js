import 'focus-within-polyfill';
import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';

/* Halothemes */
import haloGlobal from './halothemes/haloGlobal';
import haloRecentlyBoughtPopup from './halothemes/haloRecentlyBoughtPopup';
import haloAjaxAddToCart from './halothemes/haloAjaxAddToCart';
import RecentlyViewedProducts from './halothemes/haloRecentlyViewedProducts';
import BeforeYouLeave from './halothemes/haloBeforeYouLeave';
import haloTopPromotion from './halothemes/haloTopPromotion';
import StickyHeader from './halothemes/haloStickyHeader';
import haloNewsletterPopup from './halothemes/haloNewsletterPopup';
import haloStickyNotificationBar from './halothemes/haloStickyNotificationBar';

/* */
import haloMegaMenu from './halothemes/haloMegaMenu';
    window.haloMegaMenu = haloMegaMenu;

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId, this.context);
        
        quickSearch();
        
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();

        /* Halothemes */
        window.themeSettings = this.context.themeSettings;
        haloGlobal(this.context);

        const $context = this.context;
        var checkloadFunction = true;

        function loadFunction() {
            if (checkloadFunction) {
                checkloadFunction = false;

                haloRecentlyBoughtPopup($context);
                haloAjaxAddToCart($context);
                RecentlyViewedProducts($context);
                BeforeYouLeave($context);

                if ($context.themeSettings.halo_sticky_header) {
                    StickyHeader();
                }

                if ($('body.page-type-default').length) {
                    if ($context.themeSettings.homepage_promotion) {
                        haloTopPromotion(1, true);
                    }
                    else {
                        haloTopPromotion(1, false);
                    }
                }

                if ($context.themeSettings.halo_newsletter_popup) {
                    haloNewsletterPopup(1, true);
                }
                else {
                    haloNewsletterPopup(1, false);
                }

                if ($context.themeSettings.halo_sticky_notification_bar) {
                    haloStickyNotificationBar(1, true);
                }
                else {
                    haloStickyNotificationBar(1, false);
                }

            }
        }

        loadFunction();

        // $(document).on('keydown', (e) => {
        //     loadFunction();
        // });

        // $(document).on('mousemove', (e) => {
        //     loadFunction();
        // });

        // $(document).on('touchstart', (e) => {
        //     loadFunction();
        // });

        // $(window).on('scroll', (e) => {
        //     loadFunction();
        // });
    }
}
