import React, { useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import styled from './AboutMe.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Movie from '../../components/Movie';

import { fetchAboutMe } from '../../redux/Slices/user';

const AboutMe = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);

    React.useEffect(() => {
        dispatch(fetchAboutMe());
    });

    return (
        <section className={styled.AboutMePage}>
            <div className="container">
                <div className={styled.AboutMeWrapper}>
                    <div className={styled.userInfo}>
                        <h2 className={styled.title}>Личная информация</h2>

                        <img
                            className={styled.userImg}
                            // src={`http://localhost:4444${data.avatarUrl}`}
                            alt="фото пользователя"
                        />
                        <div className={styled.user}>
                            <div className={styled.userWrapper}>
                                <h3 className={styled.userName}>
                                    Имя пользователя
                                </h3>
                                <CiEdit />
                            </div>
                            <div className={styled.userWrapper}>
                                <p className={styled.userEmail}>
                                    email пользователя
                                </p>
                                <CiEdit />
                            </div>

                            <NavLink
                                className={styled.addMovie}
                                to="/add-movie"
                            >
                                Поделиться фильмом
                            </NavLink>
                        </div>
                    </div>

                    <div className={styled.userMovies}>
                        <h3 className={styled.title}>
                            Подборки фильмов, которые вы уже опубликовали
                        </h3>
                        {/* <div className={styled.allMovies}>
                            {movies?.map((movie) => {
                                return (
                                    <Movie
                                        key={movie._id}
                                        {...movie}
                                    />
                                );
                            })}
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
