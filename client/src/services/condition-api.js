const baseUrl = "http://localhost:8080/sneakerseekers/condition";

export async function getAllConditions() {
    const init = {
        method: "GET"
    }
    const response = await fetch(baseUrl, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject("Could not fetch conditions.");
}