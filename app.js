const playlist = [
    { title: "Desi-Desi-Na-Bolya-Kar", url: "Desi-Desi-Na-Bolya-Kar(musicdownload.cc)_030424.mp3" },
    { title: "Apna-Bana-Le", url: "Apna-Bana-Le_320(PagalWorld).mp3" },
    { title: "Kesariya Brahmastra", url: "Kesariya Brahmastra 320 Kbps.mp3" },
    { title: "Lo Maan Liya Raaz Reboot", url: "Lo Maan Liya Raaz Reboot 320 Kbps.mp3" }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const volumeControl = document.getElementById('volume');
const playlistElement = document.getElementById('playlist');
const searchInput = document.getElementById('search');
const profilePicture = document.querySelector('.profile-picture');

function loadPlaylist() {
    playlistElement.innerHTML = '';
    playlist.forEach((song, index) => {
        const songElement = document.createElement('li');
        songElement.textContent = song.title;
        songElement.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        playlistElement.appendChild(songElement);
    });
}

function loadSong(index) {
    currentSongIndex = index;
    audioPlayer.src = playlist[index].url;
    playPauseButton.src = 'icons8-play-button.png';
    audioPlayer.pause();
    profilePicture.classList.remove('rotate');
}

function playSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.src = 'icons8-pause-button.png';
        profilePicture.classList.add('rotate');
    } else {
        audioPlayer.pause();
        playPauseButton.src = 'icons8-play-button.png';
        profilePicture.classList.remove('rotate');
    }
}

playPauseButton.addEventListener('click', playSong);

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
});

volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

audioPlayer.addEventListener('ended', () => {
    nextButton.click();
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlaylist = playlist
        .map((song, index) => ({ song, index }))
        .filter(({ song }) => song.title.toLowerCase().includes(searchTerm));

    playlistElement.innerHTML = '';
    filteredPlaylist.forEach(({ song, index }) => {
        const songElement = document.createElement('li');
        songElement.textContent = song.title;
        songElement.addEventListener('click', () => {
            loadSong(index);
            playSong();
        });
        playlistElement.appendChild(songElement);
    });
});

loadPlaylist();
