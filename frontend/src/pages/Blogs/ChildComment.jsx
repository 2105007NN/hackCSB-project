import React from 'react'
import { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

const ChildComment = ({ childComment }) => {
    const [childAuthor, setChildAuthor] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5002/users/${childComment.user_id}`)
            .then(res => res.json())
            .then(data => setChildAuthor(data))
    }
        , []);
    return (
        <div>
            <div className="d-flex flex-start" style={{ paddingLeft: '50px' }}>
                <SingleComment comment={childComment} />
            </div>

        </div>
    )
}

export default ChildComment;