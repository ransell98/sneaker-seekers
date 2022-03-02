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
    console.log(localStorage.getItem("BG_TOKEN"));
    const init = {
        method: "POST",
        headers: {
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