import { deleteEvent } from "../delete/delete";
import { editEvent } from "../edit btn/editBtn";

// Création de l'html et affichage des tableaux contenant les événements
const allEvents = document.getElementById("events");
let nameArray = [];
let updatedData = [];
let newData = [];


export function displayEvents(data) {
    allEvents.innerHTML = "";
    let idCb = 0;
    // let idEvent = 0;
    data.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add('eventBox');
        eventDiv.innerHTML = `<h2 class="events__title">${event.name}</h2>
        <p class="events__description">${event.description}</p>
        <p class="events__author">${event.author}</p>
        <button class="events__edit-button edit-button" data-id="${event.id}">Edit Event</button>
        <button class="events__delete-button delete-button" data-id="${event.id}">Delete Event</button>`;
        const table = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = "Attendees\\Dates";
        tr.appendChild(th);
        event.dates.forEach((date) => {
            const th = document.createElement("th");

            th.textContent = date.date;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        event.dates[0].attendees.forEach((attendee) => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = attendee.name;
            if (!nameArray.includes(attendee.name)) {
                nameArray.push(attendee.name);
            }
            tr.appendChild(td);
            event.dates.forEach((date) => {
                const td = document.createElement("td");
                td.textContent = date.attendees.find((a) => a.name === attendee.name).available;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        eventDiv.appendChild(table);
        allEvents.appendChild(eventDiv);
        // DELETE BUTON ------------------
        const deleteButton = eventDiv.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            const eventId = deleteButton.getAttribute("data-id");
            deleteEvent(eventId, eventDiv);
        });

        const form = document.createElement("form");
        const nameInput = document.createElement("input");
        nameInput.classList.add('nameInput');
        nameInput.type = "text";
        nameInput.placeholder = "Nom du participant";
        form.appendChild(nameInput);

        const checkboxDiv = document.createElement("div");
        event.dates.forEach((apiDate) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("id", `checkbox ${idCb}`);
            checkbox.setAttribute("class", `checkbox ${idCb}`);
            checkbox.name = `${apiDate.date}`;
            checkbox.addEventListener("change", () => {
                const participantName = nameInput.value;
                if (nameArray.includes(participantName)) {
                    for (let i = 0; i < updatedData.length; i++) {
                        if (updatedData[i].id === event.id) {
                            if (updatedData[i].name === participantName) {
                                if (updatedData[i].date === apiDate.date) {
                                    if (checkbox.checked) {
                                        updatedData[i].available = true;
                                    } else {
                                        updatedData[i].available = false;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (checkbox.checked) {
                        newData.push({ date: apiDate.date, available: true })
                    } else {
                        newData.push({ date: apiDate.date, available: false })
                    }
                }
            });
            const label = document.createElement("label");
            label.setAttribute("for", `checkbox ${idCb}`);
            label.textContent = apiDate.date;

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);
            apiDate.attendees.forEach(attendee => {
                updatedData.push({ id: event.id, name: attendee.name, date: apiDate.date, available: attendee.available });
            });
            idCb++;
        });

        form.appendChild(checkboxDiv);
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            const participantName = nameInput.value;
            updateParticipantAvailability(event.id, participantName);
        });
        form.appendChild(submitButton);
        eventDiv.appendChild(form);
        // idEvent++;
        const editButton = eventDiv.querySelector(".events__edit-button");
        editButton.addEventListener("click", () => {
            const eventId = editButton.getAttribute("data-id");
            editEvent(eventId);
        });
    });
}

// Mise à jour de la disponibilité du participant
function updateParticipantAvailability(eventId, participantName) {
    // let id = 0;
    let dataToAdd = [];
    if (nameArray.includes(participantName)) {
        updatedData.forEach(data => {
            if (data.id === eventId) {
                if (data.name === participantName) {
                    dataToAdd.push({ date: data.date, available: data.available });
                }
            }
        });
        fetch("http://localhost:3000/api/events/")
            .then((response) => response.json())
            .then((json) => {
                json.forEach(obj => {
                    if (obj.id === eventId) {
                        obj.dates.forEach(apiDate => {
                            apiDate.attendees.forEach(attend => {
                                if (attend.name === participantName) {
                                    // console.log(eventId, participantName);
                                    fetch(`http://localhost:3000/api/events/${eventId}/attend`, {
                                        method: "PATCH",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({ name: participantName, dates: dataToAdd })
                                    })
                                        .then((response) => response.json())
                                        .then((json) => {
                                            console.log(json);
                                        })
                                        .catch((error) => {
                                            console.error(
                                                "Erreur lors de la mise à jour de la disponibilité du participant :", error
                                            );
                                        });
                                }
                            });
                        });
                    }
                    // else{
                    //     console.log("ko");
                    // }
                });
            });
    } else {
        fetch("http://localhost:3000/api/events/")
            .then((response) => response.json())
            .then((json) => {
                json.forEach(obj => {
                    if (obj.id === eventId) {
                        fetch(`http://localhost:3000/api/events/${eventId}/attend`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name: participantName, dates: newData })
                        })
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                            })
                            .catch((error) => {
                                console.error(
                                    "Erreur lors de la mise à jour de la disponibilité du participant :", error
                                );
                            });
                    }
                });
            });
        nameArray.push(participantName);
        // updatedData.push({name: participantName, date})
        fetch("http://localhost:3000/api/events/")
            .then((response) => response.json())
            .then((json) => {
                json.forEach(event => {
                    event.dates.forEach(apiDate => {
                        apiDate.attendees.forEach(attendee => {
                            if (attendee.name === participantName) {
                                updatedData.push({ id: event.id, name: attendee.name, date: apiDate.date, available: attendee.available });
                            }
                        });
                    });
                });
            });
    }
    location.reload();
}
