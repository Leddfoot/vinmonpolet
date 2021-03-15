async function createHTML() {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode('Babel-Boilerplate!');
    
    div.className = 'main';
    h1.appendChild(h1Text);    
    document.body.appendChild(div);
    div.appendChild(h1);

}

export default createHTML;

