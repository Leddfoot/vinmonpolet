import { setSelectedStoreHolidays, filteredHoliday, checkDayOfTheWeek, formattedCurrentTime, todayDateForDisplay, isStoreOpenNow, getCountDownTimeRemaining, convertTimeStringToProperDate, formatCurrentTime } from 'components/dateCalculations'
import { preferredStore } from '../components/preferenceStorage'
import { checkForMultipleSearchTerms, getNext10OrFewerResults, displayingHomeStore, createSearchEventHandler } from '../index'
import { generateClock } from '../components/clock'
const pageMainElement = document.querySelector('main')
let temporaryStoreHolder
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
    // console.log('emptyCanvas: ', canvas)
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
    const storeInfo = {...store[0]}
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

const generateStoreOpeningHoursDOM = (message) => {
    let openingHoursElement = document.getElementById('opening-hours-element')

    openingHoursElement = document.createElement('span')
    const openingHoursTextElement = document.createElement('p')
    openingHoursTextElement.textContent = message
    openingHoursElement.setAttribute('id', 'opening-hours-element')
    openingHoursElement.appendChild(openingHoursTextElement)
    return openingHoursElement
}


//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
const closesTodayAt = '19:55'
// const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt).getTime() + 24 * 60 * 60 * 1000
// const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt).getTime() * 60 * 60 * 1000
const closingTimeConverted = convertTimeStringToProperDate(closesTodayAt)
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

const renderStore = (store) => { 
    displayingIndividualStore = true
    ////change this bullshit https://www.peanutbutterjavascript.com/posts/immutable-object-update
    //or object.assign on this page https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/#shallow-clone-vs-deep-clone
    temporaryStoreHolder = store //this is unfortunately necessary...
    removeDomElements()
    removeDomElements('search-form')
    store = temporaryStoreHolder //this is unfortunately necessary...
    const storeInfo = {...store[0]}


    //////////////////////move this somewhere else


    let contentHolder = document.createElement('span')
    contentHolder.setAttribute('id', 'content-holder')
    const storeElement = generateStoreDOM(temporaryStoreHolder)
    pageMainElement.appendChild(contentHolder)
    contentHolder.appendChild(storeElement)   
    const holidays = storeInfo.openingHours.exceptionHours

    //////////////////////move this somewhere else

    setSelectedStoreHolidays(holidays)
    const weekday = checkDayOfTheWeek()
    const opensTodayAt = storeInfo.openingHours.regularHours[weekday].openingTime


    //////////////////////////////////////
    // const closesTodayAt = storeInfo.openingHours.regularHours[weekday].closingTime
    // const closesTodayAt = '21:53'

    ///you are using this to fake a closing time

    //////////////////////////////////////

    const storeStatus = isStoreOpenNow(opensTodayAt, closesTodayAt)

    if (filteredHoliday !== null ) {         
        const holidayHoursElement = generateStorehoursHolidayDOM()
        contentHolder.appendChild(holidayHoursElement) 
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
        return       
    } 
    
    if (storeInfo.storeId === '801'){
        const openingHours = 'The E lager is not open to the public'
        const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
        contentHolder.appendChild(openingHoursElement)
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
        return
    }

    if (storeInfo.openingHours.regularHours[weekday].openingTime === "") {
        const openingHours = 'This store is closed all day today'
        const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
        contentHolder.appendChild(openingHoursElement)
        const today = checkDayOfTheWeek() 
        findNextOpenDay(today, storeInfo)
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
        return
    } 
    if(storeStatus.hasClosed === true) {       

        const openingHours = `This store has already closed today at ${storeInfo.openingHours.regularHours[weekday].closingTime}`
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
        contentHolder.appendChild(openingHoursElement)
        const today = checkDayOfTheWeek()
        // findNextOpenDay(6, storeInfo)
        findNextOpenDay(today, storeInfo)
        // console.log('today: ', today);
        decideAndRenderButtons(displayingHomeStore, contentHolder, store, id)
        return
    }

    if(storeStatus.hasOpened === false) {
        const openingHours = `This store will open today at ${storeInfo.openingHours.regularHours[weekday].openingTime} and closes at ${storeInfo.openingHours.regularHours[weekday].closingTime}.`
        let openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
        contentHolder.appendChild(openingHoursElement)
        decideAndRenderButtons(displayingHomeStore, contentHolder, store)
        
        
        return
    }

    const openingHours = `This store is open today until ${closesTodayAt}.`
      let openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
    openingHoursElement.setAttribute('id', 'opening-hours-element')
    contentHolder.appendChild(openingHoursElement) 

}

const decideAndRenderButtons =(displayingHomeStore, contentHolder, store)=> {
     if (displayingHomeStore === false) {
        let homeStoreButton = renderHomeStoreButton(store)
        let searchAgainButton = renderSearchAgainButton()
        contentHolder.appendChild(searchAgainButton)        
        contentHolder.appendChild(homeStoreButton)
    } else {
        let searchAgainButton = renderSearchAgainButton()
        contentHolder.appendChild(searchAgainButton) 
    }
}

const renderCountdownElement =(timeRemaining)=>{
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

    /////////////////////////////////////
    /////////////////////////////////////
    // YOU ARE HERE, YOU HAVE TO GET THE STORE AND STOREID INFO HERE SOMEHOW
    // TO PASS TO decideAndRenderButtons
    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////
    decideAndRenderButtons(displayingHomeStore, contentHolder)     
    

    const openingHoursElement = document.getElementById('opening-hours-element')
    const storeClosesInText = `The store closes in ${timeRemaining.hours} hours, ${timeRemaining.minutes} minutes, ${timeRemaining.seconds} seconds`
    countDownElement = document.createElement('span')
    countDownElement.setAttribute('id', 'count-down-element')
    countDownElement.textContent = storeClosesInText
    openingHoursElement.appendChild(countDownElement) 
}


let countdownTimer = setInterval(function() {
    if (displayingIndividualStore === false) {
        return
    } else {
            // get today's date and time in milliseconds
    let now = new Date().getTime();
    

    // find the interval between now and the countdown time
    let timeLeft = closingTimeConverted - now;

    // time calculations for days, hours, minutes and seconds
    // const days = Math.floor( timeLeft/(1000*60*60*24) );
    const hours = Math.floor( (timeLeft/(1000*60*60)) % 24 );
    const minutes = Math.floor( (timeLeft/1000/60) % 60 );
    const seconds = Math.floor( (timeLeft/1000) % 60 );
    let timeRemaining = {}
    timeRemaining.hours = Math.floor( (timeLeft/(1000*60*60)) % 24 );
    timeRemaining.minutes = Math.floor( (timeLeft/1000/60) % 60 );
    timeRemaining.seconds = Math.floor( (timeLeft/1000) % 60 );

    // console.log(hours + "h " + minutes + "m " + seconds + "s ");
    renderCountdownElement(timeRemaining)
    // clearing countdown when complete
    if (timeLeft < 0) {
        let countDownElement = document.getElementById('count-down-element')
        if (countDownElement) {countDownElement.parentElement.removeChild(countDownElement)} 
        clearInterval(countdownTimer);
        console.log('CountDown Finished');
    }
        
    }

    }, 1000);

const findNextOpenDay = (todayNumeric, storeInfo)=> {
    
    
    if (todayNumeric === 6) {
        findNextOpenDay(0, storeInfo)
    } 
    if (storeInfo.openingHours.regularHours[todayNumeric].openingTime === '') {        
         findNextOpenDay(todayNumeric +1, storeInfo)              
    } else { 
        const nextOpeningTime = storeInfo.openingHours.regularHours[todayNumeric].openingTime

        ///////////test this change
        const nextOpeningWeekday = storeInfo.openingHours.regularHours[todayNumeric + 1].dayOfTheWeek
        console.log('storeInfo.openingHours.regularHours: ', storeInfo.openingHours.regularHours);
        // const nextOpeningWeekday = storeInfo.openingHours.regularHours[todayNumeric].dayOfTheWeek
        ///////////test this change


        generateNextOpenInfo(nextOpeningTime, nextOpeningWeekday)

    }
   
}

const generateNextOpenInfo =(nextOpeningTime, nextOpeningWeekday) =>{
    console.log('nextOpeningWeekday: ', nextOpeningWeekday);
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
        displayingIndividualStore = false
        removeDomElements()
        renderSearchElement()
        createSearchEventHandler()        
    })
    return searchAgainButton
}

const renderHomeStoreButton =(store)=> {
    let homeStoreButton = document.createElement('button')
    homeStoreButton.textContent = 'MAKE THIS MY HOME STORE'
    homeStoreButton.setAttribute('id', 'home-store-button')

    homeStoreButton.addEventListener("click", (e) => {        
        let contentHolder = document.getElementById('content-holder')
        preferredStore.setHomeStore(store[0].storeName)        
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
    // https://css-tricks.com/a-complete-guide-to-links-and-buttons/#breakout-buttons

    // needed also below generateSelectStoreDOM?maybe?
    storeElement.setAttribute("style","display:block")
    let storeTextElement = document.createElement('p')  
    storeTextElement.textContent =  `${store.storeName}`  
    storeTextElement.setAttribute('id', store.storeId)    
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement) 
    let searchedForElement = document.createElement('p')
    searchedForElement.textContent = `Contains: ${store.searchedFor}` 
    storeElement.appendChild(searchedForElement)

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
    renderStore(filteredStore)
    
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


export { renderStores, renderStore, renderNoStoresFound, renderHeader, renderClockDom, renderSearchElement, renderTimeAndDate, removeDomElements }

