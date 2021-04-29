import { setSelectedStoreHolidays, filteredHoliday, checkDayOfTheWeek } from 'components/dateCalculations'


const generateStoreDOM = (store) => {
    const storeElement = document.createElement('div')
    const storeTextElement = document.createElement('h1')
    storeTextElement.textContent = store[0].address.street += store[0].address.postalCode += store[0].address.city
     
    storeTextElement.classList.add('list-item__title')
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
    console.log(filteredHoliday)
     
    
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
    const storeElement = document.createElement('a')
    const storeTextElement = document.createElement('p')
    const storeSelector = document.createElement('button')
    storeSelector.innerHTML ='Select This Store'
    storeTextElement.textContent = store.address.street += store.address.postalCode += store.address.city
     
    storeTextElement.classList.add('list-item__title')
    storeElement.appendChild(storeTextElement)
    storeElement.appendChild(storeSelector)

    return storeElement
}



const renderStore = (store) => {
    
    const storesElement = document.querySelector('#stores')
    storesElement.innerHTML = ''

    const storeElement = generateStoreDOM(store)
    storesElement.appendChild(storeElement)   
    const holidays = store[0].openingHours.exceptionHours
    setSelectedStoreHolidays(holidays)
    
    console.log(filteredHoliday)
    if (filteredHoliday !== null ) { //&& filteredHoliday.length === 0
        
        const holidayHoursElement = generateStorehoursHolidayDOM()
        storesElement.appendChild(holidayHoursElement)
        
    } else {
        const weekday = checkDayOfTheWeek()
        console.log(store[0].openingHours.regularHours[weekday])
        if (store[0].openingHours.regularHours[weekday].openingTime === "") {
            const openingHours = 'This store is closed all day on this date'
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            storesElement.appendChild(openingHoursElement)
        } else {
            const openingHours = `This store is open on this date between ${store[0].openingHours.regularHours[weekday].openingTime} and ${store[0].openingHours.regularHours[weekday].closingTime}`
            const openingHoursElement = generateStoreOpeningHoursDOM(openingHours)
            console.log(openingHoursElement)
            storesElement.appendChild(openingHoursElement)
        }
        console.log(store[0].openingHours.regularHours[weekday])
        
    }
}

const renderStores = (stores) => {
    const storesElement = document.querySelector('#stores')
    storesElement.innerHTML = ''

    // let stores = []
    stores.forEach((store) => {
        const storeElement = generateSelectStoreDOM(store)
        storesElement.appendChild(storeElement)
    })
    
}

const renderNoStoresFound =()=> {
    const noStoresFoundElement = document.querySelector('#stores')
    noStoresFoundElement.innerHTML = ''
    const searchAgainElement = document.createElement('div')
    const searchAgainTextElement = document.createElement('h1')
    const searchInput = document.createElement('input')
    searchAgainTextElement.textContent = 'No stores Found. Search Again'
    noStoresFoundElement.appendChild(searchAgainElement)
    searchAgainElement.appendChild(searchAgainTextElement)
    searchAgainElement.appendChild(searchInput)
    console.log('no stores found')
}

export { renderStores, renderStore, renderNoStoresFound }




