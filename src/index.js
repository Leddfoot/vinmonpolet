
'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound, renderHeader, renderSearchElement, renderTimeAndDate, clearExistingContent } from 'views/createPage'
import { preferredStore } from 'components/preferenceStorage'
let searchTerm
let haveDownloadedEntireList = false
let searchTermIsMultiple = false
let moreResultsToDisplay = false
let listToPaginate = []
let entireListOfStores = {}
let displayingHomeStore = false
let currentListOfStores = {}


import 'main.css';

renderHeader()
renderTimeAndDate()

const createSearchEventHandler=()=>{
  const mainSearchInputForm = document.querySelector('#main-search-form')
  mainSearchInputForm.addEventListener('submit', function (e) {
    clearExistingContent()
    e.preventDefault()
    displayingHomeStore = false
    if (e.target.elements.searchTerm.value === ''){
      return
    }  
    searchTermIsMultiple = false
    listToPaginate = {}
    searchTerm = e.target.elements.searchTerm.value
    searchTerm = searchTerm.trim()
  
    if (haveDownloadedEntireList === true) {
      currentListOfStores = entireListOfStores
      if (!searchTerm.includes(' ')) {
        const filteredStoreList = filterResults(entireListOfStores, searchTerm)
        handlePossibleMatches(filteredStoreList)
      } else {
        searchTermIsMultiple = true
        let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
        const filteredStoreListMultSearch = filterMultiSearches(multipleSearchTerms)
        const combinedFilteredArray = [].concat(...filteredStoreListMultSearch)
        handlePossibleMatches(combinedFilteredArray)
      }    
    } else {
      if (!searchTerm.includes(' ')) {
        handleSingleQuery(searchTerm)
      } else {
            let multipleSearchTerms = handleMultipleSearchTerms.divideSearchTerms(searchTerm)
            getMultiFetchesTest(multipleSearchTerms)
      }
    }
  
  })
}


const filterMultiSearches = (multipleSearchTerms) => {
  const filteredStoreListMultSearch = new Array
  for (let i = 0; i < multipleSearchTerms.length; i++) {
    filteredStoreListMultSearch.push(filterResults(entireListOfStores, multipleSearchTerms[i]))
    filteredStoreListMultSearch[i].forEach(store => {
    store.searchedFor = multipleSearchTerms[i]
    })
  }
  return filteredStoreListMultSearch 
  
}

//todo add find another store when selectstore...because
//there is no way to get back from there without making a store your home store


//todo change button click to entire button (display block not working yet, may have to do it in css)

//todo ...maybe...prioritize multiple search term matches .... ie holmen senter should either display only this store
// or make it first in the list


//todo more date/holiday testing
//todo change  the store is open on this date to : store is open/closed ...hours are/were
//is it necessary to destroy event handlers?

const handleSingleQuery = function (searchTerm){
    
    getStoreByName(searchTerm)
    .then((result) => { 
      currentListOfStores = [...result]
      handlePossibleMatches(result) 
    }).catch((err) => {
     console.log(`Error: ${err}`)
    })
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
    let combinedFetchArray = [].concat(...temporaryArray)
    currentListOfStores = [...combinedFetchArray]
    handlePossibleMatches(combinedFetchArray)
  })
  }
const handlePossibleMatches = (possibleMatches) => {
  if (possibleMatches.length === 1){
    renderStore(possibleMatches)
  } else if (possibleMatches.length > 1 && possibleMatches.length <= 10) {
    let moreResultsToDisplay = false
    renderStores(possibleMatches, moreResultsToDisplay, currentListOfStores)
    
    
  } else if (possibleMatches.length > 1) { 
  listToPaginate = possibleMatches
  getNext10OrFewerResults(currentListOfStores)
  
  
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

const getNext10OrFewerResults = (currentListOfStores) => {  
  if (listToPaginate.length > 10) {
    moreResultsToDisplay = true
  } else {
    moreResultsToDisplay = false
  }  
  const current10orFewerResults = listToPaginate.splice(0, 10)
  renderStores(current10orFewerResults, moreResultsToDisplay, currentListOfStores)
  
  
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



const handleHomeStore =() =>{
  let homeStore = preferredStore.initialize()

  if (homeStore !== 'none set') {
    displayingHomeStore = true
    handleSingleQuery(homeStore)
  } else {
    displayingHomeStore = false
    renderSearchElement()
    createSearchEventHandler()
  }
}

handleHomeStore()

export {checkForMultipleSearchTerms, getNext10OrFewerResults, listToPaginate, displayingHomeStore, createSearchEventHandler, currentListOfStores}







  
 



 

 
  
  
 
