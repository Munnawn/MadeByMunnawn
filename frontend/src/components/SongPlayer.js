// SongPlayer.js

import { useState, useRef } from "react";
import SongControls from "./SongControls";
import SongPlay from "./SongPlay";
import SongProgressBar from "./SongProgressBar";

const SongPlayer = ({ songs, songIdx, setSongIdx }) => {
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="songPlayer">
            <div className="innerSongPlayer">
                <SongPlay {...{currentSong: songs[songIdx], audioRef, setDuration, progressBarRef}} />
                <SongControls {...{audioRef, progressBarRef, duration, setTimeProgress, songs, songIdx, setSongIdx}} />
                <SongProgressBar {...{progressBarRef, audioRef, timeProgress, duration}} />
            </div>
        </div>
    );
};

export default SongPlayer;