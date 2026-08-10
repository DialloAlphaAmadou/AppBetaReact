
export const getItemStored = (key) => {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const setItemStored = (key, value, rememberMe = false) => {
    const stored = rememberMe ? localStorage : sessionStorage;
    stored.setItem(key, value);
};

export const removeItemStored = (key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
};