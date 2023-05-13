import React, { useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import City from "./pages/City/City";
import Favorites from "./pages/FavoritesExplore/Favorites";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Explore from "./pages/FavoritesExplore/Explore"
import Context from "./Context";
import NotFound from "./pages/NotFound/NotFound";
import { useGlobalState } from "./Context";
import Welcome from "./components/Welcome/Welcome";


function App() {
  const {geoLocationValue: [geoLocation, setGeoLocation]} = useGlobalState()
  return (
    <>
        <Nav/>
        <Search />
        <Routes>
          <Route path="/" element={geoLocation===null? <Welcome/> : <Home/>} />
          <Route path="/city" element={<City/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </>
  );
}

export default App;
