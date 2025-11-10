import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SiteConfigs from "../configs/SiteConfigs";
import { LogoutButton, useAuth } from "../configs/api/ApiConfigs";
import { useFetch } from "../configs/services/ServiceHooks";
import { ProfilAsync } from "../configs/api/ApiClientAuth";
import { Loading } from "../components/Components";

export default function Profil() {
  //const isOnline = useNetworkStatus();
  //if (!isOnline) { return <NetworkAlert/>; }

  const { user } = useAuth();
  const {t} = useTranslation();
  const {data, error, loading} = useFetch(ProfilAsync);

      if (loading) return <Loading />;
      if (error == "Network Error") { return <NetworkAlert />; }
      if (error) return <p className="text-danger text-center">{error}</p>;
      if (!data || (Array.isArray(data) && data.length === 0)) 
          return <p className="text-danger text-center">{t("Notfound")}</p>; 
     
  return (
    <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow text-center">
      {user ? 
        <div>
          <h3>{user.username}</h3>
          <p>{data.name}</p>
          <p>{data.firstName}</p>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      : <h3>Profil</h3>}
      <div className="mb-2">
        <Link to="/resetPassword" className={`btn btn-${SiteConfigs.color} rounded px-2 bi-person-fill-lock w-100`}> {t("Change_password")} </Link>
      </div>
      
      <LogoutButton />
    </div>
  );
}


