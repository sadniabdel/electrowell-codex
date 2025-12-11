import $ from 'jquery';
// import '../halothemes/owlCarousel';
import 'slick-carousel';

export default function () {
    // const $carousel = $('[data-owl]');

    // if ($carousel.length) {
    //     // $carousel.each(function (index, el) {
    //     $(this).owlCarousel($(this).data('owl'));
    //     // });
    // }

    const $carousel2 = $('[data-slick]');
    if ($carousel2.length) {
        const multipleSlides = $carousel2[0].childElementCount > 1;
        $carousel2.slick({ dots: multipleSlides });
    }
}
