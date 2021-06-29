import { format, getDay, parseISO} from 'date-fns';
let selectedStoreHolidays = {}
let filteredHoliday = null

const setSelectedStoreHolidays = (holidayDates) => {
    selectedStoreHolidays = holidayDates
    isTodayHoliday(selectedStoreHolidays)
    
}

//used only for current time, NOT DATE
var todayTime = new Date(2021,5,21,18,0);
// var todayTime = new Date();

var formattedTime = format(todayTime, 'HH:mm')
// var formattedTime = '14:38'


const todayDate = format(new Date(),'yyyy.MM.dd')
// const todayDate = format(new Date(2021,5,20),'yyyy.MM.dd')

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

    const isStoreOpenNow = (openingTimeToday, closingTimeToday)=>{  
    let status = {}
    let nowHour = todayTime.getHours()
    let nowMinute = todayTime.getMinutes() 
    let openingHour = openingTimeToday.substring(0, 2)
    let openingMinute = openingTimeToday.slice(3, 2) //don't use substring here, will break
    let closingHour = closingTimeToday.substring(0, 2)
    let closingMinute = closingTimeToday.slice(3, 2) //don't use substring here, will break
    if (openingMinute == 0){
        openingMinute = 0
    }
    if (closingMinute == 0){ //this is necessary
        closingMinute = 0
    }
    if (nowHour >= openingHour && nowMinute >= openingMinute) {
        status.hasOpened = true
    } else {
        status.hasOpened = false
    }
    if (closingMinute === 0) {
        closingMinute = 60
    }

    if (nowHour < closingHour) {
        status.hasClosed = false        
    } else if(nowHour === closingHour && nowMinute < closingMinute) {
        status.hasClosed = false
    } else {
        status.hasClosed = true
    }

    if (status.hasOpened && !status.hasClosed) {
        status.isOpen = true
    } else {
        status.isOpen = false
    }
    return status
    console.log('status: ', status);
}




export { setSelectedStoreHolidays, isTodayHoliday, filteredHoliday, checkDayOfTheWeek, formattedTime, todayDate, isStoreOpenNow }