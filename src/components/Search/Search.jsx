import { useContext} from "react"
import { AppContext } from "../../App"
import style from './Search.module.css'
import MovieCard from "../MovieCard/MovieCard"
import MyPagination from "../Pagination/Pagination"
import ActorCard from "../ActorCard/ActorCard"


const Search = () => {
    const {searchResults, searchPage, setSearchPage, totalSearchPages} = useContext(AppContext)

    return (
        <>
            <h2>Results of Search</h2>
            {searchResults.length !== 0 ? (
            <div>
                <ul className={style.movieList}>
                    {searchResults && searchResults.map((item) => {
                        if(item.media_type === 'person') {
                            return (
                                <ActorCard key={item.id} {...item} />
                            )
                        } else if (item.media_type === 'movie') {
                            return (
                                <MovieCard key={item.id} {...item} /> 
                            )
                           
                        }
                        
                    })}
                </ul>
                {totalSearchPages > 1 && <MyPagination page={searchPage} setPage={setSearchPage} totalPages={totalSearchPages}/>}
            </div>) : (<h2>Oops! No results found</h2>)}
            
        </>
    )
}

export default Search