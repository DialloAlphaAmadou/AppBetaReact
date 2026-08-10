import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import SiteConfigs from "../../configs/AppConfigs";
import { ButtonSubmit, CheckboxFieldLogin, PasswordFieldLogin, TextField } from "../../components/Form";
import { useAuth } from "../../configs/providers/AuthProvider";
import { Loading, NetworkAlert } from "../../components/Components";
import { getErrorMessage } from "../../configs/api/ErrorHandler";

export default function Login() {

    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {logIn} = useAuth();

    const onSubmit = async (formData) => {
        try{
            setLoading(true);
            setError(null);
            await logIn(formData);
            navigate("/");
        }catch(ex){
            setError(getErrorMessage(ex));
        }finally{
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error == "Network Error") return <NetworkAlert />; 
    if (error == "901"){
        alert("Vous devez confirmer votre adresse email pour se connecter...")
        navigate("/email-verified");
    } 

    return (
    <div className="">
        <div className="">
            <Link to="/" className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
        </div>

        <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow">

            <h2 className="text-center mb-4">{t("login")}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="">
                {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
                <TextField label={"username"} name={"Username"} register={register} errors={errors} />
                <PasswordFieldLogin register={register} errors={errors} />
                <CheckboxFieldLogin register={register} />
                <ButtonSubmit name={"log_in"} icon={"bi-box-arrow-in-right"} />        
            </form>

            <div className="text-center mt-3">
                <Link to="/email-verified" className="d-block" >{t("forgot_your_password")}</Link>
                <Link to="/register" className="d-block" >{t("create_an_account")} </Link>
            </div>

        </div>
    
    </div>
    );
}
