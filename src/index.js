import createHTML from 'components/createHTML';
import { getData, getStoreByName, getallStores } from 'components/requests'
import { renderStores, renderStore, renderNoStoresFound} from 'views/createPage'
import { today } from 'components/dateCalculations'
// import { today } from 'components/requests'
console.log(today)

/////////////////////
///////////////////
//PROBLEM SOLVED WEBPACK NOT PICKING UP INDEX.HTML
//MUST SET A FILENAME PROPERTY IN THE WEBPACK.CONFIG.JS FILE
//EXAMPLE BELOW

// plugins: [
//   new HtmlWebpackPlugin({
//       filename: '/public/index.html',






import 'main.css';



// getData('https://apis.vinmonopolet.no/products/v0/monthly-sales-per-store?fromSalesMonth=2020-01&toSalesMonth=2020-03&fromStoreId=351&toStoreId=351')
//   .then(data => {
//     console.log(data); 
//   });

let searchTerm = 'sandvika'


//NOTE TO FUTURE SELF: THE Vinmonpolet stores API is  only reliable with storeId, StoreNameContains, and changedSince
//You can attempt to filter on their side but the example below will return all stores in Oslo
//GET https://apis.vinmonopolet.no/stores/v0/details?storeNameContains=oslo&city=bergen
getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    
    renderStore(data)
    
  }
  else if (data.length > 1)  {
    console.log(`there are ${data.length} results. Select one`)
    renderStores(data)
    // This is where  you are console.log(regularhours)
  } 
  else {
    getallStores(searchTerm)
     .then(data => {
       console.log(`dl is .... ${data.length}`)
      console.log(data)  
      filterResults(data)
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

  /**
    removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')
})
   */

 

 
  
  
 
