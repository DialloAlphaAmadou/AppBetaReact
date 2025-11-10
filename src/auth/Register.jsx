
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SiteConfigs from '../configs/SiteConfigs';
import { useTranslation } from "react-i18next";
import { ButtonSubmit, ConfirmPasswordField, EmailField, PasswordField, PasswordFieldLogin, TextField } from '../components/FormComponents';
import { registerAsync } from '../configs/api/ApiClientAuth';
import { Loading, NetworkAlert } from '../components/Components';
//import { registerAsync } from '../configs/services/AuthService';

export default function Register() {

  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try{
        setLoading(true);
        setError(null);
        await registerAsync(formData);
        alert("Un code de confirmation a ete envoyer sur votre email");
        sessionStorage.setItem("emailToConfirm", formData.email);
        navigate("/auth/codeConfirmation");
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
    }finally{
      setLoading(false);
    }
    
  };

  if (loading) return <Loading />;
  if (error == "Network Error") { return <NetworkAlert />; }

  return (
    <div className="">

      <div className="">
        <Link to="/home" className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
      </div>

      <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow ">

        <h2 className="text-center mb-4">{t("create_account")}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
          <TextField label={"Name"} name={"Name"} register={register} errors={errors} />
          <TextField label={"FirstName"} name={"FirstName"} register={register} errors={errors} />
          <TextField label={"username"} name={"Username"} register={register} errors={errors} />
          <EmailField register={register} errors={errors} />
          <TextField label={"PhoneNumber"} name={"PhoneNumber"} register={register} errors={errors} required={false} />
          <PasswordField register={register} errors={errors} />
          <ConfirmPasswordField register={register} errors={errors} watch={watch}/>
          <ButtonSubmit name={"register"} icon={"bi-person-plus-fill"} />        
        </form>

        
        <div className="text-center mt-3">
          <Link to="/login" className="d-block" >{t("already_have_an_account_Log_in")}</Link>
        </div>

      </div>

    </div>
  );
}




