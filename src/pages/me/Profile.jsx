import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogoutButton, useAuth } from "../../configs/providers/AuthProvider";
import appConfigs from "../../configs/AppConfigs";
import { useFetch } from "../../configs/services/ServiceHooks";
import { getProfileAsync } from "../../configs/services/Me";
import { Loading, NetworkAlert } from "../../components/Components";
import { tempsToken } from "../../configs/localStorage/TokenStorage";


export default function Profile() {
  //const isOnline = useNetworkStatus();
  //if (!isOnline) { return <NetworkAlert/>; }
  //const {exp, now}= tempsToken();
  //alert(`${exp}\n${now}`);

  const { user } = useAuth();
  const {t} = useTranslation();
  const {data, error, loading} = useFetch(getProfileAsync);

      if (loading) return <Loading />;
      if (error == "Network Error") { return <NetworkAlert />; }
      if (error) return <p className="text-danger text-center">{error}</p>;
      if (!data || (Array.isArray(data) && data.length === 0)) 
          return <p className="text-danger text-center">{t("Notfound")}</p>; 
      //console.log(data);
  return (
    <div className="col-sm-8 col-md-6 col-lg-4 mx-auto p-2 rounded shadow text-center">
      {user ? 
        <div>
          <h3>{user.username}</h3>
          <p>{data.lastName}</p>
          <p>{data.firstName}</p>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>{/*user.role.join(" ")*/}</p>
          <p>{data.roles}</p>
        </div>
      : <h3>Profil</h3> }
      <div className="mb-2">
        <Link to="/change-password" className={`btn btn-${appConfigs.color} rounded px-2 bi-person-fill-lock w-100`}> {t("Change_password")} </Link>
      </div>
      
      <LogoutButton />
    </div>
  );
}


