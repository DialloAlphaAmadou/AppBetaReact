import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Loading, NetworkAlert } from "../../components/Components";
import { ButtonSubmit, EmailField, TextField } from "../../components/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../configs/providers/AuthProvider";
import { emailVerifiedAsync } from "../../configs/services/AuthService";
import { setItemStored } from "../../configs/localStorage/ItemsStorage";
import { getErrorMessage } from "../../configs/api/ErrorHandler";

export default function EmailVerified() {

    const location = useLocation();
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {user} = useAuth();

      const onSubmit = async (formData) => {
          try{
              setLoading(true);
              setError(null);
              if(user){
                formData.email = user.email;
                await emailVerifiedAsync(formData);
              }else{
                await emailVerifiedAsync(formData);
              }
              setItemStored("email", formData.email);
              alert("Un code a ete envoyer sur votre email");
              if(location.pathname == "/reset-password"){
                navigate("/reset-password");
              }else{
                navigate("/code-confirmation");
              }
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

        <h2 className="text-center mb-4">{!user && "Entrez votre mail"}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
          {user ? <p>Validez pour recevoir le code de confirmation sur {user.email}</p> : <EmailField register={register} errors={errors} />}
          <ButtonSubmit name={"Valider"} icon={"bi-box-arrow-in-right"} />
        </form>
        

      </div>
    
    </div>
  );
}