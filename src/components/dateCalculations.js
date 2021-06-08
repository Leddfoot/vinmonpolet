import { format, getDay, parseISO } from 'date-fns';
let selectedStoreHolidays = {}
let filteredHoliday = null

const setSelectedStoreHolidays = (holidayDates) => {
    selectedStoreHolidays = holidayDates
    isTodayHoliday(selectedStoreHolidays)
    
}

//used only for current time, NOT DATE
var todayTime = new Date();
var time = todayTime.getHours() + ":" + todayTime.getMinutes() 
var formattedTime = format(todayTime, 'HH:mm')


const todayDate =format(new Date(),'yyyy.MM.dd');
// const todayDate =format(new Date('2021','4', '17'),'yyyy.MM.dd');
const formattedDate = format(new Date(), 'MM-dd-yyyy')
console.log(formattedDate);



const todayAsArray = todayDate.split('.')
const convertedToday = `${todayAsArray[0]}-${todayAsArray[1]}-${todayAsArray[2]}`

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





export { setSelectedStoreHolidays, isTodayHoliday, filteredHoliday, checkDayOfTheWeek, formattedTime, formattedDate }