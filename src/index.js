import createHTML from 'components/createHTML';
import { getData, getStoreByName, getallStores } from 'components/requests'
import 'main.css';

const main = async () => {
    createHTML();
}

main().then(() => console.log('Started'));

// getData('https://apis.vinmonopolet.no/products/v0/monthly-sales-per-store?fromSalesMonth=2020-01&toSalesMonth=2020-03&fromStoreId=351&toStoreId=351')
//   .then(data => {
//     console.log(data); 
//   });

let searchTerm = '1394'

//NOTE TO FUTURE SELF: THE Vinmonpolet stores API is  only reliable with storeId, StoreNameContains, and changedSince
//You can attempt to filter on their side but the example below will return all stores in Oslo
//GET https://apis.vinmonopolet.no/stores/v0/details?storeNameContains=oslo&city=bergen
getStoreByName(searchTerm)
.then(data => {
  if (data.length === 1) {
    console.log(data)
  } else if (data.length > 1)  {
    console.log(`there are ${data.length} results. Select one`)
  } else {
    getallStores(searchTerm)
     .then(data => {
      //  console.log(data)
      console.log(filterResults(data, searchTerm))      
     })
  } 
});

  const filterResults = function (stores, searchTerm){
    return stores.filter(function (store, index) {
      
      const isCityMatch = store.address.city.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isStreetAddressMatch = store.address.street.toLowerCase().includes(searchTerm.toString().toLowerCase())
      const isPostalCodeMatch = store.address.postalCode.includes(searchTerm)
      
      return isCityMatch || isStoreNameMatch || isStreetAddressMatch || isPostalCodeMatch
    })
  }

 

 
  
  
 
  