import { setSelectedStoreHolidays, filteredHoliday, checkDayOfTheWeek, formattedTime, todayDate, isStoreOpenNow } from 'components/dateCalculations'
import { preferredStore } from '../components/preferenceStorage'
import { checkForMultipleSearchTerms, getNext10OrFewerResults, displayingHomeStore, createSearchEventHandler, currentListOfStores } from '../index'
const pageMainElement = document.querySelector('main')

let temporaryStoreHolder

const generateHeaderDOM = () => {
    const headerElement = document.createElement('header')
    const pageTitleElement = document.createElement('span')
    pageTitleElement.textContent = 'OH SH!T is my vinmonopolet open?&!*?'
    headerElement.appendChild(pageTitleElement)

    return headerElement        
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
    
    timeElement.textContent = formattedTime
    dateElement.textContent = todayDate

    timeAndDateElement.appendChild(timeElement)
    timeAndDateElement.appendChild(dateElement)

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
    const openingHoursElement = document.createElement('span')
    const openingHoursTextElement = document.createElement('p')
    openingHoursTextElement.textContent = message
    openingHoursTextElement.setAttribute('id', 'opening-hours-element')
    openingHoursElement.appendChild(openingHoursTextElement)
    return openingHoursElement
}

const renderStore = (store) => { 
    temporaryStoreHolder = store //this is unfortunately necessary...
    removeDomElements()
    removeDomElements('search-form')
    store = temporaryStoreHolder //this is unfortunately necessary...
    const contentHolder = document.createElement('span')
    contentHolder.setAttribute('id', 'content-holder')
    const storeElement = generateStoreDOM(temporaryStoreHolder)
    pageMainElement.appendChild(contentHolder)
    contentHolder.appendChild(storeElement)   
    const holidays = store[0].openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)
    
    if (filteredHoliday !== null ) {         
        const holidayHoursElement = generateStorehoursHolidayDOM()
        contentHolder.appendChild(holidayHoursElement)        
    } else {
        const weekday = checkDayOfTheWeek()
        if (store[0].storeId === '801'){
            const openingHours = 'The E lager is not open to the public'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            contentHolder.appendChild(openingHoursElement)
            return
        }

        if (store[0].openingHours.regularHours[weekday].openingTime === "") {
            const storeInfo = store[0]
            const openingHours = 'This store is closed all day today'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            contentHolder.appendChild(openingHoursElement)

            const today = checkDayOfTheWeek() 
            findNextOpenDay(today, storeInfo)
        } else {
            const opensTodayAt = store[0].openingHours.regularHours[weekday].openingTime
            const closesTodayAt = store[0].openingHours.regularHours[weekday].closingTime

            const storeStatus = isStoreOpenNow(opensTodayAt, closesTodayAt)
            const storeIsOpen = storeStatus.isOpen

            if (storeIsOpen) {
                const openingHours = `This store is open today until ${store[0].openingHours.regularHours[weekday].closingTime}`
                const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
                contentHolder.appendChild(openingHoursElement)  
            } 

            if(storeStatus.hasOpened === false) {
                const openingHours = `This store will open today at ${store[0].openingHours.regularHours[weekday].openingTime} and closes at ${store[0].openingHours.regularHours[weekday].closingTime}.`
                const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
                contentHolder.appendChild(openingHoursElement) 
            }

            if(storeStatus.hasClosed === true) {
                const openingHours = `This store has already closed today at ${store[0].openingHours.regularHours[weekday].closingTime}`
                const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
                contentHolder.appendChild(openingHoursElement)
                const today = checkDayOfTheWeek()
                const storeInfo = store[0] 
                findNextOpenDay(today, storeInfo)
            }
        }        
    }
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

const findNextOpenDay = (dateToCheck, storeInfo)=> {
    
    
    if (storeInfo.openingHours.regularHours[dateToCheck].openingTime === '') {
        console.log(dateToCheck)

        if (dateToCheck === 6) {
            console.log(storeInfo)
            findNextOpenDay(0, storeInfo)
        } 
        else {
            console.log('bullashit2')
            findNextOpenDay(dateToCheck +1, storeInfo)
        }        
    } else { 
        const nextOpeningTime = storeInfo.openingHours.regularHours[dateToCheck].openingTime
        const nextOpeningWeekday = storeInfo.openingHours.regularHours[dateToCheck].dayOfTheWeek
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
    searchAgainButton.textContent = 'FIND ANOTHER STORE'
    searchAgainButton.setAttribute('id', 'search-again-button')

    searchAgainButton.addEventListener("click", (e) => {
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

export { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, removeDomElements }

