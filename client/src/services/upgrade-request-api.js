const baseUrl = "http://localhost:8080/sneakerseekers/upgraderequest";

export async function getAllUpgradeRequests() {
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch upgrade requests.");
}
export async function createUpgradeRequest() {
    const init = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    }
    return Promise.reject("Could not create upgrade request.");
}
export async function deleteUpgradeRequest() {
    const init = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(baseUrl, init);
    //if (response.status ===)
}