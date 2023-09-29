import React from 'react';

import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Registration from './pages/Registration';
// import FullMovie from './pages/FullMovie';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutMe, selectIsAuth } from './redux/Slices/user';

import AddMovie from './components/AddMovie';
import AboutMe from './pages/AboutMe';

function App() {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchAboutMe);
    });
    return (
        <>
            <Header />
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Registration />}
                />
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/add-movie"
                    element={<AddMovie />}
                />
                <Route
                    path="/me"
                    element={<AboutMe />}
                />
                {/* <Route
                    path="/movies/:id"
                    element={<FullMovie />}
                /> */}
            </Routes>
        </>
    );
}

export default App;
