import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styled from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/Slices/user';

import { logout } from '../../redux/Slices/user';

const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onClickLogout = () => {
        if (window.confirm('Вы действительно хотите выйти?')) {
            dispatch(logout());
            window.localStorage.removeItem('token', '');
            navigate('/');
        }
    };
    return (
        <header className={styled.header}>
            <div className="container">
                <div className={styled.wrapper}>
                    <NavLink
                        className={styled.logo}
                        to="/"
                    >
                        <img
                            src="img/logo.svg"
                            alt="logo"
                        />
                        <h1 className={styled.title}>
                            Есть <span>ЧЁ</span> посмотреть?
                        </h1>
                    </NavLink>
                    {isAuth ? (
                        <div className={styled.buttonWrapper}>
                            <NavLink
                                className={styled.addMovieButton}
                                to="/add-movie"
                            >
                                Добавить фильм в коллекцию
                            </NavLink>
                            <button
                                className={styled.logoutButton}
                                color="#ffffff"
                                onClick={onClickLogout}
                            >
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className={styled.buttonWrapper}>
                            <NavLink
                                className={styled.registerBtn}
                                to="register"
                            >
                                Зарегистрироваться
                            </NavLink>
                            <NavLink
                                className={styled.loginBtn}
                                to="login"
                            >
                                Войти
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
