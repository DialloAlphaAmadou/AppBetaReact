import { useTranslation } from "react-i18next";
import { created, getOne, updated } from "../../configs/services/RoleService";
import { useFetch } from "../../configs/services/ServiceHooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ButtonSubmit, TextAreaField, TextField } from "../../components/FormComponents";
import SiteConfigs from "../../configs/SiteConfigs";
import { Loading, NetworkAlert } from "../../components/Components";

export const RoleForm = ({isEdit = false}) => {

    const {t} = useTranslation();
    const {id} = useParams();
    const [errForm, setError] = useState('');
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    //Recuperation des donnees 
    const {data, loading, error} = isEdit && id 
        ? useFetch(() => getOne(id)) 
        : {data: null, loading: false, error: null};
    
    
    //Placement des donnees dans le formulaire
    useEffect(() => {
        if(data) reset(data);
    }, [data, reset]);
    
    //Soumission du formulaire
    const onSubmit = async (formData) => {
        try{
            if(isEdit){
                await updated(id, formData);
            }else{
                await created(formData);
            }
            navigate("/roles");
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
    //Gestion des exceptions
    if (loading) return <Loading />;
    if (error == "Network Error") { return <NetworkAlert/>; }
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (isEdit && (!data || (Array.isArray(data) && data.length === 0))) 
        return <p className="text-danger text-center">{t("Notfound")}</p>;


    //Formulaire
    return (
        <div className="">

            <div className="">
                <Link to="/roles" className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
            </div>

            <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow ">

                <h2 className="text-center mb-4"> { isEdit ? t("Updated") : t("Created")}</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="">
                {errForm && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{errForm}</div>}
                <TextField label={"Role"} name={"name"} register={register} errors={errors} />
                <ButtonSubmit name={"Check"} icon={"bi-check-circle-fill"} />        
                </form>

            </div>

        </div>
    );
};