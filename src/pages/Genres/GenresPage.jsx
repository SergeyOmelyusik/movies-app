import React from "react";
import { useState, useEffect, useContext, useRef} from "react";
import axios from "axios";
import { API_KEY } from "../../components/Api";
import style from './GenresPage.module.css'
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import MovieCard from "../../components/MovieCard/MovieCard";
import MyPagination from "../../components/Pagination/Pagination";
import { AppContext } from "../../App";

const GenresPage = () => {
    
    const [genresList, setGenresList] = useState([])
    const {searchTerm} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [movieList, setMovieList] = useState([])
    let [totalPages, setTotalPages] = useState(1)
    let [page, setPage] = useState(1)
    const moviesList = useRef(null)

    function getGenres () {
        axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`) 
        .then(({data}) => { 
            setGenresList(data.genres)
        })
        .catch((error) => console.log(error))
        setLoading(true)
    }

    function getMovies(genre) {
        axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`) 
        .then(({data}) => { 
            setMovieList(data.results)
            setTotalPages(data.total_pages)
        })
        .catch((error) => console.log(error))
        setLoading(true)

    }

    function changeGenre(genre) {
        let selectedGenresTmp = selectedGenres

        if(selectedGenresTmp.indexOf(genre) !== -1) {
            selectedGenresTmp = selectedGenresTmp.filter(item => item !== genre)
        } else {
            selectedGenresTmp.push(genre)
        }

        setSelectedGenres([...selectedGenresTmp])
        setPage(1)
    }

    useEffect(() => {
        getGenres() 
    }, [])

    useEffect(() => {
        getMovies(selectedGenres) 
    }, [selectedGenres, page])

    useEffect(() => {
        setPage(1)
    }, [selectedGenres])

    useEffect(() => {
        moviesList.current && window.scroll(0, moviesList.current.offsetTop)
    }, [page])

    return (
        <>
            {searchTerm ? (<Search />) : (
                !loading ? (<Loader/>) :(
                    <div>
                        <ul className={style.genresList}>
                            {genresList && genresList.map(genre => {
                                return(
                                    <li className={selectedGenres.find(item => item === genre.id) ? style.genreItemActive : style.genreItem} key={genre.id} onClick={() => changeGenre(genre.id)}>{genre.name}</li>
                                )
                            })}

                        </ul>

                        <div>
                            <ul ref={moviesList} className={style.movieList}>
                                    {movieList && movieList.map((movie) => {
                                        {return(<MovieCard key={movie.id} {...movie}/>)}
                                    })}
                                </ul>
                        </div>
                        {
                            totalPages > 1 && <MyPagination page={page} setPage={setPage} totalPages={totalPages}/>
                        }
                    </div>
                )
            )}
        </>
    )
}

export default GenresPage