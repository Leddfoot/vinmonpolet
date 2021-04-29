import { format, getDay, parseISO } from 'date-fns';
let selectedStoreHolidays = {}
let filteredHoliday = null

const setSelectedStoreHolidays = (holidayDates) => {
    selectedStoreHolidays = holidayDates
    isTodayHoliday(selectedStoreHolidays)
    
}

//used only for current time, NOT DATE
var todayTime = new Date();
var time = todayTime.getHours() + ":" + todayTime.getMinutes() + ":" + todayTime.getSeconds();
// console.log(time)

// const today =format(new Date(),'yyyy.MM.dd');
// console.log(today);

const today =format(new Date('2021','4', '17'),'yyyy.MM.dd');

const todayAsArray = today.split('.')
const convertedToday = `${todayAsArray[0]}-${todayAsArray[1]}-${todayAsArray[2]}`
console.log(convertedToday);

const isTodayHoliday = (selectedStoreHolidays) => {
 

    function isTodayHoliday (selectedStoreHolidays) {
        return selectedStoreHolidays.date === convertedToday
      }

    filteredHoliday = selectedStoreHolidays.filter(isTodayHoliday)
    if (filteredHoliday.length === 0) {
        filteredHoliday = null
    } 
}

const checkDayOfTheWeek = function (){

    let dayOfTheWeek = getDay(parseISO(convertedToday))
   
    //Note date fns uses 0 to represent sunday, vinmonpolet uses 0 to represent monday
    //the code below is just adjusting that
    let convertedDayOfTheWeek = 0
    if (dayOfTheWeek >= 1) {
        convertedDayOfTheWeek = dayOfTheWeek -= 1
    } else {
        convertedDayOfTheWeek = 6
    }

    return convertedDayOfTheWeek
}





export { setSelectedStoreHolidays, isTodayHoliday, filteredHoliday, checkDayOfTheWeek }