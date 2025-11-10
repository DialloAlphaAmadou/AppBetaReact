import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
    return (
        <div>
            <h1>BIENVENUE A BEN GROUP </h1>
            <p>Page de presentation des Services </p>
            <Link to="/roles" className="fw-bold fs-2 text-decoration-none me-5" > 
                ROLES
            </Link>
            
        </div>
    )
}

export default Services;