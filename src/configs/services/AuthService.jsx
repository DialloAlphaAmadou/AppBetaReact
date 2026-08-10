import apiClient from "../api/ApiClient";
import { setToken, removeToken, getRefreshToken } from "../localStorage/TokenStorage";

//console.log(response.data);
//alert("Connexion Reussie !");
//console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);

//Register
export const registerAsync = async (datas) => {
    const response = await apiClient.post("/auth/register", datas);
    return response.data;
}

//Login
export const loginAsync = async (datas) => {
    const response = await apiClient.post("/auth/login", datas);
    const { accessToken, refreshToken, rememberMe } = response.data;
    setToken(accessToken, refreshToken, rememberMe); //Sauvegarde des tokens
    return response.data;
}

//Logout
export const logoutAsync = async () => {
    const refreshToken = getRefreshToken();
    try {
        if (refreshToken) await apiClient.post("/auth/logout", { refreshToken });
    } finally {
        removeToken();
    }
};

//Envoi du code de confirmation a partir de l'email
export const emailVerifiedAsync = async (datas) => {
    const response = await apiClient.post("/auth/send-confirm-email", datas);
    return response.data;
}

//Confirmation du mail par le code
export const confirmEmailAsync = async (datas) => {
    const response = await apiClient.post("/auth/confirm-email", datas);
    return response.data;
}

//Modifier le password a partir du code de confirmation 
export const resetPasswordAsync = async (datas) => {
    const response = await ApiClient.post("/auth/reset-password", datas);
    return response.data;
}

//Modifier le password a partir de l'ancien password
export const changePasswordAsync = async (datas) => {
    const response = await ApiClient.post("/auth/change-password", datas);
    const { accessToken, refreshToken } = response.data;
    setToken(accessToken, refreshToken, true); //Sauvegarde des tokens
    return response.data;
}







/*
export const refreshAsync = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return null;
        
        const response = await apiClient.post("/auth/refresh-token", { refreshToken });
        alert("Connexion Refresh1");
        const { accessToken, refreshToken } = response.data;
       
        
        setToken(accessToken, refreshToken, true); //Sauvegarde des tokens
        
        alert("Connexion Refresh !");
        return response.data;
    } catch (error) {
        //console.log(error.response?.data.message || error.message)
        return null;
        //console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
    }
}*/