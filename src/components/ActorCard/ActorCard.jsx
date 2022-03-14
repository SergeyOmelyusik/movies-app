import React from "react"
import { NavLink } from "react-router-dom"
import { IMAGE_API } from "../Api"
import { AppContext } from "../../App"
import { useContext } from "react"
import style from './ActorCard.module.css'
import imageNotFound from './../../assets/images/not-found.jpg'

const ActorCard = (props) => {

    const {setSearchTerm} = useContext(AppContext)

    return(
        <li className={style.actor}>
            <div className={style.actorPhoto}>
                { props.profile_path ? <img src={`${IMAGE_API}/w500${props.profile_path}`} alt={props.name} /> : <img src={imageNotFound} alt={props.title} />}
            </div>

            <div className={style.actorName}>
                <h3><NavLink to={"/cast/" + props.id +"/"} onClick={() => setSearchTerm('')}> {props.name} (actor) </NavLink></h3>
            </div>
        </li>
    )
}

export default ActorCard