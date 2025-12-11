function menuItem(num) {
    return $('.navPages-container nav.navPages > ul.navPages-list:not(.navPages-list--user) > li:nth-child(' + num + ')');
}

(function() {
    $.fn.HaloMegaMenu = function(param) {
        // Defaut params
        param = $.extend({
            dropAlign: 'left',
            dropWidth: '493px',
            dropType: 'imageLeft',
            cateColumns: 1,
            bottomMegamenu: 'none',
            disabled: false,
            bottomCates: '',
            imagesTop: '',
            addclass_special:'',
        }, param);

        this.each(function(idx, el) {
            if (param.disabled === false) {
                const subMegaMenu = $(el).children('.navPage-subMenu');
                subMegaMenu.removeClass('subMenu').addClass('subMegaMenu');
                $(el).addClass('hasMegamenu');
                $(el).addClass('hasSub');

                // dropdown Alignment
                if (param.dropAlign === 'fullWidth') {
                    $(el).addClass('fullWidth');
                } else if (param.dropAlign === 'center') {
                    $(el).addClass('alignCenter');
                } else if (param.dropAlign === 'right') {
                    $(el).addClass('alignRight');
                } else {
                    $(el).addClass('alignLeft');
                }

                // dropdown Type
                if (param.dropType === 'imageLeft') {
                    subMegaMenu.addClass('imageLeft');
                    subMegaMenu.wrapInner('<div class="cateArea-content"><div class="cateArea"></div></div>');
                    subMegaMenu.children('.cateArea-content').prepend('<div class="imageArea colLeft">' + param.images + '</div>');
                } else if (param.dropType === 'imageRight') {
                    subMegaMenu.addClass('imageRight');
                    subMegaMenu.wrapInner('<div class="cateArea-content"><div class="cateArea"></div></div>');
                    subMegaMenu.children('.cateArea-content').append('<div class="imageArea colRight">' + param.images + '</div>');
                } else if (param.dropType === 'noImage') {
                    subMegaMenu.addClass('noImage').wrapInner('<div class="cateArea"></div>');
                } else if (param.dropType === 'imageTop') {
                    subMegaMenu.addClass('imageTop').wrapInner('<div class="cateArea"></div>');
                }


                // dropdown Width
                if ((param.dropAlign === 'fullWidth')) {
                    subMegaMenu.wrapInner('<div class="container"></div>');
                    subMegaMenu.css({
                        'width': '100%'
                    });
                } else {
                    subMegaMenu.css({
                        'width': param.dropWidth
                    });
                }

                // cateColumns
                if (param.cateColumns === 2) {
                    subMegaMenu.find('.cateArea').addClass('columns-2');
                } else if (param.cateColumns === 3) {
                    subMegaMenu.find('.cateArea').addClass('columns-3');
                } else if (param.cateColumns === 4) {
                    subMegaMenu.find('.cateArea').addClass('columns-4');
                } else if (param.cateColumns === 5) {
                    subMegaMenu.find('.cateArea').addClass('columns-5');
                }

                // imageAreaWidth
                subMegaMenu.find('.imageArea').css({
                    'width': '100%',
                    'max-width': param.imageAreaWidth
                });

                // cateAreaWidth
                subMegaMenu.find('.cateArea').css({
                    'width': '100%',
                    'max-width': param.cateAreaWidth
                });

                if(param.addclass_special.length && (param.addclass_special !== '')){
                    subMegaMenu.find('.cateArea').addClass(param.addclass_special);
                }

                if (param.bottomCates.length && (param.bottomCates !== '')) {
                    subMegaMenu.find('.cateArea').addClass('has-bottom-cates');
                    subMegaMenu.find('.cateArea > ul').append('<div class="bottomCate" style="max-width: ' + param.cateAreaWidth + '">' + param.bottomCates + '</div>');
                }

                if (param.imagesTop.length && (param.imagesTop !== '')) {
                    function megamenuImageTop($_image_array) {
                        var j = 0;
                        for (var i = 0; i < $_image_array.length; i++) {
                            j = i + 1;
                            subMegaMenu.find('.cateArea > ul > li:nth-child(' + j + ') > a').after($_image_array[i]);
                        }
                    }
                    megamenuImageTop(param.imagesTop);
                }

                if (param.bottomMegamenu.length && (param.bottomMegamenu !== 'none')) {
                    subMegaMenu.append('<div class="bottomMegamenu">' + param.bottomMegamenu + '</div>');
                }

            }
        });
        return this;
    }
})(jQuery);
