// import createHTML from 'components/createHTML';
'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound, generateHeaderDOM} from 'views/createPage'


let possibleStores = {}
let entireListOfStores = {}

import 'main.css';

generateHeaderDOM()

let searchTerm = 'holmen'


getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    console.log(data)
    renderStore(data)
  }
  else if (data.length > 1)  {
    
    possibleStores = data
    renderStores(possibleStores)
  } 
  else {
    getallStores(searchTerm)
     .then(data => {
       console.log(data)
      entireListOfStores = data  
      const possibleMatches = filterResults(entireListOfStores, searchTerm)
      console.log(possibleMatches.length)
      if (possibleMatches.length === 1){
        renderStore(possibleMatches)
      } else if (possibleMatches.length > 1) {
        renderStores(possibleMatches)
      } else {
        renderNoStoresFound()
      }
          
     })
  } 
})

const filterResults = function (stores, searchTerm){
  console.log(searchTerm)
  return stores.filter(function (store) {
    
    const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
    const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
    
    return isCityMatch || isStreetAddressMatch || isPostalCodeMatch
  })
}

  
 



 

 
  
  
 
