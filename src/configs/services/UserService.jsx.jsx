import apiClient from "../api/ApiClient";

export const getUsers = async () => {
    const response = await apiClient.get("/user")
    return response.data;
}

export const getUser = async (id) =>{
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
}

export const addRoleToUser = async (dataForm) => {
    const response = await apiClient.post("/user/addRole", dataForm);
    return response.data;
}

export const delRoleToUser = async (dataForm) => {
    const response = await apiClient.post("/user/delRole", dataForm);
    return response.data;
}





export const createUser = async (userData) => {
    const response = await apiClient.post("/user", userData);
    return response.data;
}

export const updateUser = async (id, userData) => {
    const response = await apiClient.put(`/user/${id}`, userData);
    return response.data;
}

export const deleteUser = async (id) => {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
}