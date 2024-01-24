export let dateAdd = (date) => {
    const ulParent = document.getElementById('ulDate');
    const liAdded = document.createElement('li');
    const valeur = date.value;
    const heureNode = document.createTextNode(valeur);

    if (valeur != '') {
    liAdded.appendChild(heureNode);
    liAdded.className = `date ${valeur}`;
    ulParent.appendChild(liAdded);

    date.value = '';
    }
}