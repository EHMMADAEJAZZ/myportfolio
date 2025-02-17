import { useState } from 'react';
import InputText from '../UI/InputText';
import { userApis } from '../common/services';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [params] = useSearchParams();
  // console.log(token);
  const validateInputs = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'password is required';
    } else if (values.password.length < 7) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(password);
    setIsError(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    const token = params.get('token');
    setIsLoading(true);
    try {
      const response = await userApis.resetPassword(token, password);
      console.log(response);
      toast.success(response?.message);
    } catch (error) {
      console.log(error?.message);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='mt-[10vh] min-h-[70vh] w-full p-5 flex items-center justify-center'>
      <div className='w-full  max-w-md mx-auto border rounded-lg shadow-lg bg-primary'>
        <form
          onSubmit={handleSubmit}
          className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg bg-transparent'
        >
          <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
            reset password
          </h1>
          <div className='flex flex-col gap-2'>
            <InputText
              label='new password'
              type='password'
              placeholder='newPassword'
              name='password'
              id='newPassword'
              value={password.password}
              onChange={handleChange}
              disabled={isLoading}
            />
            {isError?.password && (
              <p className='text-red-500 text-xs'>{isError?.password}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <InputText
              label='confirm new password'
              type='password'
              placeholder='confirmPassword'
              name='confirmPassword'
              id='confirmPassword'
              value={password.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
            {isError?.confirmPassword && (
              <p className='text-red-500 text-xs'>{isError?.confirmPassword}</p>
            )}
          </div>
          <div className='flex justify-center'>
            <button
              type='submit'
              className='px-4 py-2 border border-tertiary text-white bg-primary  transition-all duration-300 ease-in-out text-sm shadow-gray-300/40 shadow-md font-bold tracking-widest rounded-md hover:bg-secondary '
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
