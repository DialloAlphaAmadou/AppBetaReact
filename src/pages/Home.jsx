import React from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../configs/services/ServiceHooks';
import { useAuth } from '../configs/providers/AuthProvider';
import { getProfileAsync } from '../configs/services/Me';

export default function Home() {
    const {user} = useAuth();
    if(user){
        const {data, error, loading} = useFetch(getProfileAsync);
    }
    
    return (
        <div>
            <h1>BIENVENUE A BEN GROUP </h1>
            <p>PAGE D'ACCEUIL </p>
            <Link to="/auth/codeConfirmation" className="fw-bold fs-2 text-decoration-none me-5" > 
              Account
            </Link>
            <Link to="/users" className="fw-bold fs-2 text-decoration-none me-5" > 
              USERS
            </Link>

        </div>
    )
}


