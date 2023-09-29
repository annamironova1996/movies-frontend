import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';

//вытаскиваю из бека авторизованного пользователя
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (params) => {
        const { data } = await axios.post('/login', params);

        return data;
    }
);
//запрос на бек для регистрации
export const fetchUserRegister = createAsyncThunk(
    'user/fetchUserRegister',
    async (params) => {
        const { data } = await axios.post('/register', params);
        return data;
    }
);

//вытаскиваю из бэка инфо о пользователе
export const fetchAboutMe = createAsyncThunk('user/fetchAboutMe', async () => {
    const { data } = await axios.get('/me');

    return data;
});

// начальное состояние
const initialState = {
    data: null,
    status: 'loading',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        //для авторизации
        builder.addCase(fetchUserData.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });

        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        });

        builder.addCase(fetchUserData.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
        //для инфо обо мне
        builder.addCase(fetchAboutMe.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });

        builder.addCase(fetchAboutMe.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        });

        builder.addCase(fetchAboutMe.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
        //для регистрации пользователя
        builder.addCase(fetchUserRegister.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });

        builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = 'loaded';
        });

        builder.addCase(fetchUserRegister.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
    },
});

export const selectIsAuth = (state) => Boolean(state.user.data);

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
