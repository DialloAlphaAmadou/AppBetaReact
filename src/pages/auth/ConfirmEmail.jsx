import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmEmailAsync } from "../../configs/services/AuthService";

export default function ConfirmEmail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Confirmation en cours ...');
    useEffect(() => {
        const confirmEmail = async () => {
            try{
                const data = {
                    userId: searchParams.get("userId"),
                    token: searchParams.get("token")
                };
                const res = await confirmEmailAsync(data);
                console.log(res);
                setMessage(res || "Email confirmé avec succès *****");
            }catch(ex){
                let exMessage = "";
                const infoData = ex.response?.data;
                if(infoData?.errors){
                    const exM = Object.values(infoData?.errors).flat();
                    exMessage = exM.join("\n");
                }
                if(!exMessage)
                    exMessage = infoData?.message || ex.message;
                
                setMessage(exMessage);
            }
        };
        confirmEmail();
    },[searchParams]);
    return(
        <div>
            <h1>{message}</h1>
        </div>
    );
}