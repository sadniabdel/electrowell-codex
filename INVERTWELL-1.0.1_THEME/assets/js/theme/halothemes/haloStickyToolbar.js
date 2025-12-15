export default function(context) {
    function toolbar_sticky() {
        var toolbar_position, toolbar_height;
            
        toolbar_height = $('.halo-category-toolbar .column-right').height();
        toolbar_position = $('.halo-category-toolbar .column-right').offset().top;

        if ($('.halo-category-toolbar .column-right').length) {
            toolbar_scroll(toolbar_position, toolbar_height);
        }
    }

    function toolbar_scroll(toolbar_position, toolbar_height) {
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('.halo-category-toolbar .column-right').offset().top;
        $(window).on('scroll load', function() {
            var scroll = $(window).scrollTop();
            if(Math.abs(lastScrollTop - scroll) <= delta){
                return;
            }

            if (scroll > lastScrollTop && scroll > navbarHeight){
                // Scroll Down
                $('.halo-category-toolbar .column-right').removeClass('sticky-down').addClass('sticky-up');
                
                if (scroll > toolbar_position) {
                     $('body').addClass('has-stickyToolbar');
                } else {
                    $('body').removeClass('has-stickyToolbar');
                }
            } else {
                // Scroll Up
                if(scroll + $(window).height() < $(document).height()) {
                    $('.halo-category-toolbar .column-right').removeClass('sticky-up').addClass('sticky-down');

                    if (scroll > toolbar_position) {
                        $('body').addClass('has-stickyToolbar');
                    } else {
                        $('body').removeClass('has-stickyToolbar');
                    }
                }
            }
            
            lastScrollTop = scroll;
        });
    }

    if ($(window).width() < 1025) {
        toolbar_sticky();
    } else{
        $('body').removeClass('has-stickyToolbar');
    }
}
