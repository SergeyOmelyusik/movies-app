import React, { useEffect, useState, useContext} from "react";
import { AppContext } from "../../App";
import { NavLink } from "react-router-dom";
import axios from "axios";
import style from './Movies.module.css'
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import { API_KEY, MOVIE_API } from "../../components/Api";
import PromoSlider from "../../components/PromoSlider/PromoSlider";

const Movies = () => {

    const {searchTerm} = useContext(AppContext)
    const [moviesList, setMoviesList] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [tranding, setTranding] = useState([])
    const [loading, setLoading] = useState(false)
    
    function getTopRated() {
        axios
            .get(`${MOVIE_API}top_rated?api_key=${API_KEY}&page=1`)
            .then(({data}) => setMoviesList([...data.results]))
            .catch((error) => console.log(error))
    }

    function getPopular() {
        axios
            .get(`${MOVIE_API}popular?api_key=${API_KEY}`)
            .then(({data}) => setPopularMovies(data.results))
            .catch((error) => console.log(error))
    }

    function getNowPlaying() {
        axios
        .get(`${MOVIE_API}now_playing?api_key=${API_KEY}&page=1`)
        .then(({data}) => setNowPlaying(data.results))
        .catch((error) => console.log(error))
    }

    function getUpcoming() {
        axios
        .get(`${MOVIE_API}upcoming?api_key=${API_KEY}&page=1`)
        .then(({data}) => setUpcoming(data))
        .catch((error) => console.log(error))
    }

    function getData() {
        getTopRated()
        getPopular()
        getNowPlaying()
        getUpcoming()
    }

    useEffect(() => {
            getData()
            setLoading(true)    
            window.scroll(0, 0) 
    }, [])


    return (
        <>
            {searchTerm ? (<Search />) : (
                !loading ? (<Loader />) : 
                    (<div className={style.container}>
                        <div className={style.promoContainer}>
                            <h2>Comming Soon</h2>
                            <PromoSlider {...upcoming}/>
                        </div>
                       
                        <h2>Popular Movie</h2>
                        <ul className={style.movieList}>
                            { popularMovies && popularMovies.map((movie,id) => {
                            return (
                                <MovieCard key={movie.id} {...movie} />
                            ) 
                            })}
                        </ul>
                            <NavLink to="/movies/popular" className={style.more}>More &rarr;</NavLink>
                       
                        <h2>Top Rated Movie</h2>
                        <ul className={style.movieList}>
                            { moviesList && moviesList.map((movie,id) => {
                            return (
                                <MovieCard key={movie.id} {...movie} />
                            ) 
                            })}
                         </ul>
                        <NavLink to="/movies/top-rated" className={style.more}>More &rarr;</NavLink>

                        <h2>Playing Now</h2>
                        <ul className={style.movieList}>
                            { nowPlaying && nowPlaying.map((movie,id) => {
                            return (
                                <MovieCard key={movie.id} {...movie} />
                            ) 
                            })}
                         </ul>
                         <NavLink to="/movies/playing-now" className={style.more}>More &rarr;</NavLink>
                    </div>
                    )
            )}
            
        </>
    )
}

export default Movies