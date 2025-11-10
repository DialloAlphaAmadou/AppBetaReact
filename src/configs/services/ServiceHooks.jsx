import { useEffect, useState, useRef } from "react";
import { useNetworkStatus } from "../api/ApiConfigs";
import { useTranslation } from "react-i18next";
import { Loading, NetworkAlert } from "../../components/Components";

export const useFetch = (callback) => {

    //Verification d'internet
    //const isOnline = useNetworkStatus();
    //if (!isOnline) { return <NetworkAlert/>; }
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const didFetch = useRef(false);

    useEffect(() => {
        if(didFetch.current) return;
        didFetch.current = true;

        const fetchData = async () => {
            try {
                const result = await callback();
                setData(result);
            } catch (err) {
                const infoData = err.response?.data;
                setError(infoData?.message || err.message);
                //setError(err.response.data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [callback]);
    return {data, loading, error};
}

/*
export function CatchInfo (data, error, loading){
    const { t } = useTranslation();
    const isOnline = useNetworkStatus();

    if (!isOnline) return <NetworkAlert />;
    if (loading) return <Loading />;
    if (error) return <p className="text-danger text-center">{error}</p>;
    if (!data || (Array.isArray(data) && data.length === 0)) return <p>{t("Notfound")}</p>;

    return null;
};
*/
