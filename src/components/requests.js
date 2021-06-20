//After an API update, suddenly started getting CORS problems 
//Using a set of data that i had around to simulate instead
//to simulate fetches 

//This will simulate what the api was doing before it locked me out
//I can preserve the original design specifications and goals of the practice work
//the stores api was only searchable by name (probably because the vinmonpolet 
// website displays a list based on your location)

import { stores } from '../stores'

export async function getStoreByName(searchTerm) {
  console.log('making small fake fetch')
  const littleStoreList = fakeSmallAPIcall(stores, searchTerm)
  return littleStoreList
}

const fakeSmallAPIcall = (stores, searchTerm) => {
  console.log('searchTerm: ', searchTerm);
  return stores.filter(function (store) {
    
    const isStoreNameMatch = store.storeName.toLowerCase().includes(searchTerm.toString().toLowerCase())

    return isStoreNameMatch 
  })
  
}

export async function getallStores(searchTerm) {
  const storeList = stores
  console.log('fake fetching everything')
   return storeList
 }






//  import { config } from './config'

// const getStoreUrl = 'https://apis.vinmonopolet.no/stores/v0/details'

// const primaryApiKey = config.vinMonopoletAPIKeyPrimary

// const buildURL =(searchingFor)=>{
//   return `${getStoreUrl}?storeNameContains=${searchingFor}`
// } 


// export async function getStoreByName(storeCity) {
//     const url = buildURL(storeCity)
//     const response = await fetch(url, {
//       type: 'GET', 
//       // mode: 'no-cors',
//       headers: {
//         'Cache-Control':  'no-cache',
//         'Host': 'apis.vinmonopolet.no',
//         'Ocp-Apim-Subscription-Key': primaryApiKey,
        
//       },
  
//     });
    
//     return response.json(); 


//   }

  // export async function getallStores() {
    
  //    const url = 'https://apis.vinmonopolet.no/stores/v0/details'
  //   const response = await fetch(url, {
  //     method: 'GET', 
  //     mode: 'cors',
  //     headers: {
  //       'Host': 'apis.vinmonopolet.no',
  //       'Ocp-Apim-Subscription-Key': primaryApiKey
  //     },
  
  //   });
  //   return response.json(); 
  // }
