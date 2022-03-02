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
export async function addTable(tableInfo) {
    console.log(JSON.stringify(tableInfo));
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(tableInfo)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 500) {
        return Promise.reject("Could not add table.");
    }
    return Promise.reject({ status: response.status });
}