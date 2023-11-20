const foodTrucks = require('./foodtruckdata.json');
const haversine = require('haversine-distance');


const DAYS_OF_WEEK = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function convertTimeStringToMinutes(timeStr) {
    /* Converts given time into its time in minutes 
        ex. 7AM --> 420
    */
    let hour =  parseInt(timeStr.slice(0, -2));
    if (timeStr.slice(-2) == "AM" && hour == 12) {
        hour = 0;
    }
    if (timeStr.slice(-2) == "PM" && hour != 12) {
        hour += 12;
    }
    return hour * 60;
}


function checkHours (ranges, currentTime) {
    /* 
        Given a string with list of time ranges, returns if current time is within one of the ranges
        param: ranges is in the format of 7AM-8AM/10AM-11AM
    */
    const groups = ranges.split("/");
    for (let g of groups) {
        const times = g.split("-");
        const startTime = convertTimeStringToMinutes(times[0])
        const endTime = convertTimeStringToMinutes(times[1])
        if (currentTime > startTime && currentTime < endTime) {
            return true
        }
    }
    return false
}

function checkFoodTruckOpen (ranges, currentDay, currentDate) {
    /*
        Given a string with list of date and time ranges, returns true if current day and time is within one fo the ranges 
        param: ranges is in the format Mo-We/Fr/Sa:7AM-7PM
    */
    for (let r of ranges){
        const truckDaysHours = r.split(":");
        const groups = truckDaysHours[0].split("/");

        for (let g of groups) {
            if (g == currentDay) {
                if (checkHours(truckDaysHours[1], currentDate)) {
                    return true
                }
            }
            const dayRange = g.split("-");
            let i = DAYS_OF_WEEK.indexOf(g[0])
            while (i <= DAYS_OF_WEEK.indexOf(g[1])) {
                if (DAYS_OF_WEEK[i] == currentDay) {
                    if (checkHours(truckDaysHours[1], currentDate)) {
                        return true
                    }
                }
                i++;
            }
        }
    }
    return false
}

const METERS_TO_MILES_DIVIDER = 1609.34;

function listFoodTrucks (latitude, longitude) {
    /* 
        Given a current latitude and longitude, find food trucks that are: 
        1) Currently open 
        2) Within 5 miles 
    */
    const DISTANCE_AWAY_MILES = 5;
    const TOTAL_TRUCKS_TO_FIND = 3;
    let validFoodTrucks = []
    let i = 0

    while (validFoodTrucks.length < TOTAL_TRUCKS_TO_FIND) {
        const foodTruck = foodTrucks[i]
        if (foodTruck?.dayshours) {

            const truckDaysHours = foodTruck.dayshours.split(";");

            const now = new Date();
            const currentDayOfWeek = DAYS_OF_WEEK[now.getDay()];
            const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

            if (checkFoodTruckOpen(truckDaysHours, currentDayOfWeek, currentTimeInMinutes)){
                const userlocation =  { latitude: latitude, longitude: longitude }
                const truckLocation = { latitude: foodTruck.latitude, longitude: foodTruck.longitude }

                const distanceMiles = haversine(userlocation, truckLocation) / METERS_TO_MILES_DIVIDER;
                if (distanceMiles < DISTANCE_AWAY_MILES) {
                    validFoodTrucks.push({
                        "id": foodTruck.objectid,
                        "name": foodTruck.applicant,
                        "address": foodTruck.address,
                        "fooditems": foodTruck.fooditems,
                        "dayshours": foodTruck.dayshours,
                        "distanceAway": distanceMiles,
                    })
                }
            }
        }
        i++;
    }

    return validFoodTrucks
}


module.exports = { listFoodTrucks };