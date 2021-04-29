import { config } from './config'
const getStoreUrl = 'https://apis.vinmonopolet.no/stores/v0/details'

const primaryApiKey = config.vinMonopoletAPIKeyPrimary

const buildURL =(searchingFor)=>{
  return `${getStoreUrl}?storeNameContains=${searchingFor}`
} 

export async function getStoreByName(storeCity) {
    const url = buildURL(storeCity)
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

  export async function getallStores() {
    
     const url = 'https://apis.vinmonopolet.no/stores/v0/details'
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
