import { useTranslation } from "react-i18next";
import { getOne, getRole } from "../../configs/services/RoleService";
import { useFetch } from "../../configs/services/ServiceHooks";
import { Link, useParams } from "react-router-dom";
import { Loading, NetworkAlert } from "../../components/Components";
import { useAuth } from "../../configs/api/ApiConfigs";

export const RoleShow = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {user} = useAuth();

    const {data, loading, error} = useFetch(() => user ? getRole(id) : getOne(id));
    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert/>; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>;

    //console.log(user);
    //console.log(data);
    return (
        <>
            <p>Role : {data.name}</p>
            {user && user.role == "USER" && <p>Details : {data.concurrencyStamp}</p>}
            <p><Link to={`/roles/edit/${data.id}`} className="me-2 btn btn-primary bi-pen-fill" > Modifier</Link></p>
        </>
        
    );
};