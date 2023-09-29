import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/Slices/user';
import { Navigate, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';

import axios from '../../axios';
import styled from './AddMovie.module.scss';

const AddMovie = () => {
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setIsLoading] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [director, setDirector] = React.useState('');
    const [year, setYear] = React.useState('');
    const [genres, setGenres] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null);

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    //отправляем изображение на сервер
    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();

            const file = event.target.files[0];
            formData.append('image', file);

            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.log(error);
            alert('Ошибка при загрузке файла');
        }
    };

    const {
        // register,
        handleSubmit,
        // setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const fields = {
                title,
                director,
                imageUrl,

                year,
                genres,
            };

            const { data } = await axios.post('/movies', fields);

            alert('Ваша подборка добавлена в нашу коллекцию!');
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('Ошибка при создании фильма');
        }
    };
    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to="/" />;
    }

    console.log(isAuth);

    return (
        <section className={styled.AddMoviePage}>
            <div className="container">
                <div className={styled.AddMovieWrapper}>
                    <Paper classes={{ root: styled.root }}>
                        <Typography classes={{ root: styled.title }}>
                            Добавить фильм в коллекцию
                        </Typography>
                        <button
                            className={styled.addBanner}
                            onClick={() => inputFileRef.current.click()}
                        >
                            Добавить баннер фильма
                        </button>
                        <input
                            ref={inputFileRef}
                            type="file"
                            onChange={handleChangeFile}
                            hidden
                        />

                        <form
                            className={styled.formMovie}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                placeholder="Название фильма"
                                classes={{ root: styled.field }}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <TextField
                                placeholder="Режисер"
                                classes={{ root: styled.field }}
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                            />
                            <TextField
                                placeholder="Год выпуска"
                                classes={{ root: styled.field }}
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />

                            <TextField
                                placeholder="Жанр"
                                classes={{ root: styled.field }}
                                value={genres}
                                onChange={(e) => setGenres(e.target.value)}
                            />

                            <Button
                                classes={{ root: styled.buttonSubmit }}
                                onClick={onSubmit}
                            >
                                Опубликовать
                            </Button>
                        </form>
                    </Paper>
                    <div>
                        {imageUrl && (
                            <>
                                <button
                                    className={styled.deleteBanner}
                                    onClick={onClickRemoveImage}
                                >
                                    Удалить баннер
                                </button>
                                <img
                                    className={styled.bannerImg}
                                    src={`http://localhost:4444${imageUrl}`}
                                    alt="баннер фильма"
                                    width={300}
                                />
                                <h3>Название: {title}</h3>
                                <p>Режисер: {director}</p>
                                <p>Год выпуска: {year}</p>
                                <p>Жанр: {genres}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddMovie;
