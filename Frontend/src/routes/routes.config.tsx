import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import { lazy, Suspense } from "react";
import About from "../pages/about/about";
import Help from "../pages/help/help";
import ProtectedRoutes from "./protectedRoutes/protectedRoutes.config";
import CalendarComponent from "../pages/calendar/calendar";

const AuthRouter = lazy(() => import('./../pages/auth/router/authRouter'));


const RoutesConfig = ({ toggleNavbarFooter }: { toggleNavbarFooter: any }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/*" element={<AuthRouter toggleNavbarFooter={toggleNavbarFooter} />} />
                <Route path="/help/*" element={<Help />} />
                <Route path="/calendar" element={
                    <ProtectedRoutes >
                        <CalendarComponent toggleNavbarFooter={toggleNavbarFooter} />
                    </ProtectedRoutes>
                } />
            </Routes>
        </Suspense>
    );
}

export default RoutesConfig;