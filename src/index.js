import createHTML from 'components/vinmonopolet-app';
import 'main.css';

const main = async () => {
    createHTML();
}

main().then(() => console.log('Started'));