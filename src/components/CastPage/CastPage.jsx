import style from './CastPage.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../App'
import axios from 'axios'
import { API_KEY, PERSON_API, IMAGE_API  } from '../Api'
import Loader from '../Loader/Loader'
import MovieCard from '../MovieCard/MovieCard'
import Search from '../Search/Search'
import imageNotFound from './../../assets/images/no-photo.png'

const CastPage = () => {

    let params = useParams()
    const id = params.id
    const {searchTerm} = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [castInfo, setCastInfo] = useState(null)
    const [castImage, setCastImage] = useState([])
    const [castMovies, setCastMovies] = useState([])

    function getInfo() {
        axios
        .get(`${PERSON_API}${id}?api_key=${API_KEY}`) 
        .then(({data}) => { setCastInfo(data)
        })
        .catch((error) => console.log(error))
    }

    function getImages() {
        axios
        .get(`${PERSON_API}${id}/images?api_key=${API_KEY}`) 
        .then(({data}) => { setCastImage(data.profiles)
        })
        .catch((error) => console.log(error))
    }

    function getMovie() {
        axios
        .get(`${PERSON_API}${id}/movie_credits?api_key=${API_KEY}`) 
        .then(({data}) => { setCastMovies(data.cast)
        })
        .catch((error) => console.log(error))
    }

    function getData() {
        getInfo()
        getImages()
        getMovie()
    }

    useEffect(() => {
            getData()
            setLoading(true)
            window.scroll(0,0)   
    },[])

    useEffect(() => {
        getData()
        window.scroll(0,0) 
    }, [id])

    return (
        <>
            <div className={style.castPage}>
                {searchTerm ? (<Search />) : (!loading ? (<Loader />) : (
                    castInfo && 
                    <>
                        <div className={style.castInfo}>
                            <div className={style.castPhoto}>
                                {castInfo.profile_path ? (<img src={`${IMAGE_API}w500${castInfo.profile_path}`} alt="" />) : (<img src={`${imageNotFound}`} alt="" />)}
                            </div>

                            <div className={style.biography}>
                                <h2>{castInfo.name}</h2>
                                {castInfo.birthday ? (<p><span>Date of Birth: </span>{castInfo.birthday}</p>) : (<p><span>Date of Birth: </span>Information not found</p>)}
                                {castInfo.place_of_birth ? (<p><span>Place of Birth: </span>{castInfo.place_of_birth}</p>) : (<p><span>Place of Birth: </span>Information not found</p>)}
                                {castInfo.biography ? (<p><span>Biography: </span>{castInfo.biography}</p>) : (<p><span>Biography: </span>Information not found</p>)}
                            </div>
                            </div>

                            {castImage.length > 0 ? (
                                <div className={style.castImageBlock}>
                                    <h3>Photo</h3>
                                    <ul>
                                        {castImage.map((image, index) => {
                                            return (
                                                <li className={style.castImage} key={index}><img src={`${IMAGE_API}/w500${image.file_path}`} alt="" /></li>
                                            )
                                        })}
                                    </ul>
                                </div>) : ('') 
                            }

                            <div className={style.castMoviesBlock}>
                                <h3>Movies with Actors</h3>
                                <ul className={style.moviesList}>
                                    {castMovies.map((movie) => {
                                        return (
                                            < MovieCard key={movie.id} {...movie}/>
                                        )
                                    })}
                                </ul>
                            </div>
                    </>
                ))}
            
            </div>
        </>
        
    )
}

export default CastPage