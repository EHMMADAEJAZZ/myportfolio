import { Link, useLocation, useNavigate } from "react-router-dom"
import { UseAppContext } from "../context/appContext"

const Header = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const pathName = location.pathname;
  const {isAuthenticated}=UseAppContext()
  return (
    <header className="h-[10vh] min-h-[10vh] max-h-[10vh] bg-primary fixed w-full top-0 z-30 shadow-md shadow-gray-300/30">
      <div className="flex items-center h-full w-full p-5">

        <div className=" flex-1  flex justify-between items-center h-full ">
            <h2 onClick={()=>navigate('/')} className="text-secondary text-3xl font-semibold cursor-pointer">A</h2>
            <h2 className="text-white text-3xl font-semibold">A</h2>
            <h2 className="text-tertiary text-3xl font-semibold">M</h2>
        </div>
        {
          isAuthenticated &&(
        <Link to="/admin" className={`${pathName.startsWith("/admin")?"hidden":"block"} px-4 py-1 ml-4 rounded text-secondary text-sm border hover:bg-secondary hover:text-white  font-bold tracking-[1px] cursor-pointer`}>
          Account
        </Link>

          )
        }
      </div>
    </header>
  )
}

export default Header