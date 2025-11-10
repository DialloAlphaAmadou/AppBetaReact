import { jwtDecode } from "jwt-decode";

export function getToken() {
    return (
        localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
    );   
}

export function getUserFromToken() {
    const token = getToken();
    if(!token) return null;
    try{
        const decoded = jwtDecode(token);
        return {
            id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
            email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
            username: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
    }catch(err){
        return null;
    }
}

export function isTokenExpired() {
    const token = getToken();
    if (!token) return true;
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // en secondes
        return decoded.exp < now;
    } catch (error) {
        return true; // On le considère expiré si illisible
    }
}

export function cleanupTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
}