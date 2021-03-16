import createHTML from 'components/createHTML';
import { getData, getStoreByName } from 'components/requests'
import 'main.css';

const main = async () => {
    createHTML();
}

main().then(() => console.log('Started'));


getData('https://apis.vinmonopolet.no/products/v0/monthly-sales-per-store?fromSalesMonth=2020-01&toSalesMonth=2020-03&fromStoreId=351&toStoreId=351')
  .then(data => {
    console.log(data); 
  });

getStoreByName('holmen')
  .then(data => {
    console.log(data); 
  });