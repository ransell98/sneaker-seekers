const baseUrl = "http://localhost:8080/user";

export async function createUser(user) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(user)
    }
    const response = await fetch(`${baseUrl}/create`, init);
    if (response.status === 201) {
        return Promise.resolve();
    } else if (response.status === 400) {
        const messages = await response.json();
        return Promise.reject({ status: response.status, messages });
    }
    return Promise.reject({ status: response.status });
}
export async function getUserByUsername(username) {
    const init = {
        method: "GET"
    }
    const response = await fetch(`${baseUrl}/${username}`, init);
    if (response.status === 200) {
        return response.json();
    }
    return Promise.reject({ status: response.status });
}