import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import ScrollToTop from "react-scroll-to-top";
import Header from './components/Header/Header';
import Menu from './components/Nav/Menu/Menu';
import Movies from './pages/Movies/Movies';
import MoviePage from './components/MoviePage/MoviePage';
import WatchList from './pages/WatchList/WatchList';
import Footer from './components/Footer/Footer';
import CastPage from './components/CastPage/CastPage';
import PopularMovies from './pages/Movies/PopularMovies/PopularMovies';
import TopRatedMovies from './pages/Movies/TopRatedMovies/TopRatedMovies';
import PlayingNow from './pages/Movies/PlayingNow/PlayingNow';
import TrandingMovies from './pages/Movies/Tranding/Tranding';
import GenresPage from './pages/Genres/GenresPage';
import WatchListWidget from './components/Nav/WatchListWidget/WatchListWidget';


const AppContext = React.createContext()

function App() {
    const menuItems = [{value: "Home", path: "/"}, {value: "Top Rated ", path: "/movies/top-rated"}, {value: "Playing Now", path: "/movies/playing-now"}, {value: "Popular", path: "/movies/popular"}, {value: "Tranding", path: "/movies/tranding"}, {value: "Sorting by Genre", path: "/genres"}, {value: "Watch list", path: "/watchlist"}]

    const [menuActive, setMenuActive] = useState(false)
    const [moviesList, setMoviesList] = useState([])
    const [watchList, setWatchList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    let [searchPage, setSearchPage] = useState(1)
    let [totalSearchPages, setTotalSearchPages] = useState(null)

    function addToWatchList(movie) {
        let watchListTmp = watchList
        
        if(watchList.map(m => m.id).indexOf(movie.id) !== -1) {
            watchListTmp = watchListTmp.filter(item => item.id !== movie.id)
        } else {
            watchListTmp.push(movie)  
        }
            setWatchList([...watchListTmp])
            localStorage.setItem('watchlist', JSON.stringify(watchList))
    }

    function removeToWatchList(id) {
        let watchListTmp = watchList.filter(movie => {
            return (movie.id !== id)
        })
        setWatchList([...watchListTmp])
        localStorage.setItem('watchlist', JSON.stringify(watchListTmp))
    }

    function getLocalWatchList() {
        if(watchList.length !== 0) return

        let localWathList = localStorage.getItem('watchlist')
        if (localWathList) localWathList = JSON.parse(localWathList)
        if(localWathList && localWathList.length > 0) {
            setWatchList([...localWathList])
            return
        }
    }

    useEffect(() => {
        getLocalWatchList()
    }, [])

  return ( 
      <AppContext.Provider value={{menuActive, setMenuActive, moviesList, setMoviesList, watchList, setWatchList, addToWatchList, removeToWatchList, searchTerm, setSearchTerm, searchResults, setSearchResults, searchPage, setSearchPage, totalSearchPages, setTotalSearchPages}}>
            <BrowserRouter>
                <div className="app">
                        <Header />
                        <WatchListWidget />
                         <Routes>
                            <Route path="/" element={<Movies />} />
                            <Route path='/genres' element={<GenresPage />} />
                            <Route path='/watchlist' element={<WatchList />} />
                            <Route path="/movie/:id/" element={<MoviePage />} />
                            <Route path="/movies/popular" element={<PopularMovies />} />
                            <Route path="/movies/top-rated" element={<TopRatedMovies />} />
                            <Route path="/movies/playing-now" element={<PlayingNow />} />
                            <Route path="/movies/tranding" element={<TrandingMovies />} />
                            <Route path="/cast/:id/" element={<CastPage />} />
                        </Routes>
                        <ScrollToTop smooth color='rgba(247, 66, 66, 0.8)' top='200' style={{background: 'transparent', border:'2px solid rgba(247, 66, 66, 0.8)', bottom: '20px', right:'5px'}}/>
                        <Footer />                     
                        <Menu items={menuItems}/>
                </div>
            </BrowserRouter>
      </AppContext.Provider> 
  );
  
}
export {AppContext}
export default App;
