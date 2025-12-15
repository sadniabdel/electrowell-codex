import $ from 'jquery';
import classie from 'classie';
import utils from '@bigcommerce/stencil-utils';
/* eslint-disable space-before-function-paren */
/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable wrap-iife */

export default function() {
  var is_mobile = false;
  if ($(window).width() < 1023) {
    is_mobile = true;
  }
  else{
    is_mobile = false;
  }

  function showMore(container){
    
    var width_menu = 0;
      $(container + ' > ul li').each(function(){
        width_menu += $(this).width();        
      });
      width_menu = width_menu - $(container+ '.showMore').width();      
      if (width_menu >= $(container).width()) {
        $(container).addClass('active');
      }else{
        $(container).removeClass('active');
      };
  }
    
  jQuery(document).ready(function($) {            

      showMore('.halo-best-selling-promotion >div.container');
      $('.showMore').click(function() {        
        $(this).parent().parent().toggleClass('is-open');          
      });

      // OwlCarousel init
      const $carousel = $('[data-owl]');
      if ($carousel.length) {
         $carousel.each(function(index, el) {
            $(this).owlCarousel($(this).data('owl'));
         });
      }

      // SideBar Toggle Mobile View
      if ($('#sidebar-toggle').length) {          
        $('.sidebarBlock .side-module-heading').click(function(){
          if(!is_mobile) return false;
          if($(this).hasClass('is-hide')){
            $(this).removeClass('is-hide');
            $(this).addClass('is-show');
          }
          else{
            $(this).addClass('is-hide');
            $(this).removeClass('is-show');
          }
          if($(this).next().css('display') == 'none'){
            $(this).next().slideDown();
          }
          else{       
            $(this).next().slideUp();
          }
        });     
        $('#sidebar-toggle').click(function() {
          $('.sidebarBlock .side-module-heading').next().hide();
          $('.sidebarBlock .side-module-heading').addClass('is-hide');
          if(!is_mobile) return false;
          if ($(this).find('i').hasClass('fa-chevron-down')) {
             $('.page-sidebar > nav').slideDown();                
             $(this).find('i').attr('class', 'fa fa-chevron-up');        
          } 
          else if ($(this).find('i').hasClass('fa-chevron-up')) {               
             $('.page-sidebar > nav').slideUp();              
             $(this).find('i').attr('class', 'fa fa-chevron-down');
          }
        });
      }

      // Mobile Menu Links
      $('#mobile-customer ul').css('max-height', screen.height);
      $(window).resize(function(event) {
         /* Act on the event */
         $('#mobile-categories ul').css('max-height', screen.height);
         $('#mobile-customer ul').css('max-height', screen.height);
      });

      $('#mobile-customer ul li > span').click(function() {
         if ($(this).hasClass('toggle-expand')) {
            $(this).siblings('div').addClass('sub-expand');
            $(this).parent().addClass('expanded');
            $(this).attr('class', 'toggle-close');
         } else if ($(this).hasClass('toggle-close')) {
            $(this).siblings('div').removeClass('sub-expand');
            $(this).parent().removeClass('expanded');
            $(this).attr('class', 'toggle-expand');
         }
      });

      $(document).on('change', '#search_category .select_category', function() {
           var p = $(this).parent().width();
           var text_option = $(this).find("option:selected").text();
           var $test_option = $("<span>").html(text_option);
           $test_option.appendTo('body');
           var width_option = $test_option.width() + 62;
           $test_option.remove();
           $(this).parent().width(width_option);
           var q = width_option + 62;            
           $('#quickSearch > form .form-field input#search_query').css({ 'width': 'calc(100% - ' + width_option + 'px)' });
      })

      // check pagination
      $('.pagination').each(function(index, el) {
         if ((!$(this).children('ul.pagination-list').length > 0) && ($(this).children('.compare-link').length > 0)) {
            $(this).addClass('only-compare');
         }
      });

      function initSearchBoxFixed() {
         const eventtype = $.browser.mobile ? 'touchstart' : 'click';
         $('.search-toggle').on(eventtype, function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('is-open');
         });
         $(document).on(eventtype, function(ev) {
            if ($(ev.target).closest('#quickSearch').length === 0) {
               $('.search-toggle').parent().removeClass('is-open');
            }
         });
      }

      initSearchBoxFixed();


      // Mobile Search Toggle Button
      $('#mobile-search-toggle').click(function(event) {
         /* Act on the event */
         $(this).toggleClass('is-open');
      });
	  
       	function halo_FeaturedCategory_owlCarousel(){    
       		$(".featured-category-owl").owlCarousel({
                loop:true,
                responsiveClass:true,
                   responsive:{
                     0:{
                         items:1,
                         nav:true
                     },
                     620:{
                         items:2,
                         nav:true
                     },
                     992:{
                         items:3,
                         nav:true,
                         loop:false
                     }
                }   		
       		});
       	}
   	    halo_FeaturedCategory_owlCarousel();

      if ($(window).width() < 992) {
        $('.header-bottom .header-panel #st-trigger-effects').prependTo('.header-bottom .header-panel > .header-first');
      }
      else{
        $('.header-bottom .header-panel > .header-first #st-trigger-effects').appendTo('.header-bottom .header-panel #trigger-desktop');        
      }
      
      if ($(window).width() < 768) {
        $('.navUser #currency-converter').appendTo('#mobile-categories > ul');
      }
      else{
        $('#mobile-categories > ul  #currency-converter').appendTo('.navUser ul');
      }

      $(".prod-name > a").each(function() {
        var product = jQuery(this);
        var proId = product.attr('data-product-id');
        var url = '/products.php?productId=' + proId;
            var link = product.attr("href");
        if(proId){
          utils.api.product.getById(proId, { template: 'halothemes/free-shipping' }, (err, response) => {       
            if($(response).find('.productView-info-value').hasClass('hl_shipping_free')){
              var free_shipping = jQuery(response).find(".hl_shipping_free").text();          
              product.parent().parent().append("<p class='free_shipping'><i class='fa fa-truck' aria-hidden='true'></i>"+free_shipping+"</p>");
            }
          });         
        }    
      });

      function home_category_banner_block_item_image(){    
        $(".hl-home-category-content .item-image > .owl-carousel").owlCarousel({
              loop:true,
              responsiveClass:true,
              nav:false,
              dots:true,
              items:1      
        });
      }
      home_category_banner_block_item_image();


      function home_category_banner_block_owlCarousel(id_tab){    
        $('#'+id_tab+' .productBlockContainer').owlCarousel({
            loop:true,
            responsiveClass:true,
               responsive:{
                 0:{
                     items:1,
                     nav:true
                 },
                 380:{
                     items:2,
                     nav:true
                 },
                 600:{
                     items:3,
                     nav:true,
                     loop:false
                 },
                 1199:{
                     items:4,
                     nav:true,
                     loop:false
                 }
            }
        });
      }
      
      //home_category_banner_block_owlCarousel();
      $('#home-category-banner-block .hl-home-category').each(function(index, el) {        
        showMore('#'+$(this).attr('id')+' .hl-featured-category');
        var thisItem = $(this);
        var block_id = thisItem.attr('id').replace('block','');
        var limit = '&limit=5';
        var link_new = thisItem.find('.module-heading > a').attr('href') + '?sort=newest' + limit;
       
        thisItem.find('#new-products'+block_id+' .productBlockContainer').html('<div class="loading-items text-center">Loading... Please wait...</div>');
        utils.api.getPage(link_new, { template: 'halothemes/home-category-content' }, (err, response) => {

            thisItem.find('.loading-items').remove();
            thisItem.find('#new-products'+block_id+' .productBlockContainer').addClass('owl-carousel');
            
            thisItem.find('#new-products'+block_id+' .productBlockContainer').html($(response).find('.productBlockContainer').children());

            thisItem.find('#new-products'+block_id+' .productBlockContainer').find(".prod-name > a").each(function() {
              var product = jQuery(this);
              var proId = product.attr('data-product-id');
              var url = '/products.php?productId=' + proId;
                  var link = product.attr("href");
              if(proId){
                utils.api.product.getById(proId, { template: 'halothemes/free-shipping' }, (err, response) => {       
                  if($(response).find('.productView-info-value').hasClass('hl_shipping_free')){
                    var free_shipping = jQuery(response).find(".hl_shipping_free").text();          
                    product.parent().parent().append("<p class='free_shipping'><i class='fa fa-truck' aria-hidden='true'></i>"+free_shipping+"</p>");
                  }
                });         
              }    
            });
            
            thisItem.find('#new-products'+block_id+' .productBlockContainer').owlCarousel({
                loop:true,
                responsiveClass:true,
                   responsive:{
                     0:{
                         items:1,
                         nav:true
                     },
                     380:{
                         items:2,
                         nav:true
                     },
                     600:{
                         items:3,
                         nav:true,
                         loop:false
                     },
                     1199:{
                         items:4,
                         nav:true,
                         loop:false
                     }
                }           
            });
            
        });
        

      });

      $('.hl-home-category ul li a').click(function(){                  
          var thisItem = $(this).parents('.hl-home-category');
          var url = "";
          var block_id = thisItem.attr('id').replace('block','');
          var tab_content = '';
          var limit = '&limit=5';
          
          switch($(this).attr('href').replace('#','')){
              case 'new-products'+block_id: url = thisItem.find('.module-heading > a').attr('href') + '?sort=newest' + limit; tab_content = 'new-products';break;
              case 'top-sellers'+block_id: url = thisItem.find('.module-heading > a').attr('href') + '?sort=bestselling' + limit; tab_content = 'top-sellers'; break;
              case 'featured-products'+block_id: url = thisItem.find('.module-heading > a').attr('href') + '?sort=featured' + limit; tab_content = 'featured-products'; break;
              case 'most-popular-reviews'+block_id: url = thisItem.find('.module-heading > a').attr('href') + '?sort=avgcustomerreview' + limit; tab_content = 'most-popular-reviews'; break;
          }    
          tab_content += block_id;
          if(url && thisItem.find('#'+tab_content+' .productBlockContainer').html() === ''){  
              thisItem.find('#'+tab_content+' .productBlockContainer').html('<div class="loading-items text-center">Loading... Please wait...</div>');
              utils.api.getPage(url, { template: 'halothemes/home-category-content' }, (err, response) => {
                  thisItem.find('.loading-items').remove();
                  thisItem.find('#'+tab_content+' .productBlockContainer').addClass('owl-carousel');
                  
                  thisItem.find('#'+tab_content+' .productBlockContainer').html($(response).find('.productBlockContainer').children());

                  thisItem.find('#'+tab_content+' .productBlockContainer').find(".prod-name > a").each(function() {
                    var product = jQuery(this);
                    var proId = product.attr('data-product-id');
                    var url = '/products.php?productId=' + proId;
                    var link = product.attr("href");
                    if(proId){
                      utils.api.product.getById(proId, { template: 'halothemes/free-shipping' }, (err, response) => {       
                        if($(response).find('.productView-info-value').hasClass('hl_shipping_free')){
                          var free_shipping = jQuery(response).find(".hl_shipping_free").text();          
                          product.parent().parent().append("<p class='free_shipping'><i class='fa fa-truck' aria-hidden='true'></i>"+free_shipping+"</p>");
                        }
                      });         
                    }    
                  });
                  home_category_banner_block_owlCarousel(tab_content);
                      
              });          
              
          }
      });

      if ($(window).width() <= 993) {
            // Footer Service 
            if (!$(".themevale_service").hasClass('slick-slider')) {
                $(".themevale_service").slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                    mobileFirst: true,
                    nextArrow: "<div class='slick-next slick-arrow'></div>", 
                    prevArrow: "<div class='slick-prev slick-arrow'></div>",
                    responsive: [
                    {
                        breakpoint: 551,
                        settings: {
                            fade: false,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },{
                        breakpoint: 320,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
            }
        } else {
            // Footer Service 
            if ($(".themevale_service").hasClass('slick-slider')) {
                $(".themevale_service").slick('unslick');
            }
        }
	});

$(window).resize(function() {
      if ($(window).width() < 992) {
        $('.header-bottom .header-panel #st-trigger-effects').prependTo('.header-bottom .header-panel > .header-first');
      }
      else{
        $('.header-bottom .header-panel > .header-first #st-trigger-effects').appendTo('.header-bottom .header-panel #trigger-desktop');        
      }

      if ($(window).width() >= 992) {
         $('body').removeClass('st-off-canvas');
         $('#st-container').removeClass('st-effect-1 st-menu-open');
      }

      if ($(window).width() < 768) {
        $('.navUser #currency-converter').appendTo('#mobile-categories > ul');
      }
      else{
        $('#mobile-categories > ul  #currency-converter').appendTo('.navUser ul');
      }

      if ($(window).width() < 1023) {
        is_mobile = true; 
        $('.sidebarBlock .side-module-heading').next().hide();            
        $('.page-sidebar > nav').hide();
        if ($('#sidebar-toggle').find('i').hasClass('fa-chevron-up')) {
           $('#sidebar-toggle').find('i').attr('class', 'fa fa-chevron-down');         
        }   
          }
          else{
        is_mobile = false;  
        $('.sidebarBlock .side-module-heading').next().show();  
        if ($('#sidebar-toggle').find('i').hasClass('fa-chevron-down')) {
           $('#sidebar-toggle').find('i').attr('class', 'fa fa-chevron-up');         
        }
      }
      
      showMore('.halo-best-selling-promotion >div.container');
      $('#home-category-banner-block .hl-home-category').each(function(index, el) {        
        showMore('#'+$(this).attr('id')+' .hl-featured-category');
      });

      if ($(window).width() <= 993) {
            // Footer Service 
            if (!$(".themevale_service").hasClass('slick-slider')) {
                $(".themevale_service").slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: true,
                    mobileFirst: true,
                    nextArrow: "<div class='slick-next slick-arrow'></div>", 
                    prevArrow: "<div class='slick-prev slick-arrow'></div>",
                    responsive: [
                    {
                        breakpoint: 551,
                        settings: {
                            fade: false,
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },{
                        breakpoint: 320,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }]
                });
            }
        } else {
            // Footer Service 
            if ($(".themevale_service").hasClass('slick-slider')) {
                $(".themevale_service").slick('unslick');
            }
        }
});

   /**
    * sidebarEffects.js v1.0.0
    * http://www.codrops.com
    *
    * Licensed under the MIT license.
    * http://www.opensource.org/licenses/mit-license.php
    *
    * Copyright 2013, Codrops
    * http://www.codrops.com
    */

   const SidebarMenuEffects = (function() {
      function hasParentClass(e, classname) {
         if (e === document) return false;
         if (classie.has(e, classname)) {
            return true;
         }
         return e.parentNode && hasParentClass(e.parentNode, classname);
      }

      function init() {
         const container = document.getElementById('st-container');
         const buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > a'));
         const buttonsAlt = Array.prototype.slice.call(document.querySelectorAll('li#mobileAccountSidebar > a'));
         // event type (if mobile use touch events)
         const eventtype = $.browser.mobile ? 'touchstart' : 'click';
         const resetMenu = function() {
            classie.remove(container, 'st-menu-open');
            $('body').removeClass('st-off-canvas');
         };
         const bodyClickFn = function(evt) {
            // if( hasParentClass( evt.target, 'close-canvas' ) ) {
            if (!hasParentClass(evt.target, 'st-menu')) {
               resetMenu();
               document.removeEventListener(eventtype, bodyClickFn);
            }
         };

         // toggle categories
         buttons.forEach(function(el, i) {
            const effect = el.getAttribute('data-effect');

            el.addEventListener(eventtype, function(ev) {
               ev.stopPropagation();
               ev.preventDefault();
               container.className = 'st-container'; // clear
               classie.add(container, effect);
               $(window).scrollTop(0);
               setTimeout(function() {
                  classie.add(container, 'st-menu-open');
                  $('body').addClass('st-off-canvas');
               }, 25);
               document.addEventListener(eventtype, bodyClickFn);
            });
         });

         // toggle account
         buttonsAlt.forEach(function(el, i) {
            const effect = el.getAttribute('data-effect');

            el.addEventListener(eventtype, function(ev) {
               ev.stopPropagation();
               ev.preventDefault();
               container.className = 'st-container'; // clear
               classie.add(container, effect);
               $(window).scrollTop(0);
               setTimeout(function() {
                  classie.add(container, 'st-menu-open');
                  $('body').addClass('st-off-canvas');
               }, 25);
               document.addEventListener(eventtype, bodyClickFn);
            });
         });
      }

      init();
   })();

   // Ask an Expert functionality
   function askAnExpert() {
       $(document).on('click', '#halo-ask-an-expert-button', event => {
           event.preventDefault();

           let ask_proceed = true;
           const customerName = $('#halo-ask-an-expert-form input[name=customer_name]').val();
           const customerMail = $('#halo-ask-an-expert-form input[name=customer_email]').val();
           const customerPhone = $('#halo-ask-an-expert-form input[name=customer_phone]').val();
           const customerCountry = $('#halo-ask-an-expert-form input[name=customer_country]').val();
           const customerCompany = $('#halo-ask-an-expert-form input[name=customer_company]').val();
           const typePackage = $('#halo-ask-an-expert-form input[name=type_package]:checked').val();
           const customerMessage = $('#halo-ask-an-expert-form textarea[name=message]').val();

           // Get product information from data attributes
           const productImg = $('#halo-ask-an-expert [data-product-image]').attr('data-product-image');
           const productTitle = $('#halo-ask-an-expert [data-product-title]').attr('data-product-title');
           const productSku = $('#halo-ask-an-expert [data-product-sku]').attr('data-product-sku');
           const productUrl = $('#halo-ask-an-expert [data-product-url]').attr('data-product-url');

           // Validate required fields
           $("#halo-ask-an-expert-form input[required=true], #halo-ask-an-expert-form textarea[required=true]").each(function() {
               if (!$.trim($(this).val())) {
                   $(this).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                   ask_proceed = false;
               } else {
                   $(this).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
               }

               // Email validation
               const email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
               if ($(this).attr("name") == "customer_email" && !email_reg.test($.trim($(this).val()))) {
                   $(this).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
                   ask_proceed = false;
               }
           });

           if (ask_proceed) {
               // Disable button and show loading
               $('#halo-ask-an-expert-button').prop('disabled', true).text('Sending...');

               // EmailJS integration
               const serviceID = 'YOUR_EMAILJS_SERVICE_ID';
               const templateID = 'YOUR_EMAILJS_TEMPLATE_ID';
               const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

               const templateParams = {
                   customer_name: customerName,
                   customer_email: customerMail,
                   customer_phone: customerPhone,
                   customer_country: customerCountry,
                   customer_company: customerCompany || 'N/A',
                   type_package: typePackage,
                   message: customerMessage,
                   product_name: productTitle,
                   product_sku: productSku,
                   product_url: productUrl,
                   product_image: productImg,
               };

               // Send via EmailJS
               if (typeof emailjs !== 'undefined') {
                   emailjs.send(serviceID, templateID, templateParams, publicKey)
                       .then(() => {
                           const output = '<div class="alertBox alertBox--success">Thank you! We\'ve received your request and will respond shortly.</div>';
                           $("#halo-ask-an-expert-results").html(output).show();
                           $("#halo-ask-an-expert-form input, #halo-ask-an-expert-form textarea").val('');
                           $("#halo-ask-an-expert-form").hide();
                           $('#halo-ask-an-expert-button').prop('disabled', false).text('Request a Quote');
                       })
                       .catch((error) => {
                           console.error('EmailJS Error:', error);

                           // Fallback to mailto
                           const emailBody = `EXPERT QUOTE REQUEST

Customer Information:
Name: ${customerName}
Email: ${customerMail}
Phone: ${customerPhone}
Country: ${customerCountry}
Company: ${customerCompany}
Request Type: ${typePackage}

Product Information:
Product: ${productTitle}
SKU: ${productSku}
URL: ${productUrl}

Message:
${customerMessage}`;

                           const emailSubject = `Expert Quote Request - ${productTitle}`;
                           const mailtoLink = `mailto:info@electrowell.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

                           const output = `<div class="alertBox alertBox--error">
                               <p>Unable to send via website. <a href="${mailtoLink}" class="button button--small">Click here to open email client</a></p>
                           </div>`;
                           $("#halo-ask-an-expert-results").html(output).show();
                           $('#halo-ask-an-expert-button').prop('disabled', false).text('Request a Quote');
                       });
               } else {
                   // EmailJS not loaded, use mailto fallback
                   const emailBody = `EXPERT QUOTE REQUEST

Customer Information:
Name: ${customerName}
Email: ${customerMail}
Phone: ${customerPhone}
Country: ${customerCountry}
Company: ${customerCompany}
Request Type: ${typePackage}

Product Information:
Product: ${productTitle}
SKU: ${productSku}
URL: ${productUrl}

Message:
${customerMessage}`;

                   const emailSubject = `Expert Quote Request - ${productTitle}`;
                   const mailtoLink = `mailto:info@electrowell.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                   window.location.href = mailtoLink;

                   const output = '<div class="alertBox alertBox--success">Opening your email client with pre-filled information...</div>';
                   $("#halo-ask-an-expert-results").html(output).show();
                   $('#halo-ask-an-expert-button').prop('disabled', false).text('Request a Quote');
               }
           }
       });

       // Real-time validation
       $("#halo-ask-an-expert-form input[required=true], #halo-ask-an-expert-form textarea[required=true]").on('keyup', function() {
           if (!$.trim($(this).val())) {
               $(this).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
           } else {
               $(this).parent('.form-field').removeClass('form-field--error').addClass('form-field--success');
           }

           const email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
           if ($(this).attr("name") == "customer_email" && !email_reg.test($.trim($(this).val()))) {
               $(this).parent('.form-field').removeClass('form-field--success').addClass('form-field--error');
           }

           $("#halo-ask-an-expert-results").hide();
       });
   }

   askAnExpert();

}
