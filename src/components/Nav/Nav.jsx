import React from "react";
import { useContext, useEffect} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../App";
import style from './Nav.module.css'
import { API_KEY } from "../Api";

const Nav = () => {
    const {menuActive, setMenuActive, searchTerm, setSearchTerm, setSearchResults, searchPage, setSearchPage, setTotalSearchPages } = useContext(AppContext)
    
    const handleOnSubmit = (event) => {
        event.preventDefault()
    }

    const handleOnChange = (event) => {
        setSearchTerm(event.target.value)
    }

    function getData() {
        axios
        .get(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}&page=${searchPage}`)
        .then(({data}) => {
            setSearchResults(data.results)
            setTotalSearchPages(data.total_pages)
            window.scroll(0,0)
        }) 
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        if(searchTerm !== '') {
            getData()
        }
    }, [searchTerm, searchPage])

    useEffect(() => {
        setSearchPage(1)
    }, [searchTerm])

    return (
        <nav className={style.nav}>
            <div className={style.burger__btn} onClick={()=> setMenuActive(!menuActive)}>
                <span></span>
            </div>

            <div><NavLink to={'./'} className={style.logo} >MoviesApp</NavLink></div>

            <div className={style.search}>
                <form onSubmit={handleOnSubmit}>
                     <input type="text" onChange={handleOnChange} value={searchTerm} placeholder="Search movie"/>
                </form>
            </div>
        </nav>
    )
}

export default Nav