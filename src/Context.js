import React,{useState, useContext, createContext} from 'react'

const GlobalState = createContext()

export function useGlobalState(){
    return useContext(GlobalState)
}


const largestCities=['35.6762,139.6503','28.67,77.22','31.2304,121.4737','23.72,90.41','-23.5558,-46.6396','19.4326,-99.1332','30.0444,31.2357','39.9042,116.4074','19.0760,72.8777','34.6937,135.5023','29.5657,106.5512','24.8607,67.0011','-4.3033,15.3105','6.5244,3.3792','41.0082,28.9784']
const Context = ({children}) => {
    const [searchText, setSearchText] = useState('')
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