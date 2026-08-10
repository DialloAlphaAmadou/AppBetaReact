import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import {ThemeProvider } from './components/ThemeToggle';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Settings from './pages/Settings';
import { RoleList } from './pages/roles/RoleList';
import { RoleShow } from './pages/roles/RoleShow';
import { UserList } from './pages/users/UserList';
import { RoleForm } from './pages/roles/RoleForm';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/me/Profile';
import ConfirmationAccount from './pages/auth/ConfirmationAccount';
import EmailVerified from './pages/auth/EmailVerified';
import ResetPassword from './pages/auth/ResetPassword';
import { UserShow } from './pages/users/UserShow';
import { AddRole } from './pages/users/AddRole';
import ChangePassword from './pages/auth/ChangePassword';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import { AuthProvider, useAuth } from './configs/providers/AuthProvider';

export default function App() {

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


function AppContent() {
    const {user} = useAuth();
    const location = useLocation();
    const authPaths = ["/login", "/register", "/password", "/auth/action", "", "/test"];
    const knownPaths = ["/", "/home", "/about", "/contact", "/services", "/setting", 
      `${user? [`/${user.id}`,] : ""}`];
    const hideHeaderFooter = knownPaths.includes(location.pathname);
    
  return (
    <>
      {hideHeaderFooter && <Header />}

      <div className={`${hideHeaderFooter? "container pt-5 mt-md-5 mt-2" : "container py-1 mt-1" }`}>
        <Routes>

          {/* Pages publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/setting" element={<Settings />} />


          {/* Gestions d'authentification */}
          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/register" element={<Register />} />}
          <Route path="/confirm-email" element={<ConfirmEmail />} />
          <Route path="/confirm-account" element={<ConfirmationAccount />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {user && <Route path="/change-password" element={<ChangePassword />} />}

          {/* Profile */}
          {user && <Route path={`/${user.id}`} element={<Profile />} />} 

          {/* Users */}
          {user && <Route path="/users" element={<UserList />} />} 
          <Route path="/users" element={<UserList />} /> 
          <Route path="/users/:id" element={<UserShow />} /> 
          <Route path="/users/role/create/:id" element={<AddRole />} /> 
          <Route path="/users/role/edit/:id" element={<UserShow />} /> 

          {/* Roles */}
          <Route path="/roles" element={<RoleList />} /> 
          <Route path="/roles/:id" element={<RoleShow />} /> 
          <Route path="/roles/create" element={<RoleForm />} /> 
          <Route path="/roles/edit/:id" element={<RoleForm isEdit />} />   

        </Routes>
      </div>
      {hideHeaderFooter && <Footer />}
    </>
  );
}


/*
{user && <Route path="/profil" element={<Profil />} />}
function AppContent() {
   return (
    <>
      <Header />
      <div className='container pt-5 mt-md-5 mt-2'>
        <Routes>
          {// Pages publiques }
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/setting" element={<Settings />} /> 

          <Route path="/users" element={<UserList />} /> 
          
          <Route path="/roles" element={<RoleList />} /> 
          <Route path="/roles/:id" element={<RoleShow />} /> 
          <Route path="/roles/create" element={<RoleForm />} /> 
          <Route path="/roles/edit/:id" element={<RoleForm isEdit />} /> 

        </Routes>
      </div>
      <Footer />
    </>
  );
}

*/

/*
export default function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
*/