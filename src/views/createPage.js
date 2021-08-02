import { setSelectedStoreHolidays, filteredHoliday, todayDateForDisplay, generateStoreOpenStatus, convertTimeStringToProperDate, formatCurrentTime, getTodayNumericConvertedToVinmonpolet } from 'components/dateCalculations'
import { preferredStore } from '../components/preferenceStorage'
import { checkForMultipleSearchTerms, getNext10OrFewerResults, setDisplayingHomeStore, getDisplayingHomestore, createSearchEventHandler, getStoreOpenStatus } from '../index'
import { generateClock } from '../components/clock'
const pageMainElement = document.querySelector('main')
let displayingIndividualStore = false

const generateHeaderDOM = () => {
    const headerElement = document.createElement('header')
    const pageTitleElement = document.createElement('span')
    pageTitleElement.textContent = 'OH SH!T is my vinmonopolet open?&!*?'
    headerElement.appendChild(pageTitleElement)

    return headerElement        
}

const generateClockDom=()=>{
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.setAttribute('width', '130')
    canvas.setAttribute('height', '130')
    canvas.setAttribute('aria-label', 'clock with current time')
    canvas.setAttribute('style','background-color:#777')
    generateClock(canvas)
    return canvas
}

const renderClockDom =()=> {
    const clock = generateClockDom()
    pageMainElement.appendChild(clock)
}

const renderHeader =() => {
    const headerElement = generateHeaderDOM()
    pageMainElement.appendChild(headerElement)
}

const generateTimeAndDateDOM =()=> {
    const timeAndDateElement = document.createElement('span')
    timeAndDateElement.setAttribute('id', 'time-and-date-element')
    const timeElement = document.createElement('p')
    const dateElement = document.createElement('p')
    
    dateElement.textContent = todayDateForDisplay

    timeAndDateElement.appendChild(timeElement)
    timeAndDateElement.appendChild(dateElement)
 
    setInterval(function() {
        const nowClock = formatCurrentTime()
        timeElement.textContent = nowClock        
    }, 1000) 

    return timeAndDateElement
}

const renderTimeAndDate =() => {
    const timeAndDateElement = generateTimeAndDateDOM()
    pageMainElement.appendChild(timeAndDateElement)
}

const generateSearchInputDOM =()=> {    
    const searchInputForm = document.createElement('form')
    searchInputForm.setAttribute('id', 'main-search-form')
    const searchInputElement = document.createElement('input')
    searchInputElement.setAttribute('id', 'main-search-input')
    searchInputElement.setAttribute('placeholder', 'Enter a city, store name, or postal code')
    searchInputElement.setAttribute('name', 'searchTerm')
    const searchButtonElement = document.createElement('button')
    searchButtonElement.textContent = 'Search'
    searchInputForm.appendChild(searchInputElement)
    searchInputForm.appendChild(searchButtonElement)

    return searchInputForm
}

const renderSearchElement =()=> {
    const searchInputForm = generateSearchInputDOM()    
    pageMainElement.appendChild(searchInputForm)
}

const generateStoreDOM = (store) => {
    const storeInfo = {...store}
    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('p')    
    storeTextElement.textContent = `${storeInfo.storeName} is located at ${storeInfo.address.street}, ${storeInfo.address.postalCode} ${storeInfo.address.city}`        
    storeElement.appendChild(storeTextElement)
    
    return storeElement
}

const generateStorehoursHolidayDOM = () => {
    const holidayHoursElement = document.createElement('span')
    const holidayStatusTextElement = document.createElement('p')
    const holidayOpenHours = document.createElement('p')
    if (filteredHoliday[0].openingTime === undefined) {
        holidayStatusTextElement.textContent = `The E-Lager is not open to the public`
    }
    if (filteredHoliday[0].openingTime === "") {
        holidayStatusTextElement.textContent = `This store is closed all day due to: ${filteredHoliday[0].message}`
    } else {
        holidayStatusTextElement.textContent = `This store is open for limited hours on this daydue to: ${filteredHoliday[0].message}`
        holidayOpenHours.textContent = `This store will be open from ${filteredHoliday[0].openingTime} until ${filteredHoliday[0].closingTime}`
    }

    holidayHoursElement.appendChild(holidayStatusTextElement)
    holidayHoursElement.appendChild(holidayOpenHours)
     
    return holidayHoursElement
}

const generateStoreOpeningHoursDOM=(openingHoursText)=>{
    let openingHoursElement = document.createElement('span')
    openingHoursElement.setAttribute('id', 'opening-hours-element')
    openingHoursElement.textContent = openingHoursText
    return openingHoursElement
}

const generateStoreOpeningHoursText = (storeStatus, store) => {
    const selectedStore = store[0]
    let openingHoursElement = document.getElementById('opening-hours-element')
    const todayIntegerConverted = getTodayNumericConvertedToVinmonpolet()
    const closesTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].closingTime    
    const opensTodayAt = selectedStore.openingHours.regularHours[todayIntegerConverted].openingTime

    if (openingHoursElement !== null) {openingHoursElement.parentElement.removeChild(openingHoursElement)}

    if (selectedStore.storeId === '801'){
        const openingHoursText = 'The E lager is not open to the public'
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)        
        renderStoreOpeningHours(openingHoursElement, store)        
        return
    }
    if (storeStatus.closedAllDay === true){
        const openingHoursText = 'The store is closed all day Today'
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)        
        renderStoreOpeningHours(openingHoursElement, store)
        return
    }
    if(storeStatus.hasClosed === true) { 
        const openingHoursText = `This store has already closed today at ${closesTodayAt}`
        const todayNumericVinmonopolet = getTodayNumericConvertedToVinmonpolet()
        let thisDayHasBeenChecked = true
        let doNotMakeButtonsNow = true
        let displayingHomeStore = getDisplayingHomestore()
        let contentHolder = document.getElementById('content-holder')

        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement, store, doNotMakeButtonsNow)
        findNextOpenDay(store, todayNumericVinmonopolet, thisDayHasBeenChecked)
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
        return
    }
    if(storeStatus.hasOpened === false) {
        const openingHoursText = `This store will open today at ${opensTodayAt} and closes at ${closesTodayAt}`
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
        renderStoreOpeningHours(openingHoursElement, store)            
        return
    }
    const openingHoursText = `This store is currently open. `
    openingHoursElement = generateStoreOpeningHoursDOM(openingHoursText)
    renderStoreOpeningHours(openingHoursElement, store)


}

const renderStoreOpeningHours =(openingHoursElement, store, doNotMakeButtonsNow)=> {
    removeDomElements('opening-hours-element')
    let displayingHomeStore = getDisplayingHomestore()
    let contentHolder = document.getElementById('content-holder')
    contentHolder.appendChild(openingHoursElement)
    if (!doNotMakeButtonsNow) {
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
    }
}

const makeCurrentlyDisplayedStorePersisent = (store)=>{
    let temporaryStorage = window.sessionStorage
    temporaryStorage.setItem('currentlySelectedStore', JSON.stringify(store))   
}

const renderStoreAddress = (store) => { 
    
    if (store[0].storeId === '801') {
        renderNoStoresFound()
        return
    }

    if (store[0].storeId === '122' && store[0].status === 'Temporarily closed') { //This can removed after the store reopens, but will work when it does
        renderNoStoresFound()
        return
    }
    
    displayingIndividualStore = true
    let displayingHomeStore = getDisplayingHomestore()
    makeCurrentlyDisplayedStorePersisent(store)

    let temporaryStorage = window.sessionStorage
    let storeInfoArray = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
    let storeInfo = storeInfoArray[0]
    removeDomElements()
    removeDomElements('search-form')

    let contentHolder = document.createElement('span')
    contentHolder.setAttribute('id', 'content-holder')

    const storeElement = generateStoreDOM(storeInfo)

    pageMainElement.appendChild(contentHolder)
    contentHolder.appendChild(storeElement)  
    // console.log('store: ', store);
    
    const holidays = storeInfo.openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)

    if (filteredHoliday !== null ) {           
        const holidayHoursElement = generateStorehoursHolidayDOM()
        contentHolder.appendChild(holidayHoursElement) 
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
    } else {
        const storeStatus = generateStoreOpenStatus(store)
        generateStoreOpeningHoursText(storeStatus, store)
    }

}

const decideAndRenderButtons =(displayingHomeStore, contentHolder)=> {
     if (displayingHomeStore === false) {
        let homeStoreButton = renderHomeStoreButton()
        let searchAgainButton = renderSearchAgainButton()
        contentHolder.appendChild(searchAgainButton)        
        contentHolder.appendChild(homeStoreButton)
    } else {
        let searchAgainButton = renderSearchAgainButton()
        contentHolder.appendChild(searchAgainButton) 
    }
}

const renderCountdownElement =(timeRemaining)=>{

    let displayingHomeStore = getDisplayingHomestore()
    let contentHolder = document.getElementById('content-holder')
    let countDownElement = document.createElement('span')    
    countDownElement.setAttribute('id', 'count-down-element')
    countDownElement.textContent = 'store closes in:'

    countDownElement = document.getElementById('count-down-element')
    let homeStoreButton = document.getElementById('home-store-button')
    let searchAgainButton = document.getElementById('search-again-button')

    if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)}      
    if (homeStoreButton !== null) {homeStoreButton.parentElement.removeChild(homeStoreButton)}      
    if (searchAgainButton !== null) {searchAgainButton.parentElement.removeChild(searchAgainButton)} 
   
    decideAndRenderButtons(displayingHomeStore, contentHolder)  

    let openingHoursElement = document.getElementById('opening-hours-element')
    countDownElement = document.createElement('span')
    countDownElement.setAttribute('id', 'count-down-element')
    const storeClosesInText = createCountdownText(timeRemaining)
    countDownElement.textContent = storeClosesInText
    openingHoursElement.appendChild(countDownElement) 
}

const createCountdownText =(timeRemaining)=>{
    const hoursRemaining = timeRemaining.hours
    const minutesRemaining = timeRemaining.minutes
    const secondsRemaining = timeRemaining.seconds

    const hoursText = (hoursRemaining > 1) ? 'hours' : 'hour'
    const minutesText = (minutesRemaining !== 1) ? 'minutes' : 'minute'
    const secondsText = (secondsRemaining !== 1) ? 'seconds' : 'second'
    if (hoursRemaining === 0 && minutesRemaining === 0) {
        return `The store closes in ${secondsRemaining} ${secondsText}`
    } else if(hoursRemaining === 0 && minutesRemaining !== 0){
        return `The store closes in ${minutesRemaining} ${minutesText} and ${secondsRemaining} ${secondsText}`
    } else {
        return `The store closes in ${hoursRemaining} ${hoursText} ${minutesRemaining} ${minutesText} and ${secondsRemaining} ${secondsText}`
    }
}

let countdownTimer = setInterval(function() {
    const storeIsOpen = getStoreOpenStatus()
    const convertedNumericToday = getTodayNumericConvertedToVinmonpolet()
    let temporaryStorage = window.sessionStorage
    const currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
      
    if (displayingIndividualStore === false || !storeIsOpen) {  
        return
    } else {
        const closesTodayAt = currentlySelectedStore[0].openingHours.regularHours[convertedNumericToday].closingTime
        const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
        let now = new Date().getTime()
        let timeLeft = closingTimeConverted - now
        let timeUntilClosing = {}
        timeUntilClosing.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 )
        timeUntilClosing.minutes = Math.floor( (timeLeft/1000/60) % 60 )
        timeUntilClosing.seconds = Math.floor( (timeLeft/1000) % 60 )

        renderCountdownElement(timeUntilClosing)
        if (timeLeft < 0) {
            const storeStatus = generateStoreOpenStatus(currentlySelectedStore)
            console.log('storeStatus: ', storeStatus);
            generateStoreOpeningHoursText(storeStatus, currentlySelectedStore)
 
            let countDownElement = document.getElementById('count-down-element')
            let homeStoreButton = document.getElementById('home-store-button')
            let searchAgainButton = document.getElementById('search-again-button')
                    
            if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)}      
            if (homeStoreButton !== null) {homeStoreButton.parentElement.removeChild(homeStoreButton)}      
            if (searchAgainButton !== null) {searchAgainButton.parentElement.removeChild(searchAgainButton)}

            clearInterval(countdownTimer)
            console.log('CountDown Finished');
        }
        
    }

}, 1000);

const findNextOpenDay = (store, todayNumericVinmonopolet, thisDayHasBeenChecked)=> {
    //NOTE THIS IS ONLY USED AFTER THE STORE HAS CLOSED FOR TODAY, and that stores are not open on Sundays
    //That is why the 5(saturday) is used below to check monday
    //Note JS uses 0 to represent sunday, vinmonpolet uses 0 to represent monday     
     const openingTimes = store[0].openingHours.regularHours     

     if (todayNumericVinmonopolet === 5) { //
        let thisDayHasBeenChecked = false
        findNextOpenDay(store, 0, thisDayHasBeenChecked)
        return
     } 

     const nextDay = (thisDayHasBeenChecked === false)? todayNumericVinmonopolet : todayNumericVinmonopolet + 1
     const isClosedOnThisDay = openingTimes[nextDay].closed

     if (isClosedOnThisDay === true) { //the api uses this to show closed all day
        findNextOpenDay(store, todayNumericVinmonopolet + 2, false)
     } else {
         const nextOpeningWeekday = openingTimes[nextDay].dayOfTheWeek
         const nextOpeningTime = openingTimes[nextDay].openingTime
         generateNextOpenInfo(nextOpeningTime, nextOpeningWeekday)
     }   
}

const generateNextOpenInfo =(nextOpeningTime, nextOpeningWeekday) =>{
    const nextTimeOpenText = `This store will open again at ${nextOpeningTime} on ${nextOpeningWeekday}`
    const contentHolder = document.getElementById('content-holder')
    const nextOpenHolder = document.createElement('span')
    nextOpenHolder.textContent += nextTimeOpenText
    contentHolder.appendChild(nextOpenHolder)    
}

const renderSearchAgainButton =()=>{
    let searchAgainButton = document.createElement('button')
    searchAgainButton.textContent = 'CHECK ANOTHER STORE'
    searchAgainButton.setAttribute('id', 'search-again-button')

    searchAgainButton.addEventListener("click", (e) => {
        const temporaryStorage = window.sessionStorage
        temporaryStorage.clear()
        displayingIndividualStore = false
        removeDomElements()
        renderSearchElement()
        createSearchEventHandler()        
    })
    return searchAgainButton
}

const renderHomeStoreButton =()=> {

    let homeStoreButton = document.createElement('button')
    homeStoreButton.textContent = 'MAKE THIS MY HOME STORE'
    homeStoreButton.setAttribute('id', 'home-store-button')

    homeStoreButton.addEventListener("click", (e) => {
        setDisplayingHomeStore(true)     
        let contentHolder = document.getElementById('content-holder')
        let temporaryStorage = window.sessionStorage
        let currentlySelectedStore = JSON.parse(temporaryStorage.getItem('currentlySelectedStore'))
        preferredStore.setHomeStore(currentlySelectedStore[0].storeName)               
        removeDomElements('home-store-button')
        let searchAgainButton = document.getElementById('search-again-button')
        if (!searchAgainButton) {
        let searchAgainButton = renderSearchAgainButton()
        contentHolder.appendChild(searchAgainButton)  
        }
    })
    return homeStoreButton
}

const generateSelectStoreDOMWithSearchTerm = (store) => {
    let storeElement = document.createElement('button')
    storeElement.textContent =  `${store.storeName}`  
    storeElement.setAttribute('id', store.storeId) 
    storeElement.textContent += `Contains: ${store.searchedFor}`   
    storeElement.classList.add('clickable')

    return storeElement
}

const generateSelectStoreDOM = (store) => {
    const storeElement = document.createElement('span')
    const storeTextElement = document.createElement('button') 
    storeTextElement.textContent = store.storeName   
    storeTextElement.setAttribute('id', store.storeId)    
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement)  

    return storeElement
}

const selectThisStore =(id, stores)=> {
    removeDomElements()
    let filteredStore = stores.filter(store => store.storeId === id)    
    renderStoreAddress(filteredStore)
    
}

const renderStores = (stores, moreResultsToDisplay, currentListOfStores) => { 
    
    displayingIndividualStore = false
    let showMoreResultsButtonExists = document.getElementById('show-more-results')
    if (showMoreResultsButtonExists !== null) {
        showMoreResultsButtonExists.remove()
    }
    let contentHolder

    let contentHolderAlreadyExists = !!document.getElementById('content-holder')

    if (contentHolderAlreadyExists) {
        contentHolder = document.getElementById('content-holder')
    } else {
        contentHolder = document.createElement('span')
        contentHolder.setAttribute('id', 'content-holder')
        pageMainElement.appendChild(contentHolder)
    }

    let addSearchedFor = checkForMultipleSearchTerms()

        if (addSearchedFor) {
            stores.forEach((store) => {
                let storeElement = generateSelectStoreDOMWithSearchTerm(store)
                contentHolder.appendChild(storeElement)
        })
        } else {
            stores.forEach((store) => {
                
                let storeElement = generateSelectStoreDOM(store)
                contentHolder.appendChild(storeElement)
        })
    } 
    
    const clickableElements = document.querySelectorAll('.clickable')
  
    clickableElements.forEach((button)=> {
    button.addEventListener("click", (event) => {
        selectThisStore(event.target.id, currentListOfStores) 
        
    })
    })

    if (moreResultsToDisplay) {
        let showMoreResultsButton = document.createElement('button')
        showMoreResultsButton.setAttribute('id', 'show-more-results')
        showMoreResultsButton.textContent = 'SHOW MORE RESULTS'
        contentHolder.appendChild(showMoreResultsButton) 
        showMoreResultsButton.addEventListener('click', ()=> {
            getNext10OrFewerResults(currentListOfStores)
        } )
    }
}
  
const renderNoStoresFound =()=> { 
    let contentHolder = document.createElement('span')
    contentHolder.setAttribute('id', 'content-holder')  
    const searchAgainTextElement = document.createElement('h1')    
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    contentHolder.appendChild(searchAgainTextElement)
    pageMainElement.appendChild(contentHolder) 
}

const removeDomElements = (elementsToDestroy) => {
    let toDestroy
    if (elementsToDestroy === 'home-store-button') {
        toDestroy = document.getElementById('home-store-button')
 
    } else if (elementsToDestroy === 'search-form') {
        toDestroy = document.getElementById('main-search-form')
    } else if (elementsToDestroy === 'opening-hours-element') {
        toDestroy = document.getElementById('opening-hours-element')
    } else {
        toDestroy = document.getElementById('content-holder')
    }

    if (toDestroy) {
        if (toDestroy.firstChild){
            while(toDestroy.firstChild !== null) {
                toDestroy.removeChild(toDestroy.firstChild)
                    }
                    toDestroy.parentElement.removeChild(toDestroy)
        }
    } 
}


export { renderStores, renderStoreAddress, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderTimeAndDate, removeDomElements }
