import { jwtDecode } from "jwt-decode";
import { getItemStored, removeItemStored, setItemStored } from "./ItemsStorage";

export const setToken = (accessToken, refreshToken, rememberMe = false) => {
    setItemStored("accessToken", accessToken, rememberMe);
    setItemStored("refreshToken", refreshToken, rememberMe);
};

export const getAccessToken = () => {
    return getItemStored("accessToken");
};

export const getRefreshToken = () => {
    return getItemStored("refreshToken");
};

export const removeToken = () => {
    removeItemStored("accessToken")
    removeItemStored("refreshToken");
};

export const isTokenExpired = () => {
    const token = getAccessToken();
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        if (!decoded.exp) return true;
        const now = Date.now() / 1000; // en secondes
        return decoded.exp <= now;
    } catch {
        return true;
    }
};

export const getUserFromToken = () => {
    const token = getAccessToken();
    if(!token) return null;
    try{
        const decoded = jwtDecode(token);
        if (!decoded.exp) return null;
        return {
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
    }catch {
        return null;
    }
}


