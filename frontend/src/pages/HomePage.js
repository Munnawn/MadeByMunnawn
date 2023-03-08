// HomePage.js
// Just shows a file that says CLICK ME and then proceeds to SongPage.

import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const HomePage = () => {
    const [isImgLoaded, setisImgLoaded] = useState(false);

    const handleImgLoad = () => {
        setisImgLoaded(true);
    };

    return (
        <div className="home-page-wrapper">
            <Navbar />
            <div className="homePage">
                <p id='choose'>-CHOOSE-</p>
                <Link className="rotateImage song-snippets-link" to='/enter'>
                    <img className='fileImg'
                        src='https://made-by-munnawn-song-snippets.s3.amazonaws.com/file+with+volume+3+bars+(active).png' 
                        alt='-SongSnippets-' 
                        onLoad={handleImgLoad}
                    />
                    {isImgLoaded && <p>-SONG SNIPPETS-</p>}
                </Link>
            </div>
        </div>
    );
};

export default HomePage;