import { UserCollection } from "../data"

const getUser = async (name, password) => {
    const user = await UserCollection.getUserByName(name)
    
    if (user) {
        if (user.password !== password) {
            return null
        }

        return user
    }
}

const LoginService = {
    getUser
}

export { LoginService }