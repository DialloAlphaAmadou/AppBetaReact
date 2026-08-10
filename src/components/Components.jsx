import { useTranslation } from "react-i18next";

// Message Alerte
export const NetworkAlert = () => {
    const {t} = useTranslation();
    return (
        <div className="text-center mt-5">
            <h2>🚫 {t("No_Internet_access")}</h2>
            <p>{t("Please_check_your_network_connection")}</p>
        </div>
    );
}

export const Loading = () =>{
    const {t} = useTranslation();
    return (
        <div className="text-center mt-5">
        <h1 className="spinner-border text-primary fs-5" role="status">
          <span className="visually-hidden">Chargement...</span>
        </h1>
        <p>{t("Loading")}</p>
      </div>
    );
}


//Bouton de renvoyer le code de confirmation
export function CodeConfirmButton(email) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const handleResend= async () => {
        await EmailVerifiedAsync(email);
        alert("Le code a ete envoyer.");
    };

  return (
    <div>
        <button className="btn btn-primary w-100 bi bi-box-arrow-left" onClick={handleResend}> Renvoyer le code</button>
    </div>
  );
}