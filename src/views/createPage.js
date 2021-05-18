import { setSelectedStoreHolidays, filteredHoliday, checkDayOfTheWeek, formattedTime, formattedDate } from 'components/dateCalculations'




const pageMainElement = document.querySelector('main')

// const testcontainer = document.createElement('div')
// const testChild = document.createElement('h1')
// testChild.innerHTML = 'zzzzzzzzzzzzzzzzz'

// pageMainElement.appendChild(testcontainer)
// testcontainer.appendChild(testChild)
// console.log(testcontainer)
// if(testcontainer) {
//     console.log('yes')
// } else {
//     console.log('no')
// }
// testcontainer.remove(testChild)













const storeElement = document.createElement('span')    
storeElement.setAttribute('id', 'store-element')
const searchAgainElement = document.createElement('span')
const timeAndDateElement = document.createElement('span')
timeAndDateElement.setAttribute('id', 'time-and-date-element')


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
    const timeElement = document.createElement('p')
    const dateElement = document.createElement('p')
    
    timeElement.textContent = formattedTime
    dateElement.textContent = formattedDate

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
    console.log(store)    
    let storeElement =document.getElementById('store-element')
    if (storeElement !== null) {
        storeElement.innerHTML = ''
    }
    
    storeElement = document.createElement('span')
    let storeTextElement = document.createElement('p')    
    storeTextElement.textContent = `${store[0].storeName} is located at ${store[0].address.street}, ${store[0].address.postalCode} ${store[0].address.city}`        
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
    openingHoursElement.appendChild(openingHoursTextElement)
    return openingHoursElement
}

const renderStore = (store) => {
    const contentHolder = document.createElement('span')
    contentHolder.setAttribute('id', 'content-holder')

    while(contentHolder.firstChild) {
        contentHolder.removeChild(contentHolder.firstChild)
    }

//    storeElement = ''
    const storeElement = generateStoreDOM(store)
    pageMainElement.appendChild(contentHolder)
    contentHolder.appendChild(storeElement)   
    const holidays = store[0].openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)
    
    if (filteredHoliday !== null ) { 
        
        const holidayHoursElement = generateStorehoursHolidayDOM()
        contentHolder.appendChild(holidayHoursElement)
        
    } else {
        const weekday = checkDayOfTheWeek()
        console.log(store[0])
        if (store[0].storeId === '801'){
            const openingHours = 'The E lager is not open to the public'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            contentHolder.appendChild(openingHoursElement)
            return
        }

        if (store[0].openingHours.regularHours[weekday].openingTime === "") {
            const openingHours = 'This store is closed all day on this date'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            contentHolder.appendChild(openingHoursElement)
        } else {
            const openingHours = `This store is open on this date between ${store[0].openingHours.regularHours[weekday].openingTime} and ${store[0].openingHours.regularHours[weekday].closingTime}`
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            contentHolder.appendChild(openingHoursElement)
        }
        
    }
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
    let filteredStore = stores.filter(store => store.storeId === id)
    clearExistingContent()
    renderStore(filteredStore)
}

const renderStores = (stores) => {
    const pageMainElement = document.querySelector('main')
    let contentHolder = document.createElement('div')
    contentHolder.setAttribute('id', 'content-holder')
    pageMainElement.appendChild(contentHolder)
    // storesElement.innerHTML = ''

    stores.forEach((store) => {
        const storeElement = generateSelectStoreDOM(store)
        contentHolder.appendChild(storeElement)

    })
    const clickableElements = document.querySelectorAll('.clickable')
  
    clickableElements.forEach((button)=> {
    button.addEventListener("click", (event) => {
        selectThisStore(event.target.id, stores)
    })
    })
   
}

const renderNoStoresFound =()=> {  

    let contentHolder = document.createElement('div')
    contentHolder.setAttribute('id', 'content-holder')
  
    const searchAgainTextElement = document.createElement('h1')    
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    contentHolder.appendChild(searchAgainTextElement)
    pageMainElement.appendChild(contentHolder)
 
}

const clearExistingContent = () => {
    let contentHolder = document.getElementById('content-holder')
    // console.log(contentHolder) 
    if (contentHolder) {
        // console.log('content holder exists')
        if (contentHolder.firstChild){
            // console.log('first child exists')
            while(contentHolder.firstChild !== null) {
                        contentHolder.removeChild(contentHolder.firstChild)
                    }
                    contentHolder.parentElement.removeChild(contentHolder)
        }
    } 

    let storeElement = document.getElementById('store-element')
    // console.log(contentHolder) 
    if (storeElement) {
        // console.log('content holder exists')
        if (storeElement.firstChild){
            // console.log('first child exists')
            while(storeElement.firstChild !== null) {
                storeElement.removeChild(storeElement.firstChild)
                    }
                    storeElement.parentElement.removeChild(storeElement)
        }
    } 
        
    
}


export { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent }

