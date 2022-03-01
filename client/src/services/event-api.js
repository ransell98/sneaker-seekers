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
