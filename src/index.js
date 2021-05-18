function checkScope() {
  let i = 'function scope';
  if (true) {
    let i = 'block scope';
    // console.log('Block scope i is: ', i);
  }
  console.log('Function scope i is: ', i);
  return i;
}

checkScope()







// import createHTML from 'components/createHTML';
'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { getUserSearchInput } from 'components/getUserInput'
import { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent } from 'views/createPage'
let searchTerm 
let possibleStores = {}
let entireListOfStores = {}
let haveDownloadedEntireList = false

import 'main.css';

console.log('YOU ARE HERE...IF YOU CHOOSE A STORE FROM THE LIST OF MULTIPLE POSSIBILITIES, IT IS NOT BEING REMOVE')


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
  console.log('YOU ARE HERE, CC VEST WITH EMPTY SPACES DOESNT WORK')

  searchTerm = searchTerm.trim().split(" ").join("")
  // console.log(haveDownloadedEntireList)
  if (haveDownloadedEntireList === false) {
    findStoreData(searchTerm)
  } else {
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
        // 
      }
    // console.log(entireListOfStores)
    // filterResults(entireListOfStores,searchTerm)
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
    
    possibleStores = data
    clearExistingContent()
    renderStores(possibleStores)
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



  
 



 

 
  
  
 
