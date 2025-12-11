import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable padded-blocks */
/* eslint-disable comma-dangle */
/* eslint-disable space-in-parens */

export default function() {
    var arrNewProducts = [];
    $.ajax({
        url: '/rss.php?type=atom',
        type: 'GET',
        dataType: 'xml',
        success: function(xml) {
            $(xml).find('entry').each(function(index, el) {
                arrNewProducts.push($(this).children('link').attr('href'));
            });

            // new label show on product items
            $('.prod-item').each(function(index, el) {
                var thisProd = $(this).find('.prod-image').children('a').attr('href');
                for (var i = 0; i < arrNewProducts.length; i++) {
                    if ((arrNewProducts[i].indexOf(thisProd) > 0) || (arrNewProducts[i] === thisProd )) {
                        $(this).find('.prod-image').children('.actions').after('<div class="new-badge">New</div>');
                    }
                }
            });

            // new label show on product detail
            if ($('.productView-images').length > 0) {
                for (var i = 0; i < arrNewProducts.length; i++) {
                    if ((arrNewProducts[i].indexOf($('link[rel="canonical"]').attr('href')) > 0) || (arrNewProducts[i] === $('link[rel="canonical"]').attr('href') )) {
                        $('.productView-images .productView-image').prepend('<div class="new-badge">New</div>');
                    }
                }
            }


        }
    });
}
