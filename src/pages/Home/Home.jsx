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
  const num1=[1,2,3,4]
  const num2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  var value = num1.length + num2.length
  
  const {exploreValue: [exploreList, setExploreList], geoLocationValue:[ geoLocation, setGeoLocation], favoritesValue:[favoritesList, setFavoritesList]} = useGlobalState()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [location, setLocation] = useState(null)
  
  const fetchWeather = async()=>{
    if(geoLocation!=='-1' && geoLocation){
      if(navigator.onLine){
        setIsLoading(true)
        console.log(`this geoLocation==> ${geoLocation}`)
        let res = await CityWeather(geoLocation.coord);
        localStorage.setItem('RESA_location', JSON.stringify(res));
        setLocation({...res});
        console.log('Online-RESA_location')
        console.log(res)
        setIsLoading(false)
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
        let res = await CityWeather(exploreList[randomIndex])
        setLocation({...res})
      }
      else{
        if(navigator.onLine){
          let res = await CityWeather(bothList[randomIndex].coord)
          setLocation({...res})
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
      for (var i = 0; i<exploreList.length; i++){
        let res = await CityWeather(exploreList[i])
        newExploreList.push(res)
      }
    }
    else{
      if(navigator.onLine){
        for (var i =0; i<exploreList.length; i++){
          let res = await CityWeather(exploreList[i].coord)
          newExploreList.push(res)
        }
        for (var j =0; j<favoritesList.length; j++){
          let res2 = await CityWeather(favoritesList[j].coord)
          newFavoritesList.push(res2)
        }
      }
      else{
        newExploreList = sortByCity([...exploreList])
        newFavoritesList = sortByCity([...favoritesList])
      }
    }
    localStorage.setItem('RESA_explore', JSON.stringify(sortByCity(newExploreList)))
    localStorage.setItem('RESA_favorites', JSON.stringify(sortByCity(newFavoritesList)))
    setExploreList(sortByCity([...newExploreList]))
    setFavoritesList(sortByCity([...newFavoritesList]))
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
              : <Info/>
            }
          </>
        }
        </div>

      </div>
    )
}

export default Home