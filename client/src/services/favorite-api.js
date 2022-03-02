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
    console.log(init.body);
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return response.json();
    }
    return Promise.reject("Could not add favorite.");
}
export async function deleteFavorite(style) {
    
}