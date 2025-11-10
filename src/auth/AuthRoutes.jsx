import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default function AuthRoutes() {

    //const {user} = useAuth();
    return ( 
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}
/*
            {user && <Route path="/test" element={<Test />} />}
            {!user && <Route path="/login" element={<Login />} />}
            {!user && <Route path="/register" element={<Register />} />}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/email-verified" element={<EmailVerified />} />
            <Route path="/password" element={<ForgotPassword />} />
            <Route path="/auth/action" element={<AuthAction />} />*/