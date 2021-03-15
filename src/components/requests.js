import { config } from './config'

const primaryApiKey = config.vinMonopoletAPIKeyPrimary

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

export async function getStore(url = '', data = {}) {
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
