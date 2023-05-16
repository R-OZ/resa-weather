import React, {useState, useRef, useEffect} from 'react'
import './search.css'
import {useLocation, useNavigate} from 'react-router-dom'
import search from '../../assets/icons/search2.png'
import location from '../../assets/icons/location.png'
import Loading from '../Loading/Loading'
import { useGlobalState } from '../../Context'
import { SearchCity } from '../../api/SearchCity'
import { CityWeather } from '../../api/CityWeather'
import { sortByCity } from '../../utilities/Sorter'
import _ from 'lodash'

const Search = () => {
  //when searching, make sure before you go to a city page, check if that city is in favorites, then go to the city so it can show its notes
  const {searchValue:[searchText,setSearchText], globalLoadingValue:[globalLoading, setGlobalLoading], favoritesValue:[favoritesList, setFavoritesList], currentCityValue:[currentCity, setCurrentCity], exploreValue:[exploreList, setExploreList]} = useGlobalState()
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const browse = useNavigate()
  const searchRef = useRef()
  const pageURL = useLocation();
  var isOnFavoritesPage = pageURL.pathname==='/favorites'

  const fetchCities = async(txt)=>{
    setSearchText(txt)
    if (searchText && window.innerWidth < 1024){
      document.body.style.overflow = 'hidden';
    }
    setIsLoading(true)
    if(txt){
      try {
        let res = await SearchCity(txt)
        setSearchResults([...res])
        console.log([...res])
      } catch (error) {
        setErrorMessage(error.message)
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    }
  }
  
  const clearSearch =()=>{
    searchRef.current.value=""
    setSearchText("")
  }

  const handleClick = async(obj)=>{
    if(isOnFavoritesPage){
      clearSearch();
      setGlobalLoading(true)
      // check if the city already exists in favorites list or the explore list
      const existingFavIndex = favoritesList.findIndex(item => (item.name==obj.name && item.country==obj.country))
      const existingExpIndex = exploreList.findIndex(item =>  (item.name==obj.name && item.country==obj.country))
      if(existingFavIndex === -1 && existingExpIndex === -1){
        //if city does not exist in both lists, then add the new city
        try {
          let res = await CityWeather(obj.coord)
          let newObj = {...res, notes:[]}
          setFavoritesList((prevList)=>{
            let newList = [...prevList]
            newList.push(newObj)
            localStorage.setItem('RESA_favorites', JSON.stringify(sortByCity(newList)))
            return sortByCity(newList)
            console.log('city is entirely new')
          })
        } catch (error) {
          console.log(error.message)
        }
      }
      else if(existingFavIndex === -1 && existingExpIndex !==-1){
        //city exists in the explore list already
        let existingCity = _.cloneDeep(exploreList[existingExpIndex])
        //remove it from explore
        setExploreList((prevList)=>{
          let newList = [...prevList]
          newList.splice(existingExpIndex,1)
          localStorage.setItem('RESA_explore', JSON.stringify(newList))
          return newList
        })
        //put it in favorites
        let updatedExistingCity = {...existingCity}
        setFavoritesList((prevList)=>{
          let newList = [...prevList]
          newList.push(updatedExistingCity)
          localStorage.setItem('RESA_favorites', JSON.stringify(sortByCity(newList)))
          return sortByCity(newList)
        })
        console.log('city existed in explore')

      }
      else{
        console.log('CITY already exits in favorites')
      }
      setGlobalLoading(false)
    }
    else{
      //go to city page instead
      clearSearch()
      setGlobalLoading(true)
      browse('/city')
      //check if the city already exists in favorites list (so that user will have access to their notes)
      const existingFavIndex = favoritesList.findIndex(item => (item.name===obj.name && item.country===obj.country))
      const existingExpIndex = exploreList.findIndex(item => (item.name===obj.name && item.country===obj.country) )
      if(existingFavIndex !== -1){
        setCurrentCity(favoritesList[existingFavIndex])
        localStorage.setItem('RESA_currentCity', JSON.stringify(favoritesList[existingFavIndex]))
        setGlobalLoading(false)
      }
      else if(existingExpIndex !==-1){
        setCurrentCity(exploreList[existingExpIndex])
        localStorage.setItem('RESA_currentCity', JSON.stringify(exploreList[existingExpIndex]))
        setGlobalLoading(false)
      }
      else{
        try {
          let res = await CityWeather(obj.coord)
          setCurrentCity(res)
          localStorage.setItem('RESA_currentCity', JSON.stringify(res)) 
          setGlobalLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  const handleScroll =()=>{
    searchRef.current.blur();
  }
  
    
  return (
    <>
      <div className='search-container'>
        <img id='search-icon' src={search}/>
        <input type="text" 
          ref={searchRef} 
          onChange={(e)=>fetchCities(e.target.value)} 
          id='search-text' 
          placeholder={isOnFavoritesPage? 'Search to add a city' : 'Search for a city'} 
        />
      </div>
      
      <div className={`search-results-container ${searchText? 'show' : ''}`}>
        <p id="search-results-cancel" onClick={clearSearch}>Cancel</p>
        <div onScroll={handleScroll} className="search-results">
          {
            isLoading?
              <Loading />
            :
              errorMessage ===null?
                searchResults?.map((item,idx)=>(
                  <p key={idx} onClick={()=>handleClick(item)} className="search-results-item" style={{borderBottom: idx==searchResults?.length-1? '0px': '' }}>
                  <span style={{fontWeight: 500}}>{item.name}</span>, {item.country}
                  </p>
                ))
              :
                  <p style={{fontWeight:"600",color:'red', fontSize:'18px', marginBottom:'10px'}}>{errorMessage}</p>
              
          }
          
        </div>
      </div>
    </>
  )
}

export default Search