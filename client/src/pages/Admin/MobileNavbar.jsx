import { NavLink, useNavigate } from "react-router-dom"
import { UseAppContext } from "../../context/appContext";
const MobileNavbar = ({onClick}) => {
     const {loading,logout,isAuthenticated}=UseAppContext();
    const navigate = useNavigate();
    const handleLogout=()=>{
      logout();
      navigate('/');
    }
  return (
 <div className='text-sm font-medium text-center border-b border-gray-300/20 text-gray-500 fixed flex justify-end right-0 w-full z-50  h-[80vh] bg-primary bg-opacity-75 backdrop-blur-md '>
          <ul onClick={onClick} className='flex w-full max-w-sm  px-10  flex-col items-start overflow-hidden overflow-y-auto border-l-2 shadow-xl shadow-white '>
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
              <button   className={`inline-block px-4 py-1 capitalize font-semibold border rounded text-tertiary hover:bg-secondary hover:text-white hover:border-white border-tertiary ${loading?'cursor-wait':'cursor-pointer'}`}  disabled={loading} onClick={handleLogout}>logout</button>
            </li>)
            }
           
          </ul>
        </div>
  )
}

export default MobileNavbar