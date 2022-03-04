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
export async function findIfExisting() {
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/findIfExist`, init);
    if (response.status === 204) {
        return Promise.resolve(true);
    } else if (response.status === 404) {
        return Promise.resolve(false);
    }
    return Promise.reject("Could not complete findIfExisting fetch.");
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
export async function acceptUpgradeRequest(upgradeRequest) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(upgradeRequest)
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return Promise.resolve();
    } else if (response.status === 304) {
        return Promise.reject("Could not update user to vendor status.");
    } else if (response.status === 404) {
        return Promise.reject("Could not find upgrade request to delete.");
    }
    return Promise.reject("Unknown error in accepting upgrade request.");
}
export async function deleteUpgradeRequest(upgradeRequestId) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/${upgradeRequestId}`, init);
    if (response.status === 204) {
        return Promise.resolve();
    }
    return Promise.reject("Could not delete upgrade request.");
}