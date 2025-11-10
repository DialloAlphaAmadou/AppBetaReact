
import { useAuth } from "../configs/api/ApiConfigs";
import { useState } from "react";

export default function Test() {
  const { user, loading } = useAuth();

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : user ? (
        <p>Bienvenue, {user.email}</p>
      ) : (
        <p>Non connecté</p>
      )}
    </div>
  );
}

function passwordButton1(register, errors, {t}, SiteConfigs){
  const [isPass, setPass] = useState(false)
  return(
    <div className="mb-3">
            <label htmlFor="password" className="form-label ">{t("password")} :</label>
            <input type="password" id="password" placeholder={t("password")} className={`form-control border-${SiteConfigs.color} bi-info-circle-fill`}
              {...register("password", { required: `${t("password")} ${t("required")}`})}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
    </div>

  )
}
