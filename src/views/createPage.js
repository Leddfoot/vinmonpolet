import { setSelectedStoreHolidays, filteredHoliday, checkDayOfTheWeek } from 'components/dateCalculations'

const generateHeaderDOM = () => {
    const headerElement = document.createElement('header')
    const pageTitleElement = document.createElement('span')
    const pageMainElement = document.querySelector('main')
    pageTitleElement.textContent = 'OH SH!T is my vinmonopolet open?&!*?'
    headerElement.appendChild(pageTitleElement)
    pageMainElement.appendChild(headerElement)
    
}

const generateStoreDOM = (store) => {
    const storeElement = document.createElement('div')
    const storeTextElement = document.createElement('h1')    
    storeTextElement.textContent = `${store[0].storeName} is located at ${store[0].address.street}, ${store[0].address.postalCode} ${store[0].address.city}`        
    storeElement.appendChild(storeTextElement)
    
    return storeElement
}



const generateStorehoursHolidayDOM = () => {
    const holidayHoursElement = document.createElement('div')
    const holidayStatusTextElement = document.createElement('h1')
    const holidayOpenHours = document.createElement('h1')
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
    const openingHoursElement = document.createElement('div')
    const openingHoursTextElement = document.createElement('h1')
    openingHoursTextElement.textContent = message
    openingHoursElement.appendChild(openingHoursTextElement)
    return openingHoursElement
}

const generateSelectStoreDOM = (store) => {
    const storeElement = document.createElement('div')
    const storeTextElement = document.createElement('button')
    storeTextElement.textContent = store.storeName 

     
    storeTextElement.setAttribute('id', store.storeId)
    storeTextElement.classList.add('clickable')
    storeElement.appendChild(storeTextElement)

    return storeElement
}





const renderStore = (store) => {
    const pageMainElement = document.querySelector('main')
    
    const storeElement = generateStoreDOM(store)
    
    pageMainElement.appendChild(storeElement)   
    const holidays = store[0].openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)
    
    if (filteredHoliday !== null ) { 
        
        const holidayHoursElement = generateStorehoursHolidayDOM()
        pageMainElement.appendChild(holidayHoursElement)
        
    } else {
        const weekday = checkDayOfTheWeek()
        if (store[0].openingHours.regularHours[weekday].openingTime === "") {
            const openingHours = 'This store is closed all day on this date'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            pageMainElement.appendChild(openingHoursElement)
        } else {
            const openingHours = `This store is open on this date between ${store[0].openingHours.regularHours[weekday].openingTime} and ${store[0].openingHours.regularHours[weekday].closingTime}`
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            pageMainElement.appendChild(openingHoursElement)
        }
        
    }
}

const selectThisStore =(id, stores)=> {
    let filteredStore = stores.filter(store => store.storeId === id)
    renderStore(filteredStore)
}

const renderStores = (stores) => {
    const pageMainElement = document.querySelector('main')
    // storesElement.innerHTML = ''

    stores.forEach((store) => {
        const storeElement = generateSelectStoreDOM(store)
        pageMainElement.appendChild(storeElement)

    })
    const clickableElements = document.querySelectorAll('.clickable')
  
    clickableElements.forEach((button)=> {
    button.addEventListener("click", (event) => {
        selectThisStore(event.target.id, stores)
    })
    })
   
}

const renderNoStoresFound =()=> {
    const pageMainElement = document.querySelector('main')
    // noStoresFoundElement.innerHTML = ''
    const searchAgainElement = document.createElement('div')
    const searchAgainTextElement = document.createElement('h1')
    const searchInput = document.createElement('input')
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    pageMainElement.appendChild(searchAgainElement)
    searchAgainElement.appendChild(searchAgainTextElement)
    searchAgainElement.appendChild(searchInput)
    console.log('no stores found')
}

export { renderStores, renderStore, renderNoStoresFound, generateHeaderDOM }




