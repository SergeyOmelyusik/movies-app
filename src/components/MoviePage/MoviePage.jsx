import React from "react"
import { useEffect, useState, useContext} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from "swiper"
import YouTube from 'react-youtube';
import { AppContext } from "../../App"
import MovieCard from "../MovieCard/MovieCard"
import Loader from "../Loader/Loader"
import Search from "../Search/Search"

import style from './MoviePage.module.css'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { API_KEY, MOVIE_API  } from "../Api"
import imageNotFound from './../../assets/images/not-found.png'

const MoviePage = () => {
    let params = useParams()
    const id = params.id

    const {searchTerm} = useContext(AppContext)

    const {watchList, addToWatchList} = useContext(AppContext)
    let storedMovie = watchList.find(item => item.id === +params.id)
    const watchListDisabled = storedMovie ? true : false

    const [movie, setMovie] = useState(null)
    const [casts, setCasts] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [reviews, setReviews] = useState([]) 
    const [trailer, setTrailer] = useState([]) 
    const [loading, setLoading] = useState(false) 
 
    function getMovie() {
        axios
        .get(`${MOVIE_API}${id}?api_key=${API_KEY}`)
        .then(({data}) => { setMovie(data)
        })
        .catch((error) => console.log(error))
    }

    function getCasts() {
        axios
        .get(`${MOVIE_API}${id}/casts?api_key=${API_KEY}`)
        .then(({data}) => { setCasts((data.cast).splice(0,10))
        })
        .catch((error) => console.log(error))
    }

    function getSimilar() {
        axios
        .get(`${MOVIE_API}${id}/similar?api_key=${API_KEY}&page=1`)
        .then(({data}) => { setSimilarMovies(data.results)
        })
        .catch((error) => console.log(error))
    }

    function getTrailer() {
        axios
        .get(`${MOVIE_API}${id}/videos?api_key=${API_KEY}`)
        .then(({data}) => { return data.results
        })
        .then((data) => {return data.filter(item => { return item.type === 'Trailer'})
        }) 
        .then((videos) => setTrailer(videos))
        .catch((error) => console.log(error))
    }

    function getReviews() {
        axios
        .get(`${MOVIE_API}${id}/reviews?api_key=${API_KEY}&page=1`) 
        .then(({data}) => { setReviews(data.results)
        })
        .catch((error) => console.log(error))
    }

    function getData() {
        getMovie()
        getCasts()
        getSimilar()
        getTrailer()
        getReviews()
    }

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins/60);
        let minutes = mins % 60;
        return `${hours} hours ${minutes}  minutes`;
    }

    useEffect(() => {
        getData()
        window.scroll(0,0)
        setLoading(true)  
    }, [id])
    
    return(
        <>
        { searchTerm ? (<Search />) : (!loading ? (<Loader />) :(
            movie && 
            <>
                <div className={style.moviePromo}>
                    <button onClick={() => {addToWatchList(movie)}} className={style.btnAdd} disabled={watchListDisabled}>Add to WatchList</button>

                    {movie.backdrop_path ? <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt="" /> : <img src={imageNotFound} alt="" /> }
                    
                    {movie.vote_average ? <span className={style.average}>{movie.vote_average}</span> : <span className={style.average}>Average not found</span>}

                    <h2 className={style.movieTitle}>{movie.title}</h2>

                    <div className={style.movieInfo}>

                        <div className={style.movieInfoLeft}>

                            {movie.release_date ? <p><span>Release:</span> {movie.release_date}</p> : <p>Release:-</p>}

                            {movie.runtime ? <p><span>Duration:</span> {getTimeFromMins(movie.runtime)}</p> :  <p><span>Duration:-</span></p>}
                        
                            {movie.production_countries[0] ? <p><span> Country of origin:</span> {movie.production_countries[0].name}</p> : <p><span>Country of origin:</span> - </p> }
                            
                        </div>

                        <div className={style.movieInfoRight}>

                            {movie.spoken_languages[0] ?<p><span>Language:</span> {movie.spoken_languages[0].english_name} </p> : <p><span>Language:</span>-</p>}

                            <ul>
                                <span>Genre:</span>
                                {movie.genres ? movie.genres.map((genre,index)=> {return(<li key={index}>{genre.name}</li>)}) : '-'}
                            </ul> 

                        </div>
                    </div>   
                </div>

                <div className={style.movieDescription}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                </div>

                <div className={style.casts}>
                    <h2>Casts</h2>

                    <ul>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                            clickable: true,
                            }}
                            breakpoints={{
                            640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            },
                            768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                            },
                            1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                            },
                            }}
                            modules={[Pagination]}
                            className={style.mySwiper}>
                            {casts.map((cast, index) => {
                                return(
                                    <SwiperSlide key={index}>
                                        <li>
                                            <div className={style.castPhoto}>
                                                {cast.profile_path ? <img src={`https://image.tmdb.org/t/p/w1280/${cast.profile_path}`} alt={cast.name} /> : <img src={imageNotFound} alt={cast.name} />} 
                                            </div>

                                            <div className={style.castInfo}>
                                                <Link to={"/cast/" + cast.id +"/"}>{cast.name}</Link>
                                                <p className={style.opacity}>{cast.character}</p>
                                            </div>
                                        </li>
                                    </SwiperSlide>
                                )         
                            })}
                            
                        </Swiper>
                    </ul>
                </div>

                    {trailer.length > 0 ? (
                    <div className={style.trailersBlock}>
                        <h2>Trailers</h2>

                        <ul className={style.trailersList}>
                           {trailer && trailer.map((item, index) => {
                               return (
                                    <li key={index}>
                                        <YouTube videoId={item.key} opts={{width: '100%', height:'500',}}/>
                                    </li>
                               )
                           })}
                        </ul>
                    </div>) : ('')}
                    
                    {reviews.length > 0 ? (
                    <div className={style.reviews}>
                        <h2>Reviews</h2>
                            <ul className={style.reviewsList}>
                                {reviews && reviews.map((review, index) => {
                                    {return(
                                    <div key={index} className={style.review}>
                                        
                                        <div className={style.authorInfo}>
                                            <div className={style.authorImage}>
                                                <img src="https://via.placeholder.com/70" alt="" />
                                                <span>{review.author}</span>
                                            </div>
                                        </div>

                                        <div className={style.reviewText}>
                                                <p>{review.content}</p>
                                            </div>
                                        <p>{}</p>
                                    </div>)}
                                })}
                            </ul>
                    </div>) :('')}
                    
                    
                    <div className={style.similarMovies}>
                        <h2>Similar Movies</h2>
                        
                            <ul className={style.movieList}>
                                {similarMovies && similarMovies.map((movie) => {
                                    {return(<MovieCard key={movie.id} {...movie}/>)}
                                })}
                            </ul>
                    </div>
            </>))
        }
        </>
    )
}
export default MoviePage