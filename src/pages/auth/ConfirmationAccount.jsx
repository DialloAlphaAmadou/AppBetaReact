import { useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../../configs/localStorage/TokenStorage";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CodeConfirmButton, Loading, NetworkAlert } from "../../components/Components";
import { ButtonSubmit, EmailField, TextField } from "../../components/Form";
import { getItemStored, removeItemStored } from "../../configs/localStorage/ItemsStorage";
import { getErrorMessage } from "../../configs/api/ErrorHandler";

export default function ConfirmationAccount() {

    //const isOnline = useNetworkStatus();
    //if (!isOnline) { return <NetworkAlert/>; }
    
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState(null);
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm();
    
      useEffect(() => {
        const storedEmail  = getItemStored("email");
        if (!storedEmail ) {
          navigate("/email-verified");
        }else{
          setEmail(storedEmail);
        }
      }, [navigate]);

      const onSubmit = async (formData) => {
          try{
              setLoading(true);
              setError(null);
              formData.email = email;
              await ConfirmationCodeAsync(formData);
              removeItemStored("email");
              alert("Votre compte a ete comfirmer");
              navigate("/login");
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

        <h2 className="text-center mb-4">Entrez le code</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
          <TextField label={"Code"} name={"Code"} register={register} errors={errors} />
          <ButtonSubmit name={"Valider"} icon={"bi-box-arrow-in-right"} />
        </form>
        <div className="pt-2">
          {email &&<CodeConfirmButton email={email}/>}
        </div>
        

      </div>
    
    </div>
  );
}