
//fuction to return date in format: Mon Tue...
export const getDayofWeek = (epochTime) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(epochTime * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}

//function to return boolean of day or night, to edit background theme
export const checkDay = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const hour = date.getUTCHours();
    
    // Determine whether the hour is earlier than 6:00 PM UTC
    const isLater = hour <= 18;
    return isLater;
}
