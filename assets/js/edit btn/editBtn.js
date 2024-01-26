// Modifier le nom, l'auteur et la description d'un évènement
export function editEvent(eventId) {
    fetch(`http://localhost:3000/api/events/${eventId}`, { method: "GET" })
    .then((response) => response.json())
    .then((event) => {
        displayEditForm(event);
    })
    .catch((error) => {
        console.error("Erreur lors de la récupération de l'événement :", error);
    });
}  

function displayEditForm(event) {
    const eventDiv = document.getElementById("event-details");
    eventDiv.innerHTML = `
        <h2>Edit Event</h2>
        <form id="edit-form">
            <label for="name">Name:</label>
            <input type="text" id="name" value="${event.name}" required>
            
            <label for="description">Description:</label>
            <textarea id="description" required>${event.description}</textarea>
            
            <label for="author">Author:</label>
            <input type="text" id="author" value="${event.author}" required>
            
            <button type="submit">Save Changes</button>
        </form>`;
  
    const editForm = document.getElementById("edit-form");
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newName = document.getElementById("name").value;
        const newDescription = document.getElementById("description").value;
        const newAuthor = document.getElementById("author").value;
        updateEvent(event.id, newName, newDescription, newAuthor);
    });
}

// Fonction d'edit
function updateEvent(eventId, newName, newDescription, newAuthor) {
    const updatedEvent = {
        name: newName,
        description: newDescription,
        author: newAuthor,
    };
  
    fetch(`http://localhost:3000/api/events/${eventId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
    })
    .then((response) => {
        if (response.ok) {
            fetchData();
        } else {
            console.error("Error updating the event");
        }
    })
    .catch((error) => {
        console.error("Error updating the event:", error);
    });
}
