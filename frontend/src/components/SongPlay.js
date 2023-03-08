// SongPlay.js

const SongPlay = ({ currentSong, audioRef, setDuration, progressBarRef }) => {
    const onLoadedMetadata = () => {
        progressBarRef.current.max = audioRef.current.duration;
        setDuration(audioRef.current.duration);
    };

    return (
        <audio src={currentSong.song_url} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />
    );
};

export default SongPlay;