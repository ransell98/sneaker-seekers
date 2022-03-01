const baseUrl = "http://localhost:8080/sneakerseekers/table";

export async function getTablesByEventId(eventId) {
    const init = {
        method: "GET"
    };
    const response = await fetch(`${baseUrl}/${eventId}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch tables.");
}