import React, {useState, useRef, useEffect} from 'react'
import './search.css'
import {useLocation} from 'react-router-dom'
import search from '../../assets/icons/search2.png'
import location from '../../assets/icons/location.png'
import Loading from '../Loading/Loading'
import { useGlobalState } from '../../Context'

const Search = () => {
  const [isSearching, setIsSearching] = useState(false)
  const {searchValue} = useGlobalState()
  const [searchText, setSearchText] = searchValue
  const [isLoading, setIsLoading] = useState(true)
  const searchRef = useRef()
  const pageURL = useLocation();
  var isOnFavoritesPage = pageURL.pathname==='/favorites'

  const fetch = (e)=>{
    setTimeout(() => setIsLoading(!isLoading), 2000);
    setSearchText(e.target.value)
    if (searchText && window.innerWidth < 1024){
      document.body.style.overflow = 'hidden';
    }
  }

  const handleScroll =()=>{
    searchRef.current.blur();
  }
  
  const clearSearch =()=>{
    searchRef.current.value=""
    setSearchText("")
  }

  const arr = [1,2,3,4,5,6]
  
  return (
    <>
      <div className='search-container'>
        <img id='search-icon' src={search}/>
        <input type="text" 
          ref={searchRef} 
          onChange={(e)=>fetch(e)} 
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
              arr.map((item,idx)=>(
                <p key={idx} className="search-results-item" style={{borderBottom: idx==arr.length-1? '0px': '' }}>
                  Ikoyi, Lagos State, Nigeria
                </p>
              ))
          }
          
        </div>
      </div>
    </>
  )
}

export default Search