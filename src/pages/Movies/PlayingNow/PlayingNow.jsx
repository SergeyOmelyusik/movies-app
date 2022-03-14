import React from "react"
import { useState, useEffect, useContext, useLayoutEffect } from "react"
import axios from "axios"
import { AppContext } from "../../../App"
import { API_KEY, MOVIE_API} from "../../../components/Api"
import style from './PlayingNow.module.css'
import MyPagination from "../../../components/Pagination/Pagination"
import Loader from "../../../components/Loader/Loader"
import MovieCard from "../../../components/MovieCard/MovieCard"
import Search from "../../../components/Search/Search"

const PlayingNow = () => {
    const {searchTerm} = useContext(AppContext)
    const [moviesList, setMoviesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(10)
    let [page, setPage] = useState(1)

    function getMovies() {
        axios
            .get(`${MOVIE_API}now_playing?api_key=${API_KEY}&page=${page}`)
            .then(({data}) => {setMoviesList(data.results) 
                setTotalPages(data.total_pages)})
            .catch((error) => console.log(error))
            setLoading(true)
    }

    useEffect(() => { 
        getMovies()
    }, [page])

    useLayoutEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        window.scroll(0,0)
    }, [page])

    return(
        <>
            {searchTerm ? (<Search />) : (
                !loading ? (<Loader/>) : (
                    
                <div>
                    <h2>Playing Now</h2>

                    <ul className={style.movieList}>
                        { moviesList && moviesList.map((movie) => {
                            return (
                                <MovieCard key={movie.id} {...movie} />
                            ) 
                        })}
                    </ul>
        
                    <MyPagination page={page} setPage={setPage} totalPages={totalPages}/>
                </div>)
            )}
        </>
       

    )
}
export default PlayingNow