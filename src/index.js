'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent } from 'views/createPage'
let searchTerm 
let entireListOfStores = {}
let haveDownloadedEntireList = false
let possibleMatches
let searchTermIsMultiple = false


import 'main.css';

renderHeader()
renderTimeAndDate()
renderSearchElement()

const mainSearchInputElement = document.querySelector('#main-search-input')
mainSearchInputElement.setAttribute('placeholder', 'Enter a city, store name, or postal code')
mainSearchInputElement.setAttribute('name', 'searchTerm')
const mainSearchInputForm = document.querySelector('#main-search-form')

mainSearchInputForm.addEventListener('submit', function (e) {
  e.preventDefault()
  if (e.target.elements.searchTerm.value === ''){
    return
  }  
  searchTermIsMultiple = false
  searchTerm = e.target.elements.searchTerm.value
  searchTerm = searchTerm.trim()
  if (!searchTerm.includes(' ')) {
    handleSingleQuery(searchTerm)
  } else {
        let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
        getMultiFetchesTest(multipleSearchTerms)
  }
})

// you are here....  
//todo move haveDownloadedEntireList === true into the event listener above to prevent additional api calls
//todo change button click to entire button (display block not working yet, may have to do it in css)

const handleSingleQuery = function (searchTerm){
  if (haveDownloadedEntireList === false) {
    
    getStoreByName(searchTerm)
    .then((result) => { 
      handlePossibleMatches(result)
    }).catch((err) => {
     console.log(`Error: ${err}`)
    })
        
  } else {
    possibleMatches = []
    possibleMatches = filterResults(entireListOfStores, searchTerm)
    handlePossibleMatches(possibleMatches)
  } 
}

const handleMultipleSearchTerms = (function () {
  return {
    divideSearchTerms: function () {
      const multipleSearchTerms = searchTerm.split(' ')
      return multipleSearchTerms
      
    }
  }
})()

function getMultiFetchesTest (multipleSearchTerms) {
  searchTermIsMultiple = true
  let temporaryArray = new Array;
  let fetches = [];
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    fetches.push(
      getStoreByName(multipleSearchTerms[i])
      .then(result => {
        result.forEach(store => {
          store.searchedFor = multipleSearchTerms[i]
        });
        temporaryArray.push(result);
          }
      )
      .catch(status, err => {return console.log(status, err);})
    );
  }
  Promise.all(fetches).then(function() { 
    let combinedFetchArray = [].concat(...temporaryArray);
    handlePossibleMatches(combinedFetchArray)
  });
  }





const handlePossibleMatches = (possibleMatches) => {
  clearExistingContent()
  if (possibleMatches.length === 1){
    renderStore(possibleMatches)
  } else if (possibleMatches.length > 1) {
    renderStores(possibleMatches, searchTerm)
  } else if (haveDownloadedEntireList === true ){
    renderNoStoresFound()
  } else {
    getallStores(searchTerm)
    .then((result) => {
    console.log('have downloaded entire list')
    haveDownloadedEntireList = true
    entireListOfStores = result             
    possibleMatches = filterResults(entireListOfStores, searchTerm)       
    handlePossibleMatches(possibleMatches)
    }).catch((err) => {
    console.log(`Error: ${err}`)
    })
  }
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

const checkForMultipleSearchTerms =()=> searchTermIsMultiple

export {checkForMultipleSearchTerms}




  
 



 

 
  
  
 
