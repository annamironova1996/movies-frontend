import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import axios from '../../axios';

import { fetchUserRegister, selectIsAuth } from '../../redux/Slices/user';
import styled from '../Login/Login.module.scss';

const Registration = () => {
    //проверим, авторизован ли пользователь
    const isAuth = useSelector(selectIsAuth);
    const [avatarUrl, setAvatarUrl] = React.useState('');
    const inputFileRef = React.useRef(null);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        // setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            avatarUrl: '',
            fullName: '',
            email: '',
            password: '',
        },
        values: {
            avatarUrl,
        },
        mode: 'onChange',
    });

    //отправляем изображение на сервер
    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();

            const file = event.target.files[0];
            formData.append('image', file);

            const { data } = await axios.post('/upload', formData);

            setAvatarUrl(data.url);
        } catch (error) {
            console.log(error);
            alert('Ошибка при загрузке файла');
        }
    };

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserRegister(values));

        if (!data.payload) {
            return alert('Не удалось зарегистрироваться');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    console.log(avatarUrl);
    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section className={styled.registration}>
            <Paper classes={{ root: styled.root }}>
                <Typography
                    classes={{ root: styled.title }}
                    variant="h5"
                >
                    Создание аккаунта
                </Typography>
                <form
                    className={styled.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        {avatarUrl ? (
                            <img
                                className={styled.userAvatar}
                                src={`http://localhost:4444${avatarUrl}`}
                                alt="аватар пользователя"
                            />
                        ) : (
                            <>
                                <Avatar
                                    onClick={() => inputFileRef.current.click()}
                                    type="file"
                                    className={styled.avatar}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <input
                                    ref={inputFileRef}
                                    type="file"
                                    onChange={handleChangeFile}
                                    hidden
                                />
                            </>
                        )}
                    </div>

                    <TextField
                        classes={{ root: styled.field }}
                        placeholder="Имя Фамилия"
                        type="text"
                        error={Boolean(errors.fullName?.message)}
                        helperText={errors.fullName?.message}
                        {...register('fullName', {
                            required: 'Укажите полное имя',
                        })}
                        fullWidth
                    />
                    <TextField
                        classes={{ root: styled.field }}
                        placeholder="E-Mail"
                        type="email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите почту' })}
                        fullWidth
                    />
                    <TextField
                        classes={{ root: styled.field }}
                        placeholder="Пароль"
                        error={Boolean(errors.password?.message)}
                        helperText={errors.password?.message}
                        {...register('password', {
                            required: 'Укажите пароль',
                        })}
                        fullWidth
                    />

                    <Button
                        classes={{ root: styled.button }}
                        size="large"
                        variant="contained"
                        fullWidth
                        type="submit"
                        disabled={!isValid}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </Paper>
        </section>
    );
};

export default Registration;
