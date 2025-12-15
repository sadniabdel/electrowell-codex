import { throttle } from 'lodash';

const playAction = 'slickPlay';
const pauseAction = 'slickPause';

export default ($heroCarousel) => {
    const $playPauseButton = $('.js-hero-play-pause-button');
    const $playPauseButtonText = $('.js-hero-play-pause-button .text');
    const $playPauseButtonIcon = $('.js-hero-play-pause-button .icon');

    if ($playPauseButton.length === 0) return;

    const slickSettings = $heroCarousel[0].slick;
    if (!slickSettings) return;

    const { slideCount, options: { speed } } = slickSettings;
    if (slideCount < 2) {
        $playPauseButton.css('display', 'none');
        return;
    }

    const onPlayPauseClick = () => {
        const isCarouselPlaying = $playPauseButton.data('play');
        const action = isCarouselPlaying ? pauseAction : playAction;
        const {
            play,
            ariaPlay,
            pause,
            ariaPause,
        } = $playPauseButton.data('labels');

        $heroCarousel.slick(action);
        $playPauseButton
            .data('play', !isCarouselPlaying)
            .attr('aria-label', action === playAction ? ariaPause : ariaPlay);
        $playPauseButtonText.text(action === playAction ? pause : play);
        $playPauseButtonIcon.attr('title',action === playAction ? pause : play);
    };

    $playPauseButton.on('click', throttle(onPlayPauseClick, speed, { trailing: false }));
};
