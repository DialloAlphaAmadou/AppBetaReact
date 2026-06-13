import ApiClient from "./ApiClient";
import { cleanupTokens } from "./TokenConfig";

//Register
export const RegisterAsync = async (datas) => {
    const response = await ApiClient.post("/auth/register", datas);
    return response.data;
}

//Login
export const LogInAsync = async (datas) => {
    const response = await ApiClient.post("/auth/login", datas);
    const { accessToken, refreshToken } = response.data;
    
    //Sauvegarde des tokens
    if (datas.rememberMe) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    } else {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
    }

    alert("Connexion Reussie !");
    //return response.data;
}

//Logout
export const LogOutAsync = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
        if (!refreshToken) return null;
        
        //const response = await ApiClientAuth.post("/auth/logout", { refreshToken });
        const response = await ApiClient.post("/auth/signout");

        // Nettoyage 
        cleanupTokens();

        alert("Déconnexion Reussie !");
        //return response.data;
    } catch (error) {
        cleanupTokens();
    }
}

//Renvoi du lien de confirmation a partir de l'email
export const EmailVerifiedAsync = async (datas) => {
    const response = await ApiClient.post("/auth/send-confirm-email", datas);
    return response.data;
}

//Confirmation du mail
export const ConfirmEmailAsync = async (datas) => {
    const response = await ApiClient.post("/auth/confirm-email", datas);
    return response.data;
}
export const ConfirmationCodeAsync = async (datas) => {
    const response = await ApiClient.post("/auth/confirm-email", datas);
    return response.data;
}

//Modifier le password a partir du code de confirmation 
export const ResetPasswordAsync = async (datas) => {
    const response = await ApiClient.post("/auth/resetPassword", datas);
    return response.data;
}

//Modifier le password a partir de l'ancien password
export const ChangePasswordAsync = async (datas) => {
    const response = await ApiClient.post("/auth/changePassword", datas);
    return response.data;
}

//Profil token profil
export const ProfilAsync = async () => {
    const response = await ApiClient.get("/me/profil");
    return response.data;
}




