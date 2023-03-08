// SongPage.js
// The page that shows songs.

import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import SongPlayer from '../components/SongPlayer';
import CommentForm from "../components/CommentForm";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import 'bootstrap/dist/css/bootstrap.min.css';

const SongPage = () => {
    const [songs, setSongs] = useState(null);
    const [songIdx, setSongIdx] = useState(0);
    const [numImgsLoaded, setNumImgsLoaded] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const box_ref = useRef();
    const totalImgs = 1;

    const handleCommentsButtonClick = () => {
        console.log(box_ref, showComments, songs);
        box_ref.current.classList.remove('fade-in');
        box_ref.current.classList.add('fade-out');

        setTimeout(() =>{
            box_ref.current.classList.remove('fade-out');
            box_ref.current.classList.add('fade-in');
            setShowComments(!showComments);
        }, 500);
    };

    const handleImgLoad = () => {
        setNumImgsLoaded(numImgsLoaded + 1);
    };
    
    // Get active songs
    useEffect(() => {
        const fetchSongs = async () => {
            const response = await fetch('http://localhost:4000/api/songs');
            const json = await response.json();

            if (response.ok) {
                setSongs(json);
            }
        };

        fetchSongs();
    }, []);

    return (
        <div className="song-page-wrapper">
            <Navbar />
            <div className="songPage">
                <div className='boxScreen'>
                    <div className="box-content" ref={box_ref}>
                        <div className="comments" style={{ display: showComments ? 'flex' : 'none' }}>
                            <div>Comments:</div>
                            <CommentForm {...{songs, setSongs, songIdx}}/>
                            {showComments && songs && songs[songIdx].comments.slice(0).reverse().map((comment, index) => (
                                <div className="single-comment" key={index}>
                                    <div className="comment-text">
                                        {comment.comment_text}&nbsp;
                                    </div>
                                    <div className="comment-date">
                                        ({formatDistanceToNow(new Date(comment.comment_date), { addSuffix: true })})
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="songs" style={{ display: !showComments ? 'block' : 'none' }}>
                            {songs && 
                                <>
                                    <div className="rotateImage activeSong">
                                        <img className='fileImg'
                                            src='https://made-by-munnawn-song-snippets.s3.amazonaws.com/file+with+volume+3+bars+(active).png' 
                                            alt='Song' 
                                            onLoad={handleImgLoad}
                                        />
                                        {numImgsLoaded >= totalImgs && <p>{songs[songIdx].song_name}</p>}
                                    </div>
                                    {numImgsLoaded >= totalImgs && <SongPlayer {...{songs, songIdx, setSongIdx}} />}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center fixed-bottom mb-3">
                    <button className="btn btn-dark" type="button" onClick={handleCommentsButtonClick}>
                        {!showComments ? 'Comments' : 'Back'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SongPage;