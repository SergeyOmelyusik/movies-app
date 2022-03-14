import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../../App";
import style from './Menu.module.css'

const Menu = ({items}) => {
    const {menuActive,setMenuActive} = useContext(AppContext)
    return(
        <div className={menuActive ? style.menuActive : style.menu} onClick={() => setMenuActive(false)}>
            <button className={style.btn__close}></button>

            <ul className={style.linkList}>
                {items.map((item, index) => 
                    <li key={index}>
                        <NavLink to={item.path} className={style.link}>{item.value}</NavLink>
                        {item.subLinks ? 
                        <ul className={style.subLinksList}>{
                            item.subLinks.map((link, index) => {
                                return(
                                <li key={index}>
                                    <NavLink to={link.path} className={style.subLink}>{link.value}</NavLink>
                                </li>)
                            })
                            }    
                        </ul>: ''
                        }
                    </li> 
                )}
            </ul>
        </div>
    )
}

export default Menu