import axios from 'axios'
import { API_URL, API_KEY } from './constants/Constants'
import { checkDay, getDayofWeek } from '../utilities/DateFormatter'


export const CityWeather = (city: string, notes=null) =>(
    axios.get(`${API_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7`)
    .then((res)=>{
        const {location, current, forecast:{forecastday}} =  res.data
        const city_data={
            coord: `${location.lat.toString()},${location.lon.toString()}`,
            name: location.name,
            country: location.country,
            localtime_epoch: location.localtime_epoch,
            isDay: checkDay(location.localtime_epoch),
            temp: Math.round(current.temp_c),
            weather_code: current.condition.code,
            weather_text: current.condition.text.toLowerCase(),
            humidity: current.humidity,
            wind: `${current.wind_dir} ${Math.round(current.wind_kph)}km/h`,
            high_temp: Math.round(forecastday[0].day.maxtemp_c),
            low_temp: Math.round(forecastday[0].day.mintemp_c),
            pressure: current.pressure_mb,
            uv: current.uv,
            feelslike: Math.round(current.feelslike_c),
            visibility: `${Math.round(current.vis_km)}km/h`,
            forecast: forecastday.reduce((acc, item, index)=>{
                if (index>0){
                    const {day} = item
                    acc.push({
                        dayOfWeek: getDayofWeek(item.date_epoch),
                        avg_temp: Math.round(day.avgtemp_c),
                        weather_code: day.condition.code,
                        weather_text: day.condition.text.toLowerCase(),
                        avg_visibility: Math.round(day.avgvis_km),
                        max_wind: `${Math.round(day.maxwind_kph)}km/h`,
                        avg_humidity: Math.round(day.avghumidity),
                        uv: Math.round(day.uv)
                    })
                }
                return acc
            },[])
        }
        if (notes){ return ({...city_data, notes:notes}) }
        else{ return (city_data) }
    })
    )
