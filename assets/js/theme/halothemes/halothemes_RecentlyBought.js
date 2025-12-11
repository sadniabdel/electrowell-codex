import $ from 'jquery';
import jqueryCookie from 'jquery.cookie';
import utils from '@bigcommerce/stencil-utils';


export default function(context) {
	// ========================================================================
    // Recent By
    // ========================================================================
    function recentlyBought() {
        var productIDs = context.themeSettings.recently_bought_productID;
        var customerName1 = context.themeSettings.recently_bought_customer_name1;
        var customerName2 = context.themeSettings.recently_bought_customer_name2;
        var customerName3 = context.themeSettings.recently_bought_customer_name3;
        var customerName4 = context.themeSettings.recently_bought_customer_name4;
        var customerName5 = context.themeSettings.recently_bought_customer_name5;
        var customerName6 = context.themeSettings.recently_bought_customer_name6;
        var customerName7 = context.themeSettings.recently_bought_customer_name7;
        var customerName8 = context.themeSettings.recently_bought_customer_name8;
        var customerName9 = context.themeSettings.recently_bought_customer_name9;
        var customerName10 = context.themeSettings.recently_bought_customer_name10;
        var ar1 = customerName1.split(', ');
        var ar2 = customerName2.split(', ');
        var ar3 = customerName3.split(', ');
        var ar4 = customerName4.split(', ');
        var ar5 = customerName5.split(', ');
        var ar6 = customerName6.split(', ');
        var ar7 = customerName7.split(', ');
        var ar8 = customerName8.split(', ');
        var ar9 = customerName9.split(', ');
        var ar10 = customerName10.split(', ');

        var hoursItems = context.themeSettings.recently_bought_hours;
        var listHours = JSON.parse("[" + hoursItems + "]");

        var listIDs = JSON.parse("[" + productIDs + "]");

        var text_info = context.themeSettings.recently_bought_text_info;
        var text_name = context.themeSettings.recently_bought_text_name;

        var changeSlides = 1000*(Number(context.themeSettings.recently_bought_changeSlides));

        var currentItem = 0;
        $("body").append('<div id="recently_bought_list"></div>');

        setInterval(function(){
            $('.themevale_recently-bought').hide();
            var item = (Math.floor(Math.random()*listIDs.length));
            var productId = listIDs[item];

            var customerNameList = Array(ar1,ar2,ar3,ar4,ar5,ar6,ar7,ar8,ar9,ar10);
            var customerNameItem = (Math.floor(Math.random()*customerNameList.length));
            var customerName = customerNameList[customerNameItem];

            var hour_item = (Math.floor(Math.random()*listHours.length));
            var hours = listHours[hour_item];

            
            $(document).on('click', '.themevale_recently-bought .modal-close', function(e){
                $('#recently_bought_list').remove();
                $.cookie('recently_bought_notification', 'closed', {expires:1, path:'/'});
            });

            if( $('#RB_'+ productId).length ) {
                $('#RB_'+ productId).show();
                $('.themevale_recently-bought').css('animation-name','fadeInUp');
            } else {
                utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
                    var name = $('.productView-title', $(response)).text();
                    var img = $('.productView-image', $(response)).find('img').attr('src');
                    var url = $('.productView-title', $(response)).data('url');

                    var html = '<div id="RB_'+productId+'" class="themevale_recently-bought">\
                        <a href="#" class="modal-close" data-close-recently-bought><span aria-hidden="true">&#215;</span></a>\
                        <div class="recently-bought-inneer">\
                            <div class="product-image">\
                                <a href="'+url+'"><img class="card-image lazyload" data-sizes="auto" src="'+img+'" alt="'+name+'" title="'+name+'"></a>\
                            </div>\
                            <div class="product-info">\
                                <p class="text">'+text_name+' <span class="product-name"><a href="'+url+'">'+name+'</a></span></p>\
                                <div id="customer-info">'+hours+' '+text_info+' '+customerName+'</div>\
                            </div>\
                        </div>\
                    </div>';
                    $('#recently_bought_list').append(html);
                    $('.themevale_recently-bought').css('animation-name','fadeInUp');
                });
            }

            if ($.cookie('recently_bought_notification') == 'closed') {
                $('#recently_bought_list').remove();
            }

            setTimeout(function(){ 
                 $('#RB_'+ productId).hide();
            }, changeSlides);
        }, changeSlides); 
    }

    if ($(window).width() > 1024) {
        if (context.themeSettings.halothemes_RecentlyBought == true) {
            recentlyBought();
        } 
    } else {
        if(context.themeSettings.halothemes_RecentlyBought == true && context.themeSettings.halothemes_RecentlyBought_mobile == true) {
            recentlyBought();
        }
    }
}
