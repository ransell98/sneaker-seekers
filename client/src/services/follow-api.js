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