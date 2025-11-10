import { useTranslation } from "react-i18next";
import { getOne } from "../../configs/services/RoleService";
import { useFetch } from "../../configs/services/ServiceHooks";
import { Link, useParams } from "react-router-dom";
import { Loading, NetworkAlert } from "../../components/Components";
import { ProfilAsync } from "../../configs/api/ApiClientAuth";
import { delRoleToUser, getUser } from "../../configs/services/UserService.jsx";
import SiteConfigs from "../../configs/SiteConfigs.jsx";
import { useState } from "react";

export const UserShow = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const [errForm, setError] = useState("");

    //const {data, loading, error} = useFetch(() => getOne(id));
    const {data, loading, error} = useFetch(() => getUser(id));
    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert/>; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>;

    //console.log(data);

    return (
        <>
         <div className="">
            <Link to={`/users`} className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
        </div>
        <div className="border p-3 mt-2">
            <p>Identifiant : {data.id}</p>
            <p>Email : {data.email}</p>
            <p>UserName : {data.userName}</p>
            <p>Photo : {data.pictureUrl}</p>
            <p>Prenom : {data.firstName}</p>
            <p>Nom : {data.name}</p>
            <p>Phone : {data.phoneNumber}</p>
            <p>Adresse : {data.adress}</p>
            <p>Anniversaire : {data.dateOfBirth}</p>
            <p>Created : {data.createdAt}</p>

            <Link to={`/users/role/create/${data.id}`} className="fw-bold text-decoration-none me-5 " > 
                Ajouter un Role
            </Link> 
            <p>{errForm && <p className="text-danger">{errForm}</p>}</p>
            <table className="w-100" border="1" cellPadding="8" cellSpacing="0">
            <thead>
                <tr>
                    <th>Roles</th>
                    <th>Actions</th>
                </tr>
            </thead>
            
            <tbody>
                {data.roles?.map((v, index) => (
                <tr key={index}>
                    <td>{v}</td>
                    <td>
                        <BtnDelRoleToUser id={data.id} name={v} onError={(message) => setError(message)} />
                    </td>
                </tr>
                ))}
            </tbody>

            </table>
        </div>
            
        </>
        
    );
};



// Suppression du role d'un user
export function BtnDelRoleToUser({id, name, onError}){

    const handleDelete = async () => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
        try{
            const formData = { id, name };
            await delRoleToUser(formData);
            window.location.reload();
        }catch(ex){
            let exMessage = "";
            const infoData = ex.response?.data;
            if(infoData?.errors){
                const exM = Object.values(infoData?.errors).flat();
                exMessage = exM.join("\n");
            }
            if(!exMessage)
                exMessage = infoData?.message || ex.message;
            
            if (onError) onError(exMessage);
        } 
    };

    return (
        <button onClick={handleDelete} className="btn btn-danger bi-trash3-fill"> Supprimer</button>
    );

}
    