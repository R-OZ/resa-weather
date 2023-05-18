import React, { useEffect, useState } from 'react'
import './home.css'
import Info from '../../components/Info/Info'
import List from '../../components/List/List'
import Featured from '../../components/Featured/Featured'
import Asleep from '../../assets/aminations/Asleep'
import { useGlobalState } from '../../Context'
import { CityWeather } from '../../api/CityWeather'
import Loading from '../../components/Loading/Loading'
import { sortByCity } from '../../utilities/Sorter'
import { styles } from '../../utilities/Styling'


const Home = () => {
  
  const {
      exploreValue: [exploreList, setExploreList], 
      themeValue:[theme, setTheme], 
      bgColorValue:[bgColor,setBgColor],
      geoLocationValue:[ geoLocation], 
      favoritesValue:[favoritesList, setFavoritesList]} = useGlobalState()
  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [location, setLocation] = useState(null)
  const [message, setMessage] = useState(null)
  const [isDay, setIsDay] = useState(null)
  
  function setBackgroundTheme(value){
    if(theme==='Dynamic'){
      if(value==true){
        setBgColor(styles.day)
        localStorage.setItem('RESA_bgColor', styles.day)
        setIsDay(true)
      }
      else{
        setBgColor(styles.night)
        localStorage.setItem('RESA_bgColor', styles.night)
        setIsDay(false)
      }
    }
    else if(theme==='Day'){
      setBgColor(styles.day)
      localStorage.setItem('RESA_bgColor', styles.day)
      setIsDay(false)
    }
    else{
      setBgColor(styles.night)
      localStorage.setItem('RESA_bgColor', styles.night)
      setIsDay(false)
    }
  }

  const fetchWeather = async()=>{
    //if the user gave permission
    if(geoLocation!=='-1' && geoLocation){
      if(navigator.onLine){
          let newGeoLocation = null
          setIsLoading(true)
          navigator.geolocation.getCurrentPosition(
            position =>{
              console.log(`this geoLocation==> ${geoLocation}`);
              CityWeather(`${position.coords.latitude.toString()},${position.coords.longitude.toString()}`)
                .then(res=>{
                  localStorage.setItem('RESA_location', JSON.stringify(res));
                  setLocation({...res})
                  setBackgroundTheme(res.isDay)
                  console.log('Online-RESA_location')
                  console.log(res)
                  console.log('new location updated!')
                  setIsLoading(false)
                })
                .catch(error =>{
                  console.log(error)
                  setMessage(error.message)
                  setIsLoading(false)
                })
            },
            error =>{
              console.log('Unable to get new location')
              setLocation(geoLocation)
            },
            {enableHighAccuracy: true}
          )
        }
      else{
        setLocation({...geoLocation})
        setBackgroundTheme(geoLocation.isDay)
        console.log('offline-RESA_location')
        setIsLoading(false)
      }
    }
    //if the user didn't randomly pick from list
    else if(favoritesList.length>0 || exploreList.length>0){
      setIsLoading(true)
      console.log('condition2')
      var randomIndex = Math.floor(Math.random()*(exploreList.length+favoritesList.length))
      const bothList = [...exploreList, ...favoritesList]
      if (typeof exploreList[0]== "string"){
        try {
          let res = await CityWeather(exploreList[randomIndex])
          setLocation({...res})
          setBackgroundTheme(res.isDay)
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
            setBackgroundTheme(res.isDay)
          } 
          catch (error) {
            setMessage(error.message)
          }
        }
        else{
          setLocation({...bothList[randomIndex]})
          setBackgroundTheme(bothList[randomIndex].isDay)
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
      <div className='home' style={{background:bgColor, color: bgColor===styles.day? 'black':'white'}}>
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
                  <Asleep theme={bgColor} />
              :
                <h1 style={{textAlign:"center", color:'red', marginTop: '20px'}}>{message}</h1>
            }
          </>
        }

        <div className="home-body" >
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