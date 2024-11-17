import './App.css';
import RoutesConfig from './routes/routes.config';
import Footer from './shared/footer/footer';
import Navbar from './shared/navbar/navbar';
import { useState } from 'react';

function App() {
  const [showNavbarFooter, setShowNavbarFooter] = useState(true);

  const toggleNavbarFooter = () => {
    setShowNavbarFooter(prev => !prev);
  };

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <div className='cursor-pointer mt-30'>
        <RoutesConfig toggleNavbarFooter={toggleNavbarFooter} />
      </div>
      {showNavbarFooter && <Footer />}
    </>
  );
}

export default App;
