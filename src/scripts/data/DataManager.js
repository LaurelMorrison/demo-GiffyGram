export const getUsers = () => {

    return fetch("http://localhost:8088")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}

export const getPosts = () => {

    return fetch("http://localhost:8088/posts")
    .then(response => response.json())
    .then(parsedResponse => {
        return parsedResponse;
    })
}