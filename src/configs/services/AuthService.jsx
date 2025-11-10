import apiClient from "../api/ApiClient";
import { cleanupTokens } from "../api/TokenConfig";

export const registerAsync = async (datas) => {
    const response = await apiClient.post("/auth/register", datas);
    return response.data;
}

export const loginAsync = async (datas) => {
    const response = await apiClient.post("/auth/login", datas);
    const { accessToken, refreshToken } = response.data;

    //Sauvegarde des tokens
    if (datas.rememberMe) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("rememberMe", "true");
    } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
    }

    alert("Connexion Reussie !");
    return response.data;
}

export const logoutAsync = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
        if (!refreshToken) return null;
        
        const response = await apiClient.post("/auth/logout", { refreshToken });

        // Nettoyage 
        cleanupTokens();

        alert("Déconnexion Reussie !");
        return response.data;
    } catch (error) {
        //alert(error.response?.data || error.message)
        //console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
        cleanupTokens(); // On nettoie quand même côté client
    }
}

export const refreshAsync = async () => {
    try {
        const rToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
        if (!rToken) return null;
        
        const response = await apiClient.post("/auth/refresh-token", { refreshToken: rToken });
        alert("Connexion Refresh1");
        const { accessToken, refreshToken } = response.data;
       
        //Sauvegarde des tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("rememberMe", "true");
        
        alert("Connexion Refresh !");
        return response.data;
    } catch (error) {
        //console.log(error.response?.data.message || error.message)
        return null;
        //console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
    }
}