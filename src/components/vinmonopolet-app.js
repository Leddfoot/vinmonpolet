console.log('from vm app')

import { config } from './config'

async function createHTML() {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode('Babel-Boilerplate!');
    
    div.className = 'main';
    h1.appendChild(h1Text);    
    document.body.appendChild(div);
    div.appendChild(h1);

}


const primaryApiKey = config.vinMonopoletAPIKeyPrimary

async function getData(url = '', data = {}) {
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

getData('https://apis.vinmonopolet.no/products/v0/monthly-sales-per-store?fromSalesMonth=2020-01&toSalesMonth=2020-03&fromStoreId=351&toStoreId=351')
  .then(data => {
    console.log(data); 
  });


export default createHTML;