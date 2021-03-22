import { config } from './config'
const getStoreUrl = 'https://apis.vinmonopolet.no/stores/v0/details'

const primaryApiKey = config.vinMonopoletAPIKeyPrimary

////'https://apis.vinmonopolet.no/stores/v0/details?storeNameContains=holmen'
const buildURL =(searchingFor)=>{
  return `${getStoreUrl}?storeNameContains=${searchingFor}`
} 

export async function getData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'GET', 
    mode: 'cors',
    headers: {
      'Host': 'apis.vinmonopolet.no',
      'Ocp-Apim-Subscription-Key': primaryApiKey
    },

  });
  return response.json(); 
}

export async function getStoreByName(searchType, storeCity) {
    const url = buildURL(searchType, storeCity)
    // const url = 'https://apis.vinmonopolet.no/stores/v0/details?storeNameContains=holmen'
    const response = await fetch(url, {
      method: 'GET', 
      mode: 'cors',
      headers: {
        'Host': 'apis.vinmonopolet.no',
        'Ocp-Apim-Subscription-Key': primaryApiKey
      },
  
    });
    return response.json(); 
  }
