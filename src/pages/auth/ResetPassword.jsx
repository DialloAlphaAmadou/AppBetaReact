import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

    //const isOnline = useNetworkStatus();
    //if (!isOnline) { return <NetworkAlert/>; }
    
    const {t} = useTranslation();
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState(null);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    
      useEffect(() => {
        const storedEmail  = sessionStorage.getItem("emailToConfirm");
        if (!storedEmail ) {
          navigate("resetPassword");
        }else{
          setEmail(storedEmail);
        }
      }, [navigate]);

      const onSubmit = async (formData) => {
          try{
              setLoading(true);
              setError(null);
              formData.email = email;
              await ResetPasswordAsync(formData);
              sessionStorage.removeItem("emailToConfirm");
              alert("Votre mot de passe a ete modifier");
              navigate("/");
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

        <h2 className="text-center mb-4">Entrez le code</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          {error && <div className="text-warning bg-danger bg-opacity-2 p-1 rounded-1">{error}</div>}
          <TextField label={"Code"} name={"Code"} register={register} errors={errors} />
          <PasswordField register={register} errors={errors} />
          <ConfirmPasswordField register={register} errors={errors} watch={watch}/>
          <ButtonSubmit name={"Valider"} icon={"bi-box-arrow-in-right"} />
        </form>
        <div className="pt-2">
          {email &&<CodeConfirmButton email={email}/>}
        </div>
        

      </div>
    
    </div>
  );
}
  