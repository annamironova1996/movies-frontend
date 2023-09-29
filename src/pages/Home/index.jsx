import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Movie from '../../components/Movie';
import { fetchMovies } from '../../redux/Slices/movies';

import { selectIsAuth } from '../../redux/Slices/user';
import HomeEmpty from '../../components/HomeEmpty';

import styled from './Home.module.scss';

const Home = () => {
    const isAuth = useSelector(selectIsAuth);
    const movies = useSelector((state) => state.movies.items);
    const status = useSelector((state) => state.movies.status);
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.user.data);

    const isMoviesLoading = status === 'loading';
    React.useEffect(() => {
        dispatch(fetchMovies());
    }, []);

    return (
        <section className={styled.home}>
            <div className="container">
                {isAuth ? (
                    <div className={styled.homeWrapper}>
                        <div className={styled.homeContainer}>
                            {movies?.length > 0 ? (
                                <>
                                    <p className={styled.homeTitle}>
                                        Моя коллекция фильмов
                                    </p>
                                    <div className={styled.homeMovies}>
                                        {isMoviesLoading
                                            ? [...Array(5)]
                                            : movies?.map((movie) => {
                                                  console.log(movie);
                                                  return (
                                                      <Movie
                                                          key={movie._id}
                                                          {...movie}
                                                          isEditable={
                                                              userData?._id ===
                                                              movie?.users?.id
                                                          }
                                                      />
                                                  );
                                              })}
                                    </div>
                                </>
                            ) : (
                                <HomeEmpty />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styled.homeNotAuth}>
                        <h2 className={styled.title}>
                            Создавай свою{' '}
                            <span className={styled.titleViolet}>
                                коллекцию фильмов
                            </span>
                        </h2>
                        <p className={styled.subtitle}>
                            и больше не трать время на поиски, а заглядывай в
                            свою подборку!
                        </p>

                        <div className={styled.buttonWrapper}>
                            <NavLink
                                to="/register"
                                className={styled.buttonRegister}
                            >
                                Очень хочу создавать свои подборки фильмов
                            </NavLink>
                            <NavLink
                                to="/login"
                                className={styled.buttonLogin}
                            >
                                Я уже зареган, мне нужно войти
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
