import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const MainHelp = lazy(() => import('../mainHelp/mainHelp'));
const Contact= lazy(() => import('../contact/contact'));
const Legal = lazy(() => import('../legal/legal'));


const HelpRouter = () => {
    return (
        <Routes>
            <Route path="/" index element={<MainHelp />} />
            <Route path="legal" element={<Legal />} />
            <Route path='contact' element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default HelpRouter;