// import createHTML from 'components/createHTML';
'use strict'
import { getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound} from 'views/createPage'


let possibleStores = {}
let entireListOfStores = {}

import 'main.css';

let searchTerm = 'zz'

getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    renderStore(data)
  }
  else if (data.length > 1)  {
    possibleStores = data
    renderStores(possibleStores)
  } 
  else {
    getallStores(searchTerm)
     .then(data => {
      entireListOfStores = data  
      const possibleMatches = filterResults(entireListOfStores)
      console.log(possibleMatches)
      renderNoStoresFound()    
     })
  } 
})

  const filterResults = function (stores, searchTerm){
    console.log(stores)
    return stores.filter(function (store, index) {
      
      const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
      
      return isCityMatch || isStoreNameMatch || isStreetAddressMatch || isPostalCodeMatch
    })
  }

  
 



 

 
  
  
 
