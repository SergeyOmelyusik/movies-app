import React from "react"
import { useContext, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { AppContext } from "../../App"
import { IMAGE_API } from "../Api"
import style from './MovieCard.module.css'
import imageNotFound from './../../assets/images/no-photo.png'

const MovieCard = (props) => {

    const {watchList, addToWatchList, searchTerm, setSearchTerm} = useContext(AppContext)
    let storedMovie = watchList.find(movie => movie.id === props.id)
    const watchListDisabled = storedMovie ? true : false
    
    return(
        <li className={style.movie}>
            <div className={style.movieImage}>
                { props.poster_path ? <img src={`${IMAGE_API}/w500${props.poster_path}`} alt={props.title} /> : <img src={imageNotFound} alt={props.title} />}
            </div>

            <div className={style.movieAverage}>{props.vote_average}</div>

            <button onClick={() => {addToWatchList(props)}} className={style.btnAdd} disabled={watchListDisabled}>Add to WatchList</button>

            <div className={style.movieInfo}>
                {props.release_date ? <p className={style.movieYear}>{props.release_date.slice(0,4)}</p> : <p className={style.movieYear}>-</p>}
                <h3 className={style.movieTitle}><NavLink onClick={() => {setSearchTerm('')}} to={"/movie/" + props.id +"/"}> {props.title} </NavLink></h3>   
            </div>
        </li>
    )
}

export default MovieCard