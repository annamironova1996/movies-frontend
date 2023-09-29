import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';

import styled from './Login.module.scss';
import { fetchUserData, selectIsAuth } from '../../redux/Slices/user';

const Login = () => {
    //проверим, авторизован ли пользователь
    const isAuth = useSelector(selectIsAuth);

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <section className={styled.login}>
            <Paper classes={{ root: styled.root }}>
                <Typography
                    classes={{ root: styled.title }}
                    variant="h5"
                >
                    Вход в аккаунт
                </Typography>
                <form
                    className={styled.form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        placeholder="E-Mail"
                        classes={{ root: styled.field }}
                        type="email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите почту' })}
                        fullWidth
                    />
                    <TextField
                        placeholder="Пароль"
                        classes={{ root: styled.field }}
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
                        Войти
                    </Button>
                </form>
            </Paper>
        </section>
    );
};

export default Login;
