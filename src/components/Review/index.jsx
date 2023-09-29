import React from 'react';

const Review = ({ name, text }) => {
    return (
        <>
            <p>{name}</p>
            <p>{text}</p>
        </>
    );
};

export default Review;
