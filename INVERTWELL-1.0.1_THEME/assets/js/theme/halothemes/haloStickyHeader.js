import $ from 'jquery';

export default function() {
	function header_sticky() {
        var header_position, header_height;
        var header_wrap = $('.header .header-bottom');

        header_height = header_wrap.height();
        header_position = header_wrap.offset().top;

        if (header_wrap.length) {
            header_scroll(header_position, header_height, header_wrap);
        }
    }

    function header_stickyMobile() {
        var header_position, header_height;
        var header_wrap = $('.header-mobile');

        header_height = header_wrap.height();
        header_position = header_wrap.offset().top;

        if (header_wrap.length) {
            header_scroll(header_position, header_height, header_wrap);
        }
    }

    function header_scroll(header_position, header_height, header_wrap) {
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = header_wrap.offset().top;

        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop();
            if(Math.abs(lastScrollTop - scroll) <= delta){
                return;
            }

            if (scroll > lastScrollTop && scroll > navbarHeight){
                // Scroll Down
                header_wrap.removeClass('sticky-down').addClass('sticky-up');
                
                if (scroll > header_position) {
                     $('body').removeClass('body-sticky-down').addClass('has-stickyHeader body-sticky-up');
                } else {
                    $('body').removeClass('has-stickyHeader body-sticky-up body-sticky-down');
                }
            } else {
                // Scroll Up
                if(scroll + $(window).height() < $(document).height()) {
                    header_wrap.removeClass('sticky-up').addClass('sticky-down');

                    if (scroll > header_position) {
                        $('body').removeClass('body-sticky-up').addClass('has-stickyHeader body-sticky-down');
                    } else {
                        $('body').removeClass('has-stickyHeader body-sticky-up body-sticky-down');
                    }
                }
            }
            
            lastScrollTop = scroll;
        });
    }

    if ($(window).width() < 1025) {
        header_stickyMobile();
    } else{
        header_sticky();
    }
}
