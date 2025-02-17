import { useEffect, useState } from 'react';
import InputText from '../../UI/InputText';
import { Link, useNavigate } from 'react-router-dom';
import { userApis } from '../../common/services';
import { UseAppContext } from '../../context/appContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, fetchPortfolio } =
    UseAppContext();
  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const validateinputs = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Invalid email format';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateinputs(user);
    setIsError(errors);
    setIsLoading(true);
    if (Object.values(errors).length > 0) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await userApis.login(user);
      if (response.statusCode == 200 && response.success) {
        setIsAuthenticated(true);
        navigate('/admin');
        toast.success(response?.message);
        fetchPortfolio();
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='fixed w-full flex items-center justify-center  right-0 left-0 top-0 bottom-0 bg-primary z-50 bg-opacity-75 backdrop-blur-md '>
      <div className='w-full p-10 rounded max-w-lg bg-black/30 justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg bg-transparent'
        >
          <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
           admin Login - portfolio
          </h1>
          <div className='flex flex-col gap-2'>
            <InputText
              label='email'
              type='email'
              name='email'
              id='email'
              placeholder='enter email'
              value={user.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            {isError.email && (
              <p className='text-xs text-red-500'>{isError.email}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='relative '>
              <InputText
                label='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                placeholder='enter password'
                value={user.password}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button
                type='button'
                onClick={togglePassword}
                className='text-xl absolute right-0 border border-l-0 border-tertiary h-[42px] lg:h-[46px] top-6 text-white shadow-2xl rounded-r-md z-50 bg-primary p-1   w-10 text-center'
              >
                {showPassword ? (
                  <i className='ri-eye-line'></i>
                ) : (
                  <i className='ri-eye-off-line'></i>
                )}
              </button>
            </div>
            {isError.password && (
              <p className='text-xs text-red-500'>{isError.password}</p>
            )}
          </div>
          <div className='flex items-center justify-end text-blue-600 text-sm capitalize'>
            <Link to='/forgot-password'>forget password</Link>
          </div>
          <div className='w-full flex items-center justify-center'>
            <button
              type='submit'
              className={`w-40 py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
