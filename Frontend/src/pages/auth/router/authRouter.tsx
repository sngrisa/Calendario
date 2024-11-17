import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../../../routes/protectedRoutes/protectedRoutes.config';

const Login = lazy(() => import('../login/login'));
const Register = lazy(() => import('../register/register'));

const AuthRouter = ({ toggleNavbarFooter }: { toggleNavbarFooter: any }) => {
    return (
        <Routes>
            <Route path="login" element={<Login toggleNavbarFooter={toggleNavbarFooter} />} />
            <Route path="register" element={<Register toggleNavbarFooter={toggleNavbarFooter} />} />
        </Routes>
    );
}

export default AuthRouter;