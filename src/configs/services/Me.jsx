import apiClient from "../api/ApiClient";

export const getProfileAsync = async () => {
    const response = await apiClient.get("/me/profile");
    return response.data;
}