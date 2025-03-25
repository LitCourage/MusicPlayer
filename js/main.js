const tracks = [{src: 'Dry Hands.mp3', image: 'Dry Hands.png'}, {src: 'Equinoxe.mp3', image: 'Equinoxe.png'}, {src: 'Far.mp3', image: 'Far.png'}];

let index = 0;
const track = new Audio('assets/music/'+tracks[index].src);

function loadTrack(index) {
    const new_track = tracks[index];
    const icon = document.querySelector('.soundtrack-icon');
    const header = document.querySelector('header');

    track.src = 'assets/music/'+tracks[index].src;
    header.innerHTML = new_track.src.split('.')[0];
    icon.src = 'assets/images/'+new_track.image;
};

function nextTrack() {
    index++
    if (index > tracks.length - 1) {index = 0;};
    loadTrack(index);
    track.play();
};

function previousTrack() {
    if (track.currentTime < 1) {
        index--
        if (index < 0) {
            index = tracks.length - 1;
        };
    } else {
        track.currentTime = 0;
    };
    loadTrack(index);
    track.play();
};

function togglePlay() {
    if (track.paused) {track.play()} else {track.pause()}; 
};

function changeTime(event) {
    const duration = track.duration;
    const value = event.target.value;
    track.currentTime = duration * value / 100;
    track.play()
};

function changeVolume(event) {
    track.volume = event.target.value;
};

function loadSidebar(active) {
    const sidebar = document.querySelector('.left-sidebar');
    sidebar.innerHTML = '';
    for (let sidebar_track of tracks) {
        i = tracks.indexOf(sidebar_track);
        index = i;
        const el = document.createElement('button');
        if (active === index) {el.style.backgroundColor = 'rgb(60, 60, 60)'};
        el.className = 'sidebar-track';
        el.id = `track-${i}`;
        el.innerHTML = sidebar_track.src.split('.')[0];
        el.onclick = () => {
            loadSidebar(tracks.indexOf(sidebar_track));
            loadTrack(tracks.indexOf(sidebar_track));
            track.play();
        };
      sidebar.append(el);
    };
};

document.querySelector('.button-right').addEventListener('click', nextTrack);
document.querySelector('.button-left').addEventListener('click', previousTrack);
document.querySelector('.button-play').addEventListener('click', togglePlay);
document.querySelector('.player').addEventListener('input', (event) => changeTime(event));
document.querySelector('.volume').addEventListener('input', (event) => changeVolume(event));

loadSidebar();
loadTrack(index);

//TODO make slider move with soundtrack