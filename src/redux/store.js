import { configureStore } from '@reduxjs/toolkit';

import { moviesReducer } from './Slices/movies';
import { userReducer } from './Slices/user';

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer,
    },
});

export default store;
