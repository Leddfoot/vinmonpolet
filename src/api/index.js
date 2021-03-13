export async function getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const json = await response.json();

    return json;
}

export async function getFruitByName (fruit) {
    const response = await fetch(`http://tropicalfruitandveg.com/api/tfvjsonapi.php?search=${fruit}mode='no-cors'`)
    const json = await response.json();

    return json;
}