// CommentForm.js
import { useState } from "react";
const filter = require('leo-profanity');

const CommentForm = ({songs, setSongs, songIdx}) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        // Prevent refresh
        e.preventDefault();
        const text = e.target[0].value;
        const date = new Date()
        console.log(text, date);

        if (filter.check(text)) {
            setError('Profanity Detected');
            return;
        }
        if (text.length === 0) {
            setError('Cannot Post Empty Comment')
            return;
        }
        if (text.replace(/\s/g, '').length === 0) {
            setError('Comment Only Contains Whitespace');
            return;
        }

        const response = await fetch(`http://localhost:4000/api/songs/${songs[songIdx]._id}`, {
            method: 'PATCH',
            body: JSON.stringify({comment_text: text, comment_date: date}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            setComment('');
            console.log('new comment added', json);
        }
        
        // Update local songs array so we don't have to get from api again.
        let tempSongs = [...songs];
        tempSongs[songIdx].comments.push({comment_text: text, comment_date: date});
        setSongs(tempSongs);
    };
    
    return (
        <form className="create-comment" onSubmit={handleSubmit}>
            <div className="text-area-wrapper">
                <textarea 
                    className="form-control" 
                    placeholder="Write a comment then hit submit!"
                    onChange={(e) => setComment(e.target.value)} 
                    value={comment} 
                />
            </div>
            <input type='submit' className="btn btn-light" />
            {error && <div>{error}</div>}
        </form>
    );
};

export default CommentForm;