import React,{useState, useContext, createContext} from 'react'
import { styles } from './utilities/Styling'

const GlobalState = createContext()

export function useGlobalState(){
    return useContext(GlobalState)
}

const largestCities =['35.69,139.69','28.67, 77.22','31.01,121.41','23.72,90.41','-23.53,-46.62','19.43,-99.13','30.05,31.25','39.93,116.39','mumbai india','34.69,135.5','29.56,106.55','24.87,67.05','-4.3,15.3','6.45,3.4','41.02,28.96',]
const Context = ({children}) => {
    const [searchText, setSearchText] = useState('')
    const [theme, setTheme] = useState(localStorage.getItem('RESA_theme')??'Dynamic')
    const [bgColor, setBgColor] = useState(localStorage.getItem('RESA_bgColor')??styles.day)
    const [favoritesList, setFavoritesList] = useState(JSON.parse(localStorage.getItem('RESA_favorites'))??[])
    const [exploreList, setExploreList] = useState(JSON.parse(localStorage.getItem('RESA_explore'))??largestCities)
    const [userWindowWidth, setUserWindowWidth] = useState(window.innerWidth)
    const [currentCity, setCurrentCity] = useState(JSON.parse(localStorage.getItem('RESA_currentCity'))?? null)
    const [globalLoading, setGlobalLoading] = useState(false)
    const [geoLocation, setGeoLocation] = useState(() => {
      const storedLocation = localStorage.getItem('RESA_location');
      return storedLocation === "-1" ? storedLocation : (storedLocation ? JSON.parse(storedLocation) : null);
    });    
    

    
  return (
    <GlobalState.Provider 
      value={{
          searchValue:[searchText, setSearchText],
          themeValue:[theme, setTheme],
          bgColorValue: [bgColor, setBgColor],
          favoritesValue: [favoritesList, setFavoritesList],
          exploreValue: [exploreList, setExploreList],
          currentCityValue: [currentCity, setCurrentCity],
          globalLoadingValue: [globalLoading, setGlobalLoading],
          windowWidthValue: userWindowWidth,
          geoLocationValue: [geoLocation, setGeoLocation],
    }}>
        {children}
    </GlobalState.Provider>
  )
}

export default Context