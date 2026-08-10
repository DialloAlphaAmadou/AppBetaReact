import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAccessToken, getUserFromToken, isTokenExpired } from "../localStorage/TokenStorage";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loading } from "../../components/Components";
import { loginAsync, logoutAsync } from "../services/AuthService";

//Crée un contexte vide
const AuthContext = createContext();

//Hook personnalisé pour accéder facilement au contexte
export function useAuth() {
    return useContext(AuthContext);
}

//Fournisseur de contexte
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    //const didFetch = useRef(false);

    useEffect(() => {
        const initializeAuth = () => {
            if(getAccessToken() && !isTokenExpired()){
              var userInfos = getUserFromToken();
              setUser(userInfos);
            }else{
              logOut()
            }
            setLoading(false)
        }
        initializeAuth();
    }, []);

    //LogIn
    const logIn = async (data) => {
        await loginAsync(data);
        var userInfos = getUserFromToken();
        setUser(userInfos)
    };

    //LogOut
    const logOut = async () => {
        await logoutAsync();
        setUser(null);
    };

    return ( //{children}
        <AuthContext.Provider value={{user, loading, logOut, logIn}}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}

// Verification de connexion internet
export function useNetworkStatus() {

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return isOnline;
}

//Boutton de deconnexion
export function LogoutButton() {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleLogout = async () => {
        await logOut();
        navigate("/");
    };

  return (
    <div>
        <button className="btn btn-danger w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"> </i>{t("log_out")}
        </button>
    </div>
  );
}







/*
// Verification Email
export function AuthAction() {
  const {t} = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode");

  useEffect(() => {
    switch (mode) {
      case "verifyEmail":
         //alert("verifyEmail");
        // Tu peux aussi appeler applyActionCode() ici si tu veux gérer manuellement
        navigate("/email-verified?" + searchParams.toString());
        break;
      case "resetPassword":
        //alert("resetPassword");
        navigate("/reset-password?" + searchParams.toString());
        break;
      default:
        navigate("/");
        break;
    }
  }, [mode, navigate, searchParams]);

  return <p>{t("verification_in_progress")}</p>;
}
  */

