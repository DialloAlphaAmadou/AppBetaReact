import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Loading, NetworkAlert } from "../../components/Components";
import { useAuth } from "../../configs/providers/AuthProvider";
import { ButtonSubmit, ConfirmPasswordField, EmailField, OldPasswordField, PasswordField, PasswordFieldLogin, TextField } from "../../components/Form";
import { useNavigate } from "react-router-dom";
import { changePasswordAsync } from "../../configs/services/AuthService";
import { getErrorMessage } from "../../configs/api/ErrorHandler";
import { getRefreshToken } from "../../configs/localStorage/TokenStorage";

export default function ChangePassword() {

    //const isOnline = useNetworkStatus();
    //if (!isOnline) { return <NetworkAlert/>; }
    const {user} = useAuth();
    const {t} = useTranslation();
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

      const onSubmit = async (formData) => {
          try{
              setLoading(true);
              setError(null);
              formData.refreshToken = user ? getRefreshToken() : null;
              console.log(formData);
              await changePasswordAsync(formData);
              alert("Vous avez changer votre Password");
              navigate("/");
          }catch(ex){
              setError(getErrorMessage(ex));
          }finally{
              setLoading(false);
          }
      };

      if (loading) return <Loading />;
      if (error == "Network Error") { return <NetworkAlert />; }

  return (
    <div className="">
      

      <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow">

        <h2 className="text-center mb-4">Changement de mot de passe</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
          <OldPasswordField register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          <ConfirmPasswordField register={register} errors={errors} watch={watch}/>
          <ButtonSubmit name={"Valider"} icon={"bi-box-arrow-in-right"} />
        </form>

      </div>
    
    </div>
  );
}