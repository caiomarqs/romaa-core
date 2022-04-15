let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const getUserByName = async (name) => {
    return await localCollection.findOne({
        name
    }, {
        projection: {
            password: 1
        }
    })
}

const UserCollection = {
    init,
    getUserByName
}

export { UserCollection }