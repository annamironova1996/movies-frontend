import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

//вытягиваю аксиосом из бека все фильмы
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const { data } = await axios.get('/movies');
    return data;
});

//удаление на беке фильма по id
export const fetchRemoveMovie = createAsyncThunk(
    'movie/fetchRemoveMovie',
    async (id) => {
        await axios.delete(`/movies/${id}`);
    }
);

// начальное состояние
const initialState = {
    movies: {
        items: [],
        status: 'loading',
    },
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //на получение всех постов
        builder.addCase(fetchMovies.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });

        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'loaded';
        });

        builder.addCase(fetchMovies.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        });

        //на удаление поста по id
        builder.addCase(fetchRemoveMovie.pending, (state, action) => {
            state.items = state.items.filter(
                (obj) => obj._id !== action.meta.arg
            );
        });

        builder.addCase(fetchRemoveMovie.rejected, (state) => {
            state.status = 'error';
        });
    },
});

export const moviesReducer = moviesSlice.reducer;
