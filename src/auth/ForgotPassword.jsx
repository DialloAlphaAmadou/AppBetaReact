/*
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import SiteConfigs from '../configs/SiteConfigs';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configs/auths/FirebaseConfigs";
import { NetworkAlert, useAuth, useNetworkStatus } from "../configs/auths/AuthConfigs";
import { ButtonSubmit, EmailField } from "../components/Components";

export default function ForgotPassword() {

  const isOnline = useNetworkStatus();
  if (!isOnline) { return <NetworkAlert/>; }

  const {t} = useTranslation();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user} = useAuth();

  const onSubmit = async (data) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      alert(t("A_reset_link_has_been_sent_to_your_email_address"));
      //navigate("/login");
    } catch (error) {
      //console.error("Erreur :", error);
      if (error.code === "auth/user-not-found") {
        setError(t("No_users_found_with_this_email_address"));
      } else if (error.code === "auth/invalid-email") {
        setError(t("The_email_address_is_invalid"));
      } else {
        setError(t("An_error_has_occurred_please_enter_the_email_correctly") );
      }
    }
  }; 
  
  return (
    <div>
      <div className="">
        <Link to="/" className={`bi-chevron-left rounded-circle btn btn-${SiteConfigs.color}`} ></Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 shadow rounded">
        {user?(
          <h2 className="text-center mb-4">{t("Change_password")}</h2>
        ):(
          <h2 className="text-center mb-4">{t("forgotPassword")}</h2>
        )}
        
        {error && <div className="text-danger text-danger">{error}</div>}
        <EmailField name={"email"} register={register} errors={errors} />
        <ButtonSubmit name={"Check"} icon={"bi-person-check-fill"}/> 
      </form>

    </div>
      
  );
}
*/