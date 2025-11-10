import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Loading, NetworkAlert } from "../components/Components";
import { ButtonSubmit, EmailField, TextField } from "../components/FormComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmailVerifiedAsync } from "../configs/api/ApiClientAuth";
import { useAuth } from "../configs/api/ApiConfigs";

export default function EmailVerified() {

    //const isOnline = useNetworkStatus();
    //if (!isOnline) { return <NetworkAlert/>; }

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
                await EmailVerifiedAsync(formData);
              }else{
                await EmailVerifiedAsync(formData);
              }
              sessionStorage.setItem("emailToConfirm", formData.email);
              alert("Un code a ete envoyer sur votre email");
              if(location.pathname == "/resetPassword"){
                navigate("/auth/resetPassword");
              }else{
                navigate("/auth/codeConfirmation");
              }
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