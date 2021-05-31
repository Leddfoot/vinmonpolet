'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent } from 'views/createPage'
let searchTerm 
let entireListOfStores = {}
let haveDownloadedEntireList = false

import 'main.css';

renderHeader()
renderTimeAndDate()
renderSearchElement()

const mainSearchInputElement = document.querySelector('#main-search-input')
mainSearchInputElement.setAttribute('placeholder', 'Enter a city, store name, or postal code')
mainSearchInputElement.setAttribute('name', 'searchTerm')


document.querySelector('#main-search-form').addEventListener('submit', function (e) {
  e.preventDefault()
  mainSearchInputElement.text = ''
  searchTerm = e.target.elements.searchTerm.value

  searchTerm = searchTerm.trim()
  if (haveDownloadedEntireList === false) {
    findStoreData(searchTerm)
    
  } else {
      //     const possibleMatches = filterResults(entireListOfStores, searchTerm)
      // if (possibleMatches.length === 1){
        console.log('after we have gootten whole list shit goes here')
      //   clearExistingContent()
      //   renderStore(possibleMatches)
      // } else if (possibleMatches.length > 1) {
      //   clearExistingContent()
      //   renderStores(possibleMatches)
      // } else {
      //   clearExistingContent()
      //   renderNoStoresFound()
      // }
  }
  
 })

 
 const findStoreData = (searchTerm)=> {
    getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    console.log(data)
    clearExistingContent()
    renderStore(data)
  }
  else if (data.length > 1)  {  
    let numberOfPossibleMatches = 0
    data.forEach(store => {
      numberOfPossibleMatches +=1
      store.searchedFor = searchTerm
    }) 
    clearExistingContent()
    renderStores(data, searchTerm, numberOfPossibleMatches)
  }  
  else {
    getallStores(searchTerm)
     .then(data => {
       console.log('have gotten whole list now')
      haveDownloadedEntireList = true
      entireListOfStores = data  
      const possibleMatches = filterResults(entireListOfStores, searchTerm)
      if (possibleMatches.length === 1){
        clearExistingContent()
        renderStore(possibleMatches)
      } else if (possibleMatches.length > 1) {
        clearExistingContent()
        renderStores(possibleMatches)
      } else {
        clearExistingContent()
        renderNoStoresFound()
      }
          
     })
  } 
})
  
}


const filterResults = function (stores, searchTerm){
  return stores.filter(function (store) {
    
    const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())

    
    return isCityMatch || isStreetAddressMatch || isPostalCodeMatch || isStoreNameMatch
  })
}




  
 



 

 
  
  
 
