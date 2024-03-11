const get = async (url) => {

    const headers = { 'X-Api-Key': process.env.REACT_APP_QUOTES_API_KEY };
    const res = await fetch(url, { headers: { ...headers } }, { contentType: 'application/json' });
    if (!res.ok) {
        console.log("An error occured: " + res.status + " at " + res.url);
    }
    const response = await res.json();

    return response;

}
const post = async (username, password) => {

    const validUser = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    if (!username || !password) {
        console.log("condi1")
        return Promise.reject(new Error('INVALID REQUEST', 400));


    }
    if (username !== validUser || password !== validPassword) {
        console.log("condi2")
        return Promise.reject(new Error('UNAUTHORISED', 400));
    }
    console.log("condi3")

    return Promise.resolve({ username }, 200);
}




export const client = { get, post };