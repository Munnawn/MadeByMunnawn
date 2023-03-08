// SongProgressBar.js

const SongProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            let minutes = parseInt(time / 60);
            let seconds = parseInt(time % 60);

            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            
            return `${minutes}:${seconds}`;
        }

        return '00:00';
    };

    return (
        <div className="progress-bar-wrapper">
            <span className="time current">{formatTime(timeProgress)} / {formatTime(duration)}</span>
            <input id="progress-bar" type="range" ref={progressBarRef} defaultValue='0' onChange={handleProgressChange} />
        </div>
    );
};

export default SongProgressBar;