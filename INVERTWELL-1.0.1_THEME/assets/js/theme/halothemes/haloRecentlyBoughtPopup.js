import $ from 'jquery';
import jqueryCookie from 'jquery.cookie';
import utils from '@bigcommerce/stencil-utils';
const fetch = require('node-fetch');

export default function(context) {
    const token = context.token;
    function recentlyBought() {
        var productIDs = context.themeSettings.recently_bought_productID,
            hoursItems = context.themeSettings.recently_bought_hours,
            listHours = JSON.parse("[" + hoursItems + "]"),
            listIDs = JSON.parse("[" + productIDs + "]"),
            text_info = context.themeSettings.recently_bought_text_info,
            text_name = context.themeSettings.recently_bought_text_name,
            changeSlides = 1000*(Number(context.themeSettings.recently_bought_changeSlides));

        var location1 = context.themeSettings.recently_bought_location1,
            location2 = context.themeSettings.recently_bought_location2,
            location3 = context.themeSettings.recently_bought_location3,
            location4 = context.themeSettings.recently_bought_location4,
            location5 = context.themeSettings.recently_bought_location5,
            location6 = context.themeSettings.recently_bought_location6,
            location7 = context.themeSettings.recently_bought_location7,
            location8 = context.themeSettings.recently_bought_location8;

        var ar1 = location1.split(','),
            ar2 = location2.split(','),
            ar3 = location3.split(','),
            ar4 = location4.split(','),
            ar5 = location5.split(','),
            ar6 = location6.split(','),
            ar7 = location7.split(','),
            ar8 = location8.split(',');

        $(".halo-popup").prepend('<div class="hide" id="recently_bought_list"></div>');

        const listIDs_length = listIDs.length;

        if (listIDs_length) {
            getProductAndSiteInfo(listIDs).then(data => {
                setInterval(function(){
                    $('.halo-recently-bought').hide();

                    if ($('body.page-type-product').length && $('#sticky_addtocart').length) {
                        let marBot;
                        if ($('#sticky_addtocart.show_sticky').length) {
                            marBot = $('#sticky_addtocart').outerHeight();
                            if (window.innerWidth > 550) {
                                marBot = marBot + 15;
                            }
                            $('#recently_bought_list').css('margin-bottom', marBot);
                        }
                        else {
                            if (window.innerWidth > 1024) {
                                marBot = 30;
                            }
                            else if (window.innerWidth > 550) {
                                marBot = 15;
                            }
                            else {
                                marBot = 0;
                            }
                            $('#recently_bought_list').css('margin-bottom', marBot);
                        }
                    }

                    var item = (Math.floor(Math.random()*listIDs.length)),
                        list = [];

                    list.push(listIDs[item].toString());    

                    var locationList = Array(ar1,ar2,ar3,ar4,ar5,ar6,ar7,ar8),
                        locationItem = (Math.floor(Math.random()*locationList.length)),
                        location = locationList[locationItem],
                        hour_item = (Math.floor(Math.random()*listHours.length)),
                        hours = listHours[hour_item];

                    if ($.cookie('recently_bought_notification') == 'closed') {
                        $('#recently_bought_list').remove();
                    }

                    $(document).on('click', '.halo-recently-bought [data-close-recently-bought]', function(event){
                        event.preventDefault();
                        
                        $('#recently_bought_list').remove();
                        $.cookie('recently_bought_notification', 'closed', {expires:1, path:'/'});
                    });

                    if( $('#RB_'+ listIDs[item]).length ) {
                        $('#RB_'+ listIDs[item]).show();
                        $('#RB_'+ listIDs[item]).css('animation-name','fadeInUp');
                    } else {
                        renderProduct(data.site.products.edges[item], text_name, hours, text_info, location);
                    }

                    setTimeout(function(){
                        if ($('#RB_'+ listIDs[item]).length) {
                            $('#RB_'+ listIDs[item]).hide();
                            $('#RB_'+ listIDs[item]).css('animation-name','');
                        }
                        
                    }, changeSlides - 1000);

                }, changeSlides);
            });
        }
    }

    function getProductAndSiteInfo(arr) {
      return fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
                site {
                    products (entityIds: [`+arr+`]) {
                      edges {
                        product: node {
                          ...ProductFields
                          }
                        }
                    }
                }
            }
            fragment ProductFields on Product {
                id
                entityId
                name
                path
                defaultImage {
                    img320px: url(width: 320)
                    altText
                }
            }
        `}),
    }).then(res => res.json())
       .then(res => res.data);
    }

    function renderProduct(product, text, hours, info, customer) {
        if (product != undefined) {
            var item = product.product;

            if (item != undefined) {
                var html = '<div id="RB_'+item.entityId+'" class="halo-recently-bought">\
                    <a href="#" data-close-recently-bought>&#215;</a>\
                    <div class="recently-bought-inner">\
                        <a class="product-image" href="'+item.path+'"><img class="image" data-sizes="auto" src="'+item.defaultImage.img320px+'" alt="'+item.defaultImage.altText+'" title="'+item.defaultImage.altText+'"></a>\
                        <div class="product-info">\
                            <p class="text-wrap"><span class="text">'+text+'</span><span class="product-name"><a href="'+item.path+'" style="-webkit-box-orient: vertical;"><span>'+item.name+'</span></a></span></p>\
                             <div class="location-info">'+hours+' '+info+' '+customer+'</div>\
                        </div>\
                    </div>\
                </div>';
                $('#recently_bought_list').append(html);
                $('#RB_'+ item.entityId).css('animation-name','fadeInUp');
            }
        }
    }

    if ($(window).width() > 1024) {
        if (context.themeSettings.haloRecentlyBought == true) {
            recentlyBought();
        } 
    } else {
        if(context.themeSettings.haloRecentlyBought == true && context.themeSettings.haloRecentlyBought_mobile == true) {
            recentlyBought();
        }
    }
}
