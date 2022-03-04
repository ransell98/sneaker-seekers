const baseUrl = "http://localhost:8080/sneakerseekers/listing";

export async function getListingsByTable(table) {
    const init = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(`${baseUrl}/${table.tableId}`, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject("Could not find table.");
    }
    return Promise.reject("Error fetching listings.");
}
export async function addListing(listing) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(listing)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    }
    return Promise.reject("Could not add listing.");
}