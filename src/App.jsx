import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import City from "./pages/City/City";
import Favorites from "./pages/FavoritesExplore/Favorites";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import Explore from "./pages/FavoritesExplore/Explore"
import Context from "./Context";
import Welcome from "./pages/Welcome/Welcome";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  return (
    <>
      <Context>
        <Nav/>
        <Search />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/city/:cityName" element={<City/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/welcome" element={<Welcome/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Context>
    </>
  );
}

export default App;
