export let postToApi = () => {
    const eventName = document.getElementById('eventName');
    const eventDesc = document.getElementById('eventDesc');
    const eventAuthor = document.getElementById('eventAuthor');
    const eventDates = document.getElementsByClassName('date');
    const ul = document.getElementById('ulDate');
    let theDate = [];

    for(let i = 0, c = eventDates.length; i<c; i++) {
        theDate.push(eventDates[i].innerHTML)
    }

    for(let elem of theDate) {
        ul.firstChild.remove();
    }

    // prendre les values

    const eventNameValue = eventName.value;
    const eventDescValue = eventDesc.value;
    const eventAuthorValue = eventAuthor.value;

    // tout mettre dans un objet

    const event = {
        name: eventNameValue,
        description: eventDescValue,
        author: eventAuthorValue,
        dates: theDate,
    }

    // vider nos input

    fetch('http://localhost:3000/api/events', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }) 

    eventName.value = '';
    eventDesc.value = '';
    eventAuthor.value = '';
}