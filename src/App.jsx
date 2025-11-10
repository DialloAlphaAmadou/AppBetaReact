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
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider, useAuth } from './configs/api/ApiConfigs';
import Profil from './auth/Profil';
import ConfirmationAccount from './auth/ConfirmationAccount';
import EmailVerified from './auth/EmailVerified';
import ResetPassword from './auth/ResetPassword';
import { UserShow } from './pages/users/UserShow';

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
      `${user? [`/profil/${user.id}`,] : ""}`];
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


          {/* Gestions */}
          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/register" element={<Register />} />}
          <Route path={`/resetPassword`} element={<EmailVerified />} />
          <Route path={`/auth/codeConfirmation`} element={<ConfirmationAccount />} />
          <Route path={`/auth/emailverified`} element={<EmailVerified />} />
          <Route path={`/auth/resetPassword`} element={<ResetPassword />} />

          {/* Users */}
          {user && <Route path={`/profil/${user.id}`} element={<Profil />} />} 
          {user && <Route path="/users" element={<UserList />} />} 
          <Route path="/user" element={<UserShow />} /> 

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