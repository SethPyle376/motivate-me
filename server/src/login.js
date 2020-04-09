const login = (user, password) => {
    if (user === `seth` && password === `test`) {
        return true
    } else {
        return false
    }
}


export {
    login
}