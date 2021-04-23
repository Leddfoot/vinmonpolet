const generateStoreDOM = (store) => {
    console.log(store[0].openingHours)
    const storeElement = document.createElement('a')
    const storeTextElement = document.createElement('p')
    storeTextElement.textContent = store[0].address.street += store[0].address.postalCode += store[0].address.city
     
    storeTextElement.classList.add('list-item__title')
    storeElement.appendChild(storeTextElement)
    return storeElement
}

const generateSelectStoreDOM = (store) => {
    console.log(store)
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
}

const renderStores = (stores) => {
    console.log(stores)
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




