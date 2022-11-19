function saveToLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
}
function getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
}

export { saveToLocalStorage, getFromLocalStorage };
