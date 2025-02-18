import { Bounce,  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./pages/Footer"
import { useEffect } from 'react';
import { UseAppContext } from './context/appContext';
import Loader from './components/Loader';


function App() {
  const {fetchPortfolio,loading}=UseAppContext()
  useEffect(()=>{
    fetchPortfolio()
  },[])
  if(loading){
    return <Loader/>
  }
  return (
    <div className="overflow-hidden">
    <Header/>
   <Outlet/>
        <Footer/>
  <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
        className='max-w-lg'
      />
    </div>
  )
}

export default App
