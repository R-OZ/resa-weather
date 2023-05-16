import React, { useEffect, useState } from 'react'
import './home.css'
import Info from '../../components/Info/Info'
import List from '../../components/List/List'
import Featured from '../../components/Featured/Featured'
import explore from '../../assets/icons/explore.png'
import favorite from '../../assets/icons/love.png'
import Asleep from '../../assets/aminations/Asleep'
import { useGlobalState } from '../../Context'
import { CityWeather } from '../../api/CityWeather'
import Loading from '../../components/Loading/Loading'
import { sortByCity } from '../../utilities/Sorter'


const Home = ({}) => {
  
  const {exploreValue: [exploreList, setExploreList], geoLocationValue:[ geoLocation, setGeoLocation], favoritesValue:[favoritesList, setFavoritesList]} = useGlobalState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [location, setLocation] = useState(null)
  const [message, setMessage] = useState(null)
  
  const fetchWeather = async()=>{
    if(geoLocation!=='-1' && geoLocation){
      if(navigator.onLine){
        try {
          setIsLoading(true)
          console.log(`this geoLocation==> ${geoLocation}`)
          let res = await CityWeather(geoLocation.coord);
          localStorage.setItem('RESA_location', JSON.stringify(res));
          setLocation({...res});
          console.log('Online-RESA_location')
          console.log(res)
        } 
        catch (error) {
          setMessage(error.message)
          console.log(`ERROR MESSAGE is==> ${error}`)
        }
        finally{
          setIsLoading(false)
        }
      }
      else{
        setLocation({...geoLocation})
        console.log('offline-RESA_location')
        setIsLoading(false)
      }
    }
    else if(favoritesList.length>0 || exploreList.length>0){
      setIsLoading(true)
      console.log('condition2')
      var randomIndex = Math.floor(Math.random()*(exploreList.length+favoritesList.length))
      const bothList = [...exploreList, ...favoritesList]
      if (typeof exploreList[0]== "string"){
        try {
          let res = await CityWeather(exploreList[randomIndex])
          setLocation({...res})
        } 
        catch (error) {
          setMessage(error.message)
        }
      }
      else{
        if(navigator.onLine){
          try {
            let res = await CityWeather(bothList[randomIndex].coord)
            setLocation({...res})  
          } 
          catch (error) {
            setMessage(error.message)
          }
        }
        else{
          setLocation({...bothList[randomIndex]})
        }
      }
      setIsLoading(false)
    }
    else{
      console.log('final condition')
      setIsLoading(false)
      setLocation(null)
    }
  }

  const fetchExploreFavorites= async()=>{
    let newExploreList = []
    let newFavoritesList = []
    setIsLoading2(true)
    if (typeof exploreList[0] === "string"){
      try {
        for (let i = 0; i<exploreList.length; i++){
          let res = await CityWeather(exploreList[i], [])
          newExploreList.push(res)
        }
      } 
      catch (error) {
        setMessage(error.message)
        console.log(`ERROR MESSAGE is==> ${error}`)

      }
    }
    else{
      if(navigator.onLine){
        try {
          for (let i =0; i<exploreList.length; i++){
            let res = await CityWeather(exploreList[i].coord, exploreList[i].notes)
            newExploreList.push(res)
          }
          for (let j =0; j<favoritesList.length; j++){
            let res2 = await CityWeather(favoritesList[j].coord, favoritesList[j].notes)
            newFavoritesList.push(res2)
          }   
        } 
        catch (error) {
          setMessage(error.message)
          console.log(`ERROR MESSAGE is==> ${error}`)
        }
      }
      else{
        newExploreList = [...exploreList]
        newFavoritesList = [...favoritesList]
      }
    }
    newExploreList = sortByCity(newExploreList)
    newFavoritesList = sortByCity(newFavoritesList)
    localStorage.setItem('RESA_explore', JSON.stringify(newExploreList))
    localStorage.setItem('RESA_favorites', JSON.stringify(newFavoritesList))
    setExploreList([...newExploreList])
    setFavoritesList([...newFavoritesList])
    setIsLoading2(false)
  }

  useEffect(()=>{
    fetchWeather();
    fetchExploreFavorites();
  },[])

    return (
      <div className='home'>
        {
          isLoading?
            <Loading />
          :
            <>
            {
              message== null?
                location?
                  <Featured 
                    city={location.name}
                    description={location.weather_text}
                    temperature={location.temp}
                    high={location.high_temp}
                    low={location.low_temp}
                    windSpeed={location.wind}
                    humidty={location.humidity}
                  />
                :
                  <Asleep />
              :
                <h1 style={{textAlign:"center", color:'red', marginTop: '20px'}}>{message}</h1>
            }
          </>
        }

        <div className="home-body">
        {
          isLoading2?
            <Loading/>
          : 
          <>
            {
              message== null?
                location?
                  <>
                  {
                    favoritesList.length>0? 
                      <List id="favorites" cities={[...favoritesList]} /> 
                  : null
                  }
                  
                  {
                    exploreList.length>0? 
                      <List id="explore" cities={[...exploreList]} /> 
                  : null
                  }
                  </>
                : isLoading? <Loading/>: <Info/>
              :
                <h2 style={{textAlign:"center", color:'red', marginTop: '20px'}}>{message}</h2>
            }
          </>
        }
        </div>

      </div>
    )
}

export default Home