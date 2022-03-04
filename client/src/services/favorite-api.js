const baseUrl = "http://localhost:8080/sneakerseekers/favorite";

export async function getAllFavorites() {
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    } else if (response.status === 404) {
        return Promise.reject(404);
    }
    return Promise.reject("Could not fetch favorites.");
}
export async function createFavorite(style) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(style)
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return response.json();
    }
    return Promise.reject("Could not add favorite.");
}
export async function deleteFavorite(style) {
    const init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(style)
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 204) {
        return Promise.resolve();
    } else if (response.status === 404) {
        return Promise.reject("Could not find favorite to delete.");
    }
    return Promise.reject("Error in deleting favorite.");
}
export async function findIfExisting(externalStyleId) {
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/${externalStyleId}`, init);
    if (response.status === 204) {
        return Promise.resolve(true);
    } else if (response.status === 404) {
        return Promise.resolve(false);
    }
    return Promise.reject("Could not complete findIfExisting fetch.");
}