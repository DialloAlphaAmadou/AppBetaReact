import { Link, useNavigate } from "react-router-dom";
import { useFetch } from "../../configs/services/ServiceHooks.jsx";
import { deleteUser, getUsers } from "../../configs/services/UserService.jsx.jsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Loading, NetworkAlert } from "../../components/Components.jsx";

export const UserList = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [err, setError] = useState('');

    //Soumission pour la suppression
    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
        try{
            await deleteUser(id);
            //window.location.reload();
        }catch(ex){
            setError(ex.response?.data?.message || ex.message);
        }
    };

    const {data, loading, error} = useFetch(getUsers);

    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert/>; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>; 

    return (
        
        <>

        <Link to="/users/create" className="fw-bold text-decoration-none me-5" > 
                CREATE
        </Link>

        <h2>Users</h2>
        <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>FirstName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>UpdatedAt</th>
            <th>CreatedAt</th>
            <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
            {data?.map((v) => (
            <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.firstName}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>{v.updatedAt}</td>
                <td>{v.createdAt}</td>
                <td>
                    <Link to={`/users/${v.id}`} className="me-2 btn btn-success bi-card-checklist"> Voir</Link>
                    <Link to={`/users/edit/${v.id}`} className="me-2 btn btn-primary bi-pen-fill" > Modifier</Link>
                    <button onClick={() => handleDelete(v.id)} className="btn btn-danger bi-trash3-fill"> Supprimer</button>
                </td>
            </tr>
            ))}
        </tbody>

        </table>
        </>
    );
};