import React from "react"
import { useState, useEffect, useContext} from "react"
import axios from "axios"
import { API_KEY} from "../../../components/Api"
import { AppContext } from "../../../App"
import style from './Tranding.module.css'
import MyPagination from "../../../components/Pagination/Pagination"
import Loader from "../../../components/Loader/Loader"
import MovieCard from "../../../components/MovieCard/MovieCard"
import Search from "../../../components/Search/Search"

const TrandingMovies = () => {
    const {searchTerm} = useContext(AppContext)
    const [moviesList, setMoviesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(10)
    let [page, setPage] = useState(1)
    const [type, setType] = useState('day')

    function getMovies() {
        axios
            .get(`https://api.themoviedb.org/3/trending/movie/${type}?api_key=${API_KEY}&page=${page}`)
            .then(({data}) =>  {
                setMoviesList(data.results) 
                setTotalPages(data.total_pages)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getMovies()
        setLoading(true)       
    }, [page, type])

    useEffect(() => {
        window.scroll(0,0)
    }, [page])

    return (
        <>
            {searchTerm ? (<Search />) : (
                !loading ? (<Loader/>) :(
                <div>
                    <h2>Tranding</h2>
                    <div className={style.typeSelect}>
                        <div className={style.formRadioBtn}>
                            <input id="radio-1" type="radio" name="radio" value="day" checked={type === 'day'} 
                            onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="radio-1">Day</label>
                        </div>
        
                        <div className={style.formRadioBtn}>
                            <input id="radio-2" type="radio" name="radio" value="week" checked={type === 'week'}
                            onChange={(e) => setType(e.target.value)}/>
                            <label htmlFor="radio-2">Week</label>
                        </div>
                    </div>

                    <ul className={style.movieList}>
                            { moviesList && moviesList.map((movie) => {
                            return (
                                <MovieCard key={movie.id} {...movie} />
                            ) 
                            })}
                            </ul>

                    <MyPagination page={page} setPage={setPage} totalPages={totalPages}/>
                </div>))
            }
        </>
       

    )
}
export default TrandingMovies