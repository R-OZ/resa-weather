import React from 'react'
import fogIcon from '../assets/images/fog.png'
import freezingFogIcon from '../assets/images/freezingFog.png'
import snowIcon from '../assets/images/snow.png'
import lightSnowIcon from '../assets/images/lightSnow.png'
import sunnyIcon from '../assets/images/sunny.png'
import freezingRainIcon from '../assets/images/freezingRain.png'
import clearIcon from '../assets/images/clear.png'
import cloudyIcon from '../assets/images/cloudy.png'
import hmRainIcon from '../assets/images/hmRain.png'
import lightRainIcon from '../assets/images/lightRain.png'
import thunderIcon from '../assets/images/thunder.png'

const fog = new Set(['mist', 'fog'])
const freezingFog = new Set(['freezing fog'])
const snow = new Set(['blowing snow', 'blizzard', 'patchy heavy snow', 'moderate or heavy snow with thunder', 'moderate or heavy sleet', 'moderate or heavy showers of ice pellets', 'moderate snow', 'moderate or heavy snow showers', 'moderate or heavy sleet showers', 'heavy snow', 'patchy moderate snow'])
const lightSnow = new Set(['patchy light snow with thunder', 'patchy light snow', 'light snow showers', 'light snow', 'light showers of ice pellets', 'light sleet', 'light sleet showers', 'ice pellets'])
const sunny = new Set(['sunny'])
const clear = new Set(['clear'])
const freezingRain = new Set(['freezing drizzle', 'heavy freezing drizzle', 'light freezing rain', 'patchy freezing drizzle possible', 'patchy sleet possible', 'patchy snow possible', 'moderate or heavy freezing rain'])
const cloudy = new Set(['cloudy', 'overcast', 'partly cloudy'])
const hmRain = new Set(['heavy rain', 'heavy rain at times', 'moderate rain', 'moderate rain at times', 'moderate or heavy rain shower'])
const lightRain = new Set(['light drizzle', 'light rain', 'patchy light drizzle', 'patchy light rain', 'patchy rain possible', 'light rain shower', 'patchy light rain with thunder'])
const thunder = new Set(['thundery outbreaks possible', 'moderate or heavy rain with thunder', 'torrential rain shower'])

export const IconMapper = (txt) => {
    if(fog.has(txt)){
        return fogIcon
    }
    else if(freezingFog.has(txt)){
        return freezingFogIcon
    }
    else if(snow.has(txt)){
        return snowIcon
    }
    else if(lightSnow.has(txt)){
        return lightSnowIcon
    }
    else if(sunny.has(txt)){
        return sunnyIcon
    }
    else if(clear.has(txt)){
        return clearIcon
    }
    else if(freezingRain.has(txt)){
        return freezingRainIcon
    }
    else if(cloudy.has(txt)){
        return cloudyIcon
    }
    else if(hmRain.has(txt)){
        return hmRainIcon
    }
    else if(lightRain.has(txt)){
        return lightRainIcon
    }
    else if(thunder.has(txt)){
        return thunderIcon
    }
    else{
        return cloudyIcon
    }

}
