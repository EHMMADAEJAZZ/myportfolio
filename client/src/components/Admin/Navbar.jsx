import { NavLink, useNavigate } from "react-router-dom"
import { UseAppContext } from "../../context/appContext";

const Navbar = () => {
     const {loading,logout,isAuthenticated}=UseAppContext();
    const navigate = useNavigate();
    const handleLogout=()=>{
      logout();
      navigate('/');
    }
  return (
     <div className='text-sm font-medium text-center border-b border-gray-300/20 text-gray-500 '>
          <ul className='flex px-5 overflow-hidden overflow-x-scroll '>
            <li className='me-2'>
              <NavLink
                to='/admin'
               className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Intro
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to='/admin/about'
               className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                About
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to='/admin/experiences'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Experiences
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to='/admin/projects'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Projects
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to='/admin/certifications'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Certifications
              </NavLink>
            </li>
            <li className='me-2'>
              <NavLink
                to='/admin/contactinfo'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Contact
              </NavLink>
            </li >
            <li className='me-2'>
              <NavLink
                to='/admin/company-contacts'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Companies
              </NavLink>
            </li >
            <li className='me-2'>
              <NavLink
                to='/admin/profile'
                className='inline-block p-2 border-b border-transparent rounded-t-lg text-tertiary  hover:border-gray-300/50 dark:hover:text-gray-300'
              >
                Profile
              </NavLink>
            </li >
            {
              isAuthenticated  && ( <li className='me-2 w-full flex items-center justify-end'>
              <button  className={`inline-block px-4 py-1 capitalize font-semibold border rounded text-tertiary hover:bg-secondary hover:text-white hover:border-white border-tertiary ${loading?'cursor-wait':'cursor-pointer'}`} disabled={loading} onClick={handleLogout}>logout</button>
            </li>)
            }
           
          </ul>
        </div>
  )
}

export default Navbar