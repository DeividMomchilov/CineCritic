const baseUrl = 'http://localhost:3030/jsonstore'

export default async function request(url, method, data) {
    let options = {};

    if (method) {
        options.method = method;
    }

    if (data) {
        options.headers = {
            'content-type': 'application/json',
        };

        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${baseUrl}${url}`, options);

    if (!response.ok) {
        throw response.statusText;
    }

    const result = await response.json();

    return result;
}
