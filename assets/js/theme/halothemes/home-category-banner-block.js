jQuery(document).ready(function($) {
    

    // $('#home-category-banner-block .hl-home-category').each(function(index, el) {
    //     var thisItem = $(this);
    //     var link_new = thisItem.find('.module-heading > a').attr('href') + '?sort=newest';
    //     var link_selling = thisItem.find('.module-heading > a').attr('href') + '?sort=bestselling';
    //     var link_featured = thisItem.find('.module-heading > a').attr('href') + '?sort=featured';
    //     var link_reviews = thisItem.find('.module-heading > a').attr('href') + '?sort=avgcustomerreview';
    //     $.ajax({
    //         url: link_new,
    //         //async:false,
    //         type: 'GET',
    //         beforeSend: function(){
    //             $('#AjaxLoading').hide();
    //             thisItem.find('#new-products .productBlockContainer').append('<div class="loading-items text-center"><img src="/assets/img/loader.gif" alt="" />&nbsp;Loading... Please wait...</div>');
    //         },
    //         success: function(data){
    //             thisItem.find('.loading-items').remove();
    //             //thisItem.find('#new-products .productBlockContainer').addClass('owl-carousel');
    //             if ($(data).find('#product-listing-container .productBlockContainer').children().children().children().children('.prod-image').length > 0){
    //                 thisItem.find('#new-products .productBlockContainer').append($(data).find('#product-listing-container .productBlockContainer').children());
    //             }

    //         }
    //     });
    //     // $.ajax({
    //     //     url: link_selling,
    //     //     //async:false,
    //     //     type: 'GET',
    //     //     beforeSend: function(){
    //     //         $('#AjaxLoading').hide();
    //     //         thisItem.find('#top-sellers .productBlockContainer').append('<div class="loading-items text-center"><img src="/assets/img/loader.gif" alt="" />&nbsp;Loading... Please wait...</div>');
    //     //     },
    //     //     success: function(data){
    //     //         thisItem.find('.loading-items').remove();
    //     //         thisItem.find('#top-sellers .productBlockContainer').addClass('owl-carousel');
    //     //         if ($(data).find('#product-listing-container .productBlockContainer').children().children().children().children('.prod-image').length > 0){
    //     //             thisItem.find('#top-sellers .productBlockContainer').append($(data).find('#product-listing-container .productBlockContainer').children());
    //     //         }
    //     //     }
    //     // });
    //     // $.ajax({
    //     //     url: link_featured,
    //     //     //async:false,
    //     //     type: 'GET',
    //     //     beforeSend: function(){
    //     //         $('#AjaxLoading').hide();
    //     //         thisItem.find('#featured-products .productBlockContainer').append('<div class="loading-items text-center"><img src="/assets/img/loader.gif" alt="" />&nbsp;Loading... Please wait...</div>');
    //     //     },
    //     //     success: function(data){
    //     //         thisItem.find('.loading-items').remove();
    //     //         thisItem.find('#featured-products .productBlockContainer').addClass('owl-carousel');
    //     //         if ($(data).find('#product-listing-container .productBlockContainer').children().children().children().children('.prod-image').length > 0){
    //     //             thisItem.find('#featured-products .productBlockContainer').append($(data).find('#product-listing-container .productBlockContainer').children());
    //     //         }
    //     //     }
    //     // });
    //     // $.ajax({
    //     //     url: link_reviews,
    //     //     //async:false,
    //     //     type: 'GET',
    //     //     beforeSend: function(){
    //     //         $('#AjaxLoading').hide();
    //     //         thisItem.find('#most-popular-reviews .productBlockContainer').append('<div class="loading-items text-center"><img src="/assets/img/loader.gif" alt="" />&nbsp;Loading... Please wait...</div>');
    //     //     },
    //     //     success: function(data){
    //     //         thisItem.find('.loading-items').remove();
    //     //         thisItem.find('#most-popular-reviews .productBlockContainer').addClass('owl-carousel');
    //     //         if ($(data).find('#product-listing-container .productBlockContainer').children().children().children().children('.prod-image').length > 0){
    //     //             thisItem.find('#most-popular-reviews .productBlockContainer').append($(data).find('#product-listing-container .productBlockContainer').children());
    //     //         }
    //     //     }
    //     // });
    // });
});
