import createHTML from 'components/createHTML';
import { getData, getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound} from 'views/createPage'

let chosenStore = {}
let possibleStores = {}
let entireListOfStores = {}

/////////////////////
///////////////////
//PROBLEM SOLVED WEBPACK NOT PICKING UP INDEX.HTML
//MUST SET A FILENAME PROPERTY IN THE WEBPACK.CONFIG.JS FILE
//EXAMPLE BELOW

// plugins: [
//   new HtmlWebpackPlugin({
//       filename: '/public/index.html',

import 'main.css';

let searchTerm = 'sandvika'

getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    chosenStore = data
    console.log(chosenStore)
    renderStore(chosenStore)
  }
  else if (data.length > 1)  {
    console.log(`there are ${data.length} results. Select one`)
    possibleStores = data
    renderStores(possibleStores)
  } 
  else {
    getallStores(searchTerm)
     .then(data => {
      entireListOfStores = data  
      filterResults(entireListOfStores)
      renderNoStoresFound()    
     })
  } 
});

  const filterResults = function (stores, searchTerm){
    // console.log(stores)
    // THIS IS BROKEN
    // return stores.filter(function (store, index) {
      
    //   const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
    //   const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())
    //   const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
    //   const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
      
    //   return isCityMatch || isStoreNameMatch || isStreetAddressMatch || isPostalCodeMatch
    // })
  }

  document.querySelector('button').addEventListener('click', function () {console.log('shitttt')})



 

 
  
  
 
