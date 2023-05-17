import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import City from "./pages/City/City";
import Favorites from "./pages/FavoritesExplore/Favorites";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Explore from "./pages/FavoritesExplore/Explore"
import Settings from './pages/Settings/Settings';
import Context from "./Context";
import NotFound from "./pages/NotFound/NotFound";
import { useGlobalState} from "./Context";
import Welcome from "./components/Welcome/Welcome";
import { styles } from './utilities/Styling';


function App() {
  const {geoLocationValue: [geoLocation, setGeoLocation]} = useGlobalState()
  
  useEffect(()=>{
    const value = localStorage.getItem('RESA_theme')
    if(!value){
      localStorage.setItem('RESA_theme', 'Dynamic')
      localStorage.setItem('RESA_bgColor', styles.day)
    }
  }, [])
  return (
    <>
        <Nav/>
        <Search />
        <Routes>
          <Route path="/" element={geoLocation===null? <Welcome/> : <Home/>} />
          <Route path="/city" element={<City/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
