
let selectedStoreHolidays = {}
let filteredHoliday = null



const now = new Date()
// now.setMonth(7)
// const now = new Date(2021,6,3,17,49,59)

const formatCurrentTime =()=>{
    let nowTime = new Date()
    let nowHour = nowTime.getHours(nowTime)
    let nowMinutes = nowTime.getMinutes(nowTime)
    let nowSeconds = nowTime.getSeconds(nowTime)
    return `${nowHour}:${nowMinutes}:${nowSeconds}`
}

const formattedCurrentTime = formatCurrentTime()

const nowYear = now.getFullYear(now)
const nowMonth = now.getMonth(now)
const nowDate = now.getDate(now)
const nowMonthText = now.toLocaleString("default", { month: "long" })
const nowWeekday = now.toLocaleString("default", { weekday: "short" })

const todayDateForHolidayCheck = `${nowYear}.${nowMonth + 1}.${nowDate}`
const todayDateForDisplay = `${nowWeekday}, ${nowMonthText} ${nowDate}`
const setSelectedStoreHolidays = (holidayDates) => {
    selectedStoreHolidays = holidayDates
    isTodayHoliday(selectedStoreHolidays)    
}

const isTodayHoliday = (selectedStoreHolidays) => {    
    const todayAsArray = todayDateForHolidayCheck.split('.')
    const convertedToday = `${todayAsArray[0]}-${todayAsArray[1]}-${todayAsArray[2]}`

    function isTodayHoliday (selectedStoreHolidays) {
        return selectedStoreHolidays.date === convertedToday
    }

    filteredHoliday = selectedStoreHolidays.filter(isTodayHoliday)
    if (filteredHoliday.length === 0) {
        filteredHoliday = null
    } 
}

const checkDayOfTheWeek = function (){
    let dayOfTheWeek = now.getDay(now)
    
    //Note JS uses 0 to represent sunday, vinmonpolet uses 0 to represent monday
    //the code below is just adjusting that
    let convertedDayOfTheWeek 

    if (dayOfTheWeek >= 1) {
        convertedDayOfTheWeek = dayOfTheWeek -= 1
    } else {
        convertedDayOfTheWeek = 6
     }
    return convertedDayOfTheWeek    
}

 const isStoreOpenNow = (openingTimeToday, closingTimeToday)=>{  

    //////////////////////////////////////
    //leave this section for testing........ 
    //used to fake an updated now
     let now2 = new Date()
    //  console.log('now2: ', now2);
    ///////////////////////
    //try this may have to coordinate this fake now with the now above
    // let now2 = new Date(now.valueOf())
    // let now2 = new Date(2021,6,2,17,49,59)
    /////////////////////
    setInterval(function() {
        return now2 = new Date()
    }, 1000)
    ////////////////////////
    let status = {}

    const convertedOpeningTime = convertTimeStringToProperDate(openingTimeToday)

    //////////////////////////////////
    // const convertedClosingTime = convertTimeStringToProperDate(closingTimeToday)
    const convertedClosingTime = temporaryConvertTimeStringToProperDate(closingTimeToday)
    ///you are using temporaryconverblabla to fake closing time; was messing up the opeing tiem
 
    ///////////////////////////
    if (now2 >= convertedOpeningTime) {
        status.hasOpened = true
    }  else {
        status.hasOpened = false
    }

    if (now2 < convertedClosingTime) {
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
    
}

const convertTimeStringToProperDate =(timeString)=> {
    //used to take the string opening/closing times ie('12:35') and put them into a js date object, so the countdown timer has proper js dates
    let timeToArray = timeString.split(':')

    let hour = timeToArray[0]
    let minute = timeToArray[1]

    const convertedTime = new Date(now.valueOf()) //THis prevents pointing to the now ..deep copy

    convertedTime.setHours(hour)
    convertedTime.setMinutes(minute)
    convertedTime.setSeconds(0)
    // convertedTime.setHours(15)
    // convertedTime.setMinutes(58)
    // convertedTime.setSeconds(0)

    return convertedTime
    
}

const temporaryConvertTimeStringToProperDate =(timeString)=> {
    //used to take the string opening/closing times ie('11:30) and put them into a js date object, so the countdown timer has proper js dates
    let timeToArray = timeString.split(':')

    let hour = timeToArray[0]
    let minute = timeToArray[1]

    const convertedTime = new Date(now.valueOf()) //THis prevents pointing to the now ..deep copy

    convertedTime.setHours(hour)
    convertedTime.setMinutes(minute)
    convertedTime.setSeconds(0)
    // convertedTime.setHours(15)
    // convertedTime.setMinutes(58)
    // convertedTime.setSeconds(0)

    return convertedTime
    
}

const getCountDownTimeRemaining =(closingTimeConverted)=> {
    const constantlyChangingNow = new Date()

    const timeLeft = {}
    const timeuntilclosing = closingTimeConverted - constantlyChangingNow
    
    timeLeft.hours = Math.floor((timeuntilclosing % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    timeLeft.minutes = Math.floor((timeuntilclosing % (1000 * 60 * 60)) / (1000 * 60))
    timeLeft.seconds = Math.floor((timeuntilclosing % (1000 * 60)) / 1000)
    timeLeft.hours - timeLeft.minutes - timeLeft.seconds
 
    return timeLeft
 

}

export { setSelectedStoreHolidays, isTodayHoliday, filteredHoliday, checkDayOfTheWeek, formattedCurrentTime, todayDateForDisplay, isStoreOpenNow, getCountDownTimeRemaining, convertTimeStringToProperDate, formatCurrentTime }