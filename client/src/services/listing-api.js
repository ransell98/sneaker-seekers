const baseUrl = "http://localhost:8080/sneakerseekers/listing";

export async function addListing(listing) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_TOKEN")}`
        },
        body: JSON.stringify(listing)
    }
    console.log(baseUrl);
    console.log(init);
    const response = await fetch(baseUrl, init);
    console.log(response.status);
    if (response.status === 201) {
        return Promise.resolve();
    }
    return Promise.reject("Could not add listing.");
}