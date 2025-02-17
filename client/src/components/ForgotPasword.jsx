import { useState } from "react"
import InputText from "../UI/InputText";
import { userApis } from "../common/services";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPasword = () => {
    const [email, setEmail] = useState("");
    const [isError, setIsError] = useState("");
    const [message, setMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false)
   
    const validateEmail =(email)=>{
        let error;
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!re.test(email)){
            error = "Invalid email address";
        }
        return error;
        
    }
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const error =validateEmail(email)
        setIsError(error);
        if(error){
           return;
        }
        setIsLoading(true);
        try {
          const response = await userApis.forgotPassword(email);
          toast.success(response?.message)
          setMessage(response?.message)
          
        } catch (error) {
          toast.error(error?.message);
        }finally{
          setIsLoading(false);
        }
    }
  return (
    <div className="mt-[10vh] min-h-[70vh] w-full p-5 flex items-center justify-center">
        <div className="w-full  max-w-md mx-auto border rounded-lg shadow-lg bg-primary">
            <form onSubmit={handleSubmit} className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg bg-transparent'>
                <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
            Forgot password
          </h1>
          <div className='flex flex-col gap-2'>
            <InputText
            label="email"
            type='email'
            placeholder='enter your email address'
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            disabled={isLoading}
            
            />
            {
                isError && (
                    <p className='text-red-500 text-xs'>{isError}</p>
                )
            }
          </div>
          <div className="flex text-blue-600 items-center capitalize tracking-[2px]  -mt-3 hover:underline underline-offset-4">
            <Link to="/admin/auth">login</Link>
          </div>
          <div>
            {
              message && (
                <p className='text-green-500 text-xs'>{message}</p>
              )
            }
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='px-4 py-2 border border-tertiary text-white bg-primary  transition-all duration-300 ease-in-out text-sm shadow-gray-300/40 shadow-md font-bold tracking-widest rounded-md hover:bg-secondary ' disabled={isLoading}>
              {isLoading? 'Loading...' : 'Send Reset Link'}
            </button>
          </div>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasword