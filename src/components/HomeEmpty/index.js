import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from './HomeEmpty.module.scss';

const HomeEmpty = () => {
    return (
        <div className={styled.wrapper}>
            <img
                className={styled.img}
                src="img/empty.svg"
                alt="иконка"
            />
            <h2 className={styled.title}>
                Вы еще не добавили ни одного фильма в свою коллекцию
            </h2>
            <NavLink
                className={styled.button}
                to="/add-movie"
            >
                Добавить фильм в коллекцию
            </NavLink>
        </div>
    );
};

export default HomeEmpty;
