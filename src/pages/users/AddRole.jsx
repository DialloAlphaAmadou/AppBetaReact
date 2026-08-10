import { useTranslation } from "react-i18next";
import { useFetch } from "../../configs/services/ServiceHooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../../components/Components";
import { getAll } from "../../configs/services/RoleService";
import { useForm } from "react-hook-form";
import { ButtonSubmit, SelectField } from "../../components/Form.jsx";
import SiteConfigs from "../../configs/AppConfigs.jsx";
import { addRoleToUser } from "../../configs/services/UserService.jsx";

export const AddRole = () => {

    const {data, loading, error} = useFetch(getAll);
    const {t} = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errForm, setError] = useState('');
    

    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert />; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) 
        return <p className="text-danger text-center">{t("Notfound")}</p>; 

    //Soumission du formulaire
    const onSubmit = async (formData) => {
        try{
            formData.id = id;
            await addRoleToUser(formData);
            navigate(`/users/${id}`);
        }catch(ex){
            let exMessage = "";
            const infoData = ex.response?.data;
            if(infoData?.errors){
                const exM = Object.values(infoData?.errors).flat();
                exMessage = exM.join("\n");
            }
            if(!exMessage)
                exMessage = infoData?.message || ex.message;
            
            setError(exMessage);
        }
    }; 

    //console.log(data);

    return (
        
        <>
        <div className="">
            <Link to={`/users/${id}`} className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
        </div>

        <h2>Roles</h2>
        <table className="w-100 text-center" border="1" cellPadding="8" cellSpacing="0">
        <tbody >
            {data?.map((v) => (
            <tr key={v.id}>
                <td>{v.name}</td>
            </tr>
            ))}
        </tbody>
        </table>

        <form onSubmit={handleSubmit(onSubmit)} className="">
        {errForm && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{errForm}</div>}
        <SelectField label={"Role"} name={"name"} options={data} register={register} errors={errors} />
        <ButtonSubmit name={"Valider"} icon={"bi-check-circle-fill"} />        
        </form>
        </>
    );
};

