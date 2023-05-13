import { API_URL, API_KEY } from "./constants/Constants";
import React from 'react'
import axios from 'axios'

export const SearchCity = (search_text: string) => (
    axios.get(`${API_URL}/search.json?key=${API_KEY}&q=${search_text}`)
    .then((res)=>{
        const {data} = res
        const cities = res.data.reduce((acc, item, index)=>{
            acc.push({
                coord: `${item.lat.toString()},${item.lon.toString()}`,
                name: item.name,
                country: item.country,
            })
            return acc
        },[])

        return [...cities]
    })
    .catch((err)=>{
        console.error(err)
    })
)
