import axios from 'axios';
import React from 'react';

import Movie from '../../components/Movie';
import { useParams } from 'react-router-dom';

const FullMovie = () => {
    const [data, setData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    // вытаскиваем id из ссылки
    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/movies/${id}`)
            .then((res) => {
                setData(res);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                alert('Ошибка при получении abkmvf');
            });
    });
    console.log(data.id);

    // if (isLoading) {
    //     return (
    //         скелетон
    //     );
    // }

    return (
        <section>
            <Movie
                key={data._id}
                {...data}
            />
        </section>
    );
};

export default FullMovie;
