console.log('from vm app')
import { getData } from './requests'
debugger

getData('https://apis.vinmonopolet.no/products/v0/monthly-sales-per-store?fromSalesMonth=2020-01&toSalesMonth=2020-03&fromStoreId=351&toStoreId=351')
  .then(data => {
    console.log(data); 
  });