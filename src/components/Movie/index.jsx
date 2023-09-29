import React from 'react';

// import Review from '../Review';
import styled from './Movie.module.scss';
import { useDispatch } from 'react-redux';
import { fetchRemoveMovie } from '../../redux/Slices/movies';

const Movie = ({
    _id,
    title,
    director,
    genres,
    year,
    imageUrl,
    isEditable,
}) => {
    const dispatch = useDispatch();

    const onClickRemove = () => {
        dispatch(fetchRemoveMovie(_id));
    };

    return (
        <article className={styled.filmCard}>
            {isEditable ? <button>Редактировать</button> : ''}
            <img
                src={`http://localhost:4444${imageUrl}`}
                alt="баннер фильма"
            />
            <h2 className={styled.title}>Название: {title}</h2>
            <h3>Режисер: {director}</h3>
            <i>Год: {year}</i>
            <p>Жанр: {genres}</p>

            <button
                className={styled.removeButton}
                onClick={onClickRemove}
            >
                Удалить
            </button>
        </article>
    );
};

export default Movie;
