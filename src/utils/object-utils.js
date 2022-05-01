const sortByKey = (arr, key, desc) => {
    return arr.sort((a, b) => {
        const x = a[key]
        const y = b[key]

        if (desc) {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0))
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
}

export { sortByKey }