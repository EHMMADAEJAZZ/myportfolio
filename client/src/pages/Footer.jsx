import { useLocation } from "react-router-dom"

const Footer = () => {
  const location = useLocation();
 
  return (
    <footer className={`h-[10vh] min-h-[10vh] bg-primary fixed w-full bottom-0 z-30  left-0 right-0 ${location?.pathname?.startsWith('/admin')? "hidden":"block"}`}>
        <div className=" container
         mx-auto  h-full opacity-60">
          <div className="h-[1px] w-full bg-gray-700"></div>
          <div className="p-3 flex lg:items-center justify-center flex-col text-white text-[10px] sm:text-sm tracking-wider">
            <p>Design and developed By</p>
            <p>Aijaz Ahmad Mathanji</p>
          </div>
         </div>
    </footer>
  )
}

export default Footer