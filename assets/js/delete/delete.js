export function deleteEvent(eventId, eventDiv) {
    fetch(`http://localhost:3000/api/events/${eventId}`, { method: "DELETE" })
    .then((response) => {
        if (response.ok) {
            eventDiv.remove();
        } else {
            console.error("Erreur lors de la suppression de l'événement");
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la suppression de l'événement :", error);
    });
}