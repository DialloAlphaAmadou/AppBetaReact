import axios from "axios";
import { getAccessToken } from "../localStorage/TokenStorage";

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
})
export default apiClient;

// Ajouter le token automatiquement sur chaque requête
apiClient.interceptors.request.use(config => {
    const token = getAccessToken(); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});



/*
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si aucune réponse du serveur (backend down, CORS, timeout)
        if (error.request && !error.response) {
            //console.error("Serveur injoignable !");
            alert("⚠️ Le serveur est actuellement indisponible. Réessayez plus tard.");
            console.log(error.message);
        } 
        // Si le serveur a répondu avec un code d'erreur HTTP (404, 500, etc.)
        else if (error.response) {
            //console.error(`Erreur du serveur : ${error.response.status}`);
            alert("Erreur du serveur");
        } 
        else {
            //console.error("Erreur inconnue Axios :", error.message);
            alert("Erreur inconnue Axios");
        }
        return Promise.reject(error);
    }
);*/

