const baseUrl = "http://localhost:8080/sneakerseekers/event";

export async function getAllEvents() {
    const init = {
        method: "GET"
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch events.");
}
export async function getOneEvent(eventId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${eventId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject(403);
    }
    return Promise.reject("Could not fetch event.");
}