import { useTranslation } from "react-i18next";
import { getOne } from "../../configs/services/RoleService";
import { useFetch } from "../../configs/services/ServiceHooks";
import { useParams } from "react-router-dom";
import { Loading, NetworkAlert } from "../../components/Components";
import { ProfilAsync } from "../../configs/api/ApiClientAuth";

export const UserShow = () => {
    const {t} = useTranslation();
    const {id} = useParams();

    //const {data, loading, error} = useFetch(() => getOne(id));
    const {data, loading, error} = useFetch(ProfilAsync);
    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert/>; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>;

    console.log(data);
    return (
        <>
            <p>Identifiant : {data.id}</p>
            <p>Email : {data.email}</p>
            <p>UserName : {data.userName}</p>
            <p>Photo : {data.pictureUrl}</p>
            <p>Prenom : {data.firstName}</p>
            <p>Nom : {data.name}</p>
            <p>Phone : {data.phoneNumber}</p>
            <p>Adresse : {data.adress}</p>
            <p>Anniversaire   : {data.dateOfBirth}</p>
            <p>Role : {data.roles.join(", ")}</p>
            <p>Created : {data.createdAt}</p>
        </>
        
    );
};