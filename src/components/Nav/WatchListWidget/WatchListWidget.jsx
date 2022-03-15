import { useContext } from "react"
import { AppContext } from "../../../App"
import { NavLink } from "react-router-dom"
import style from './WatchListWidget.module.css'
import watchListImg from './../../../assets/images/wishlist.png'


const WatchListWidget = () => {
    const {watchList} = useContext(AppContext)

    return(
        <div className={style.widgetContainer}>
            <NavLink to={'/watchlist'}><img src={watchListImg} alt="" /></NavLink>
            <span>{watchList.length}</span>
        </div>
    )
}

export default WatchListWidget