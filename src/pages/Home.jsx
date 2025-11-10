import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../configs/services/ServiceHooks';
import { ProfilAsync } from '../configs/api/ApiClientAuth';
import { useAuth } from '../configs/api/ApiConfigs';

export default function Home() {
    const {user} = useAuth();
    if(user){
        const {data, error, loading} = useFetch(ProfilAsync);
    }
    
    return (
        <div>
            <h1>BIENVENUE A BEN GROUP </h1>
            <p>PAGE D'ACCEUIL </p>
            <Link to="/auth/codeConfirmation" className="fw-bold fs-2 text-decoration-none me-5" > 
              Account
            </Link>
            <Link to="/user" className="fw-bold fs-2 text-decoration-none me-5" > 
              USERS
            </Link>

        </div>
    )
}


