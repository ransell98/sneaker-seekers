const baseUrl = "http://localhost:8080/sneakerseekers/follow";

export async function getAllFollowsByUserId() {
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject({ status: response.status });
}
export async function addFollow(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(user)
    };
    const response = await fetch(baseUrl, init);
    if (response.status === 201) {
        return Promise.resolve();
    }
    return Promise.reject({ status: response.status });
}
export async function deleteFollow(vendorId) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        }
    }
    const response = await fetch(`${baseUrl}/${vendorId}`, init);
    if (response.status === 204) {
        return Promise.resolve();
    } else if (response.status === 400) {
        return Promise.reject("Bad request.");
    }
    return Promise.reject("Error while deleting follow.");
}