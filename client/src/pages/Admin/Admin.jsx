import { Outlet } from 'react-router-dom';
import Loader from '../../components/Loader';
import Navbar from '../../components/Admin/Navbar';
import { UseAppContext } from '../../context/appContext';
import MobileNavbar from './MobileNavbar';
import { useState } from 'react';

const Admin = () => {
     const {loading}=UseAppContext();
     const [showMenu, setShowMenu] = useState(false)
    if(loading){
        return <Loader/>
    }
    const toggleMenu = ()=>{
      setShowMenu(!showMenu)
    }
  return (
    <section className='bg-primary min-h-screen'>
      <div className='pt-20 '>
        <div className='hidden sm:block'>

        <Navbar/>
        </div>
        <div className='w-full sm:hidden flex items-center px-5 py-2 justify-end border-b-2'>
          <button onClick={toggleMenu} className='cursor-pointer '>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="rgba(250,240,240,1)"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
          </button>
        </div>
        {
          showMenu && (
            <MobileNavbar  onClick={toggleMenu}/>
          )
        }
       
        <div className='min-h-[80vh] max-h-[80vh] scrollbar-none overflow-hidden overflow-y-scroll'>
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Admin;
