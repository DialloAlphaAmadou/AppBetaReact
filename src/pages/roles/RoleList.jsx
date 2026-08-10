import { useTranslation } from "react-i18next";
import { deleted, getAll } from "../../configs/services/RoleService";
import { useFetch } from "../../configs/services/ServiceHooks";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading, NetworkAlert } from "../../components/Components";
import { useAuth } from "../../configs/providers/AuthProvider";

export const RoleList = () => {
    const { user } = useAuth();

    const {data, loading, error} = useFetch(getAll);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [err, setError] = useState('');
    

    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert />; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>; 

    //Soumission pour la suppression
    const handleDelete = async (id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
        try{
            await deleted(id);
            window.location.reload();
        }catch(ex){
            setError(ex.response?.data?.message || ex.message);
        }
    };
    //console.log(data);

    return (
        
        <>

        <Link to="/roles/create" className="fw-bold text-decoration-none me-5" > 
                CREATE
        </Link>

        <h2>Roles</h2>
        <table className="w-100" border="1" cellPadding="8" cellSpacing="0">
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
            {data?.map((v) => (
            <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.name}</td>
                <td>{v.roleDetail}</td>
                <td>
                    <Link to={`/roles/${v.id}`} className="me-2 btn btn-success bi-card-checklist"> Voir</Link>
                    <Link to={`/roles/edit/${v.id}`} className="me-2 btn btn-primary bi-pen-fill" > Modifier</Link>
                    {user && <button onClick={() => handleDelete(v.id)} className="btn btn-danger bi-trash3-fill"> Supprimer</button>}
                </td>
            </tr>
            ))}
        </tbody>

        </table>
        </>
    );
};

