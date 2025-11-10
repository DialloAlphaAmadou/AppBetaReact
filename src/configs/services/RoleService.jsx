import apiClient from "../api/ApiClient";

export const getAll = async () => {
    const response = await apiClient.get("/role")
    return response.data;
}

export const getOne = async (id) =>{
    const response = await apiClient.get(`/role/${id}`);
    return response.data;
}

export const getRole = async (id) =>{
    const response = await apiClient.get(`/role/admin/${id}`);
    return response.data;
}

export const created = async (datas) => {
    const response = await apiClient.post("/role", datas);
    return response.data;
}

export const updated = async (id, datas) => {
    const response = await apiClient.put(`/role/${id}`, datas);
    return response.data;
}

export const deleted = async (id) => {
    const response = await apiClient.delete(`/role/${id}`);
    return response.data;
}

export const getByRole = async (role) => {
    const response = await apiClient.get(`/role/${role}`);
    return response.data;
}

export const verifExistRole = async (role) => {
    const response = await apiClient.get(`/role/exists?roleName=${role}`);
    return response.data.exists;
}