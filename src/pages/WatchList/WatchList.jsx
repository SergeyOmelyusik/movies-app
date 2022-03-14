import React from "react";
import { AppContext } from "../../App";
import { useContext} from "react";
import { Link } from "react-router-dom";
import style from './WatchList.module.css'
import { IMAGE_API } from "../../components/Api";
import imageNotFound from './../../assets/images/no-photo.png'

const WatchList = () => {
    const {watchList, removeToWatchList} = useContext(AppContext)

    return (
        <div className={style.watchList}>
            <h2>WatchList</h2>
            {watchList.length > 0 ? (
                <ul className={style.movieList}>
                    {watchList && watchList.map((movie) => {
                        {return(
                        <li key={movie.id} className={style.movie}>
                            <div className={style.movieImage}>
                                { movie.poster_path ? <img src={`${IMAGE_API}/w500${movie.poster_path}`} alt={movie.title} /> : <img src={imageNotFound} alt={movie.title} />}
                            </div>
                            <div className={style.movieAverage}>{movie.vote_average}</div>
                            <button onClick={() => {removeToWatchList(movie.id)}} className={style.btnRemove}>Delete from WatchList</button>
                            <div className={style.movieInfo}>
                                {movie.release_date ? <p className={style.movieYear}>{movie.release_date.slice(0,4)}</p> : <p className={style.movieYear}>-</p>}
                                <h3 className={style.movieTitle}><Link to={"/movie/" + movie.id +"/"}> {movie.title} </Link></h3>   
                            </div>
                        </li>
                        )}
                    })}
                 </ul>
            ) : (<h3 className={style.messageOfEmpty}>Oops! Your WatchList is empty! Add your desired movies on our application pages</h3>)}
            
        </div>
    )
}

export default WatchList