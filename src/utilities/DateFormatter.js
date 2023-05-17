
//fuction to return date in format: Mon Tue...
export const getDayofWeek = (epochTime) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(epochTime * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}


//function to return boolean of day or night, to edit background theme
export const checkDay =(timetxt)=>{
    let time = timetxt.split(" ")[1]
    time = time.split(":")[0]
    //return isDay if less than 6pm
    const isDay = parseInt(time)< 18;
    return isDay
}
