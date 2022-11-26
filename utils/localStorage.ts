function saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
}

function getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
}

function deleteFromLocalStorage(key: string) {
    localStorage.removeItem(key);
}

export { saveToLocalStorage, getFromLocalStorage, deleteFromLocalStorage };
