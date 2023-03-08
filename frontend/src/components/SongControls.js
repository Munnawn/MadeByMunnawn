// SongControls.js

import { useState, useEffect, useCallback, useRef } from 'react';
import playIcon from "../svg/play/play-circle-fill.svg";
import pauseIcon from "../svg/pause/pause-circle-fill.svg"; 
import skipToNext from "../svg/skipToNext/skip-end-fill.svg";
import skipToPrev from "../svg/skipToPrev/skip-start-fill.svg";

const SongControls = ({ 
    audioRef, 
    progressBarRef, 
    duration, 
    setTimeProgress,
    songs,
    songIdx,
    setSongIdx }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100);
    const playAnimationRef = useRef();

    // Set songIdx if next/prev song button is pressed
    // INPUT: increment = 1 for next, -1 for prev
    const changeSong = (increment) => {
        // Play/Pause changes to play if it wasn't already
        if (isPlaying) {
            togglePlayPause();
        }
        if (songIdx + increment >= songs.length) {
            setSongIdx(0);
        }
        else if (songIdx + increment < 0) {
            setSongIdx(songs.length - 1);
        }
        else {
            setSongIdx(songIdx + increment);
        }
    };    

    const togglePlayPause = () => {
        if (audioRef.current) {
            setIsPlaying(!isPlaying);
        }

    };

    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        if (isPlaying && audioRef.current.currentTime >= duration && duration != 0) {
            // When song is finished, we want the play/pause to flip, and to be returned to 00:00
            togglePlayPause();
            audioRef.current.currentTime = 0;
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress, isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef]);

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
        }
    }, [audioRef, volume]);

    return (
        <div className='songControlsWrapper'>
            <div className='songControls'>
                <button onClick={() => changeSong(-1)}>
                    <img src={skipToPrev} alt='skip to prev song' width='25em' />
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying && audioRef.current.currentTime < duration ? 
                        <img src={pauseIcon} alt='pause song' width='50em' /> : <img src={playIcon} alt='play song' width='50em' />}
                </button>
                <button onClick={() => changeSong(1)}>
                    <img src={skipToNext} alt='skip to next song' width='25em' />
                </button>
            </div>
            {/* <div className='volume'>
                <button>icons</button>
                <input type='range' min={0} max={100} value={volume} onChange={(event) => setVolume(event.target.value)} />
            </div> */}
        </div>
    );
};

export default SongControls;