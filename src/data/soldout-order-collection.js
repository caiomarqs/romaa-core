let localCollection = null;

const init = (colletion) => {
    if (localCollection == null) {
        localCollection = colletion
    }
}

const saveOrder = () => {}

const SoldoutOrderCollection = {
    init,
    saveOrder
}

export { SoldoutOrderCollection }