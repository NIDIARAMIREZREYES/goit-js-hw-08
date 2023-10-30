import Player from '@vimeo/player';
import _ from 'lodash';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo.Player(iframe);

player.on('timeupdate', _.throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000));

player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

document.addEventListener('DOMContentLoaded', function() {
    const savedTime = localStorage.getItem('videoplayer-current-time');

    if (savedTime !== null) {
        player.setCurrentTime(savedTime).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    console.error('El tiempo era menor que 0 o mayor que la duración del video');
                    break;
                default:
                    console.error('Ocurrió un error:', error);
                    break;
            }
        });
    }
});

