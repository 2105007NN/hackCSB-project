
import React from 'react'
import { useState, useEffect } from 'react';
import ShowComment from './ShowComment';

const ChildComment = ({ childComment }) => {
    const [childAuthor, setChildAuthor] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/users/${childComment.user_id}`)
            .then(res => res.json())
            .then(data => setChildAuthor(data))
    }
        , []);
    return (
        <div>
            <div className="d-flex flex-start p-4" >
                <ShowComment comment={childComment} />
            </div>

        </div>
    )
}

export default ChildComment;
