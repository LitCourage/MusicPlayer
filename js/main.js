const tracks = [{src: 'Dry Hands.mp3', image: 'Dry Hands.png'}, {src: 'Equinoxe.mp3', image: 'Equinoxe.png'}, {src: 'Far.mp3', image: 'Far.png'}];

let index = 0;
const track = new Audio('assets/music/'+tracks[index].src);

function loadTrack(index) {
    const new_track = tracks[index];
    const icon = document.querySelector('.soundtrack-icon');
    const header = document.querySelector('header');
    const player = document.querySelector('.player');

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

function loadSidebar() {
    for (let i of tracks) {
      const el = document.createElement('div');
      const sidebar = document.querySelector('.left-sidebar');
      el.className = 'sidebar-track';
      el.innerHTML = i.src.split('.')[0];
      el.onclick = () => {
        loadTrack(tracks.indexOf(i));
        track.play();
    };
      sidebar.append(el);
    };
};

document.querySelector('.button-right').addEventListener('click', nextTrack);
document.querySelector('.button-left').addEventListener('click', previousTrack);
document.querySelector('.button-play').addEventListener('click', togglePlay);
document.querySelector('.player').addEventListener('input', (event) => changeTime(event));

loadSidebar();
loadTrack(index);

//TODO make slider move with soundtrack