import utils from '@bigcommerce/stencil-utils';

export default function(context) {
    if (context.themeSettings.haloAddOptionForProduct) {
        
        var  list = [];
        const $card = $('.card');
        const token = context.token;

        if ($card.length) {
            for (var i=0; i < $card.length; i++) {
                const $prodWrapId = $card.eq(i).data('product-id');
                const $cartOption = $card.eq(i).find('.card-option').length;
                const $cartOptionItem = $card.eq(i).find('.card-option .form-field label').length;

                if ($prodWrapId != undefined && $cartOption && !$cartOptionItem) {
                    list.push($prodWrapId.toString());
                }
            };
        }

        callProductOption();

        function callProductOption() {

            if(list.length > 0){
                getProductOption(list).then(data => {
                    renderOption(data);

                    for (var i=0; i < $card.length; i++) {
                        const $t_card = $card.eq(i);
                        const productId = $card.eq(i).data('product-id');
                        const $t_cardOption = $card.eq(i).find('.card-figure .card-option-'+productId+'');
                        const $t_formOption = $card.eq(i).find('.card-figure .card-option-'+productId+' .form-option');
                        const $t_cardOptionMB = $card.eq(i).find('.card-optionMobile.card-option-'+productId+'');
                        const $t_formOptionMB = $card.eq(i).find('.card-optionMobile.card-option-'+productId+' .form-option');

                        var arr = {},
                            arr2 = {};

                        $t_formOption.each((index, element) => {
                            let txt = $(element).data('product-swatch-value');

                            if (arr[txt]){
                                $(element).remove();
                            } else {
                                arr[txt] = true;
                            }
                        });

                        $t_formOptionMB.each((index, element) => {
                            let txtMB = $(element).data('product-swatch-value');

                            if (arr2[txtMB]){
                                $(element).remove();
                            } else {
                                arr2[txtMB] = true;
                            }
                        });

                        const optionLength = $card.eq(i).find('.card-figure .card-option-'+productId+' .form-option').length;

                        if (optionLength > 4) {
                            var countMoreOption  = optionLength - 4,
                                productLink = $card.eq(i).find('.card-title a').attr('href');

                            $t_cardOption.find('.form-option-swatch:nth-child(n+5)').remove();
                            $t_cardOptionMB.find('.form-option-swatch:nth-child(n+5)').remove();

                            if($t_cardOption.find('.form-field .showmore').length == 0){
                                $t_cardOption.find('.form-field').append('<a href="'+productLink+'" class="showmore">+'+countMoreOption+'</a>');
                                $t_cardOptionMB.find('.form-field').append('<a href="'+productLink+'" class="showmore">+'+countMoreOption+'</a>');
                            }
                        }
                    }
                });
            }
        }

        function getProductOption(list){
            return fetch('/graphql', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    query: `
                        query SeveralProductsByID {
                            site {
                                products(entityIds: [`+list+`], first: 50) {
                                    edges {
                                        node {
                                            entityId
                                            name
                                            defaultImage{
                                                urlOriginal
                                            }
                                            variants(first: 50){
                                                edges{
                                                    node{
                                                        entityId
                                                        defaultImage{
                                                            urlOriginal
                                                        }
                                                        productOptions(first: 50) {
                                                            edges {
                                                                node {
                                                                    entityId
                                                                    displayName
                                                                    isRequired
                                                                    ... on MultipleChoiceOption {
                                                                        displayStyle
                                                                        values {
                                                                            edges {
                                                                                node {
                                                                                    entityId
                                                                                    label
                                                                                    isDefault
                                                                                    ... on SwatchOptionValue {
                                                                                        hexColors
                                                                                        imageUrl(width: 150)
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    `
                }),
            }).then(res => res.json()).then(res => res.data);
        }

        function renderOption(data){
            var aFilter = data.site.products.edges;

            $.each(aFilter, (index, element) => {
                var productId = aFilter[index].node.entityId,
                    productImage = aFilter[index].node.defaultImage.urlOriginal,
                    productFieldColor = $card.find('.card-option-'+productId+' .form-field'),
                    aFilter2 = aFilter[index].node.variants.edges;

                $.each(aFilter2, (idx, el) => {
                    var variantImage,
                        aFilter3 = aFilter2[idx].node.productOptions.edges;

                    if(aFilter2[idx].node.defaultImage){
                        variantImage = aFilter2[idx].node.defaultImage.urlOriginal;
                    }

                    if(variantImage === undefined || variantImage === null){
                        variantImage = productImage;
                    }

                    var aFilter4 = aFilter3.filter(function (item) {
                        return item.node.displayStyle === 'Swatch';
                    });

                    if(aFilter4.length > 0){
                        var aFilter5 = aFilter4[0].node.values.edges;

                        $.each(aFilter5, (idx, element) => {
                            var titleVar = aFilter5[idx].node.label,
                                idVar = aFilter5[idx].node.entityId,
                                lengthColorVar = aFilter5[idx].node.hexColors.length,
                                color1 = aFilter5[idx].node.hexColors[0],
                                color2 = aFilter5[idx].node.hexColors[1],
                                color3 = aFilter5[idx].node.hexColors[2],
                                img = aFilter5[idx].node.imageUrl;

                            if(lengthColorVar == 2){
                                productFieldColor.append('<label class="form-option form-option-swatch two-colors" data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip">'+titleVar+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+titleVar+'"><span class="form-option-variant form-option-variant--color two-colors" style="background-color:'+color1+'; position: relative;left: -2px;top: -2px;"></span><span class="form-option-variant form-option-variant--color two-colors" style="background-color:'+color2+'"></span></span></label>');
                            } else if(lengthColorVar === 3){
                                productFieldColor.append('<label class="form-option form-option-swatch three-colors two-colors" data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip">'+titleVar+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+titleVar+'" style="position: relative;top: -2px;left: -2px;right: -2px; background: transparent;border-color: transparent;"><span class="form-option-variant form-option-variant--color three-colors" style="background-color:'+color1+'"></span><span class="form-option-variant form-option-variant--color three-colors" style="background-color:'+color2+'"></span><span style="background-color:'+color3+'"></span></span></label>');
                            } else if(Boolean(color1)){
                                productFieldColor.append('<label class="form-option form-option-swatch" data-image ="'+variantImage+'"  data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip">'+titleVar+'</span><span class="form-option-variant form-option-variant--color" title="'+titleVar+'" style="background-color: '+color1+'"></span></label>');
                            } else if(Boolean(img)){
                                productFieldColor.append('<label class="form-option form-option-swatch " data-image ="'+variantImage+'" data-product-swatch-value="'+idVar+'" data-title="'+titleVar+'"><span class="form-option-tooltip">'+titleVar+'</span><span class="form-option-variant form-option-variant--pattern" title="'+titleVar+'" style="background-image: url('+img+')"></span></label>');
                            }
                        });
                    } else{
                        productFieldColor.remove();
                    }
                });
            });
        }

        const btn_cardOption = '.card .card-figure .card-option .form-option',
            btn_cardOptionMB = '.card .card-optionMobile.card-option .form-option';

        $(document).on('click', btn_cardOption, function(e){
            e.preventDefault();

            let self = $(this),
            newImageVariant = self.data('image'),
            productItemElm = self.closest('.card');

            self.parents('.card-option').find('.form-option').removeClass('is-active');
            self.addClass('is-active');
            
            if (newImageVariant != "undefined") {
                productItemElm.find('.card-img-container .product-additional > img').attr({
                    "srcset": newImageVariant,
                    "src": newImageVariant
                });
                return false;
            }
        });

        $(document).on('click', btn_cardOptionMB, function(e){
            e.preventDefault();

            let self = $(this),
            newImageVariant = self.data('image'),
            productItemElm = self.closest('.card');

            self.parents('.card-option').find('.form-option').removeClass('is-active');
            self.addClass('is-active');
            
            if (newImageVariant != "undefined") {
                productItemElm.find('.card-img-container > img').attr({
                    "srcset": newImageVariant,
                    "src": newImageVariant
                });
                return false;
            }
        });
    }
}
