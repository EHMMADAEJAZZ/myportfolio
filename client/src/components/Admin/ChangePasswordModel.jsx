import { useState } from "react";
import Model from "../../UI/Model"
import { userApis } from "../../common/services";
import { toast } from "react-toastify";
import InputText from "../../UI/InputText";

const ChangePasswordModel = ({onClose}) => {
    const [showChangePassword, setShowChangePassword] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [isError, setIsError] = useState({});
    
      const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
      const toggleShowPasswordModel = () => {
        setShowChangePassword(!showChangePassword);
      };
    
      const handleChangePassword = (e) => {
        const { value, name } = e.target;
        setPassword({ ...password, [name]: value });
      };
    
      const validateInputs = (values) => {
        const errors = {};
        if (!values.currentPassword) {
          errors.currentPassword = 'Current password is required';
        }
        if (!values.newPassword) {
          errors.newPassword = 'New password is required';
        } else if (!values.newPassword.length > 7) {
          errors.newPassword = 'Password should be at least 8 characters long';
        }
        if (!values.confirmNewPassword) {
          errors.confirmNewPassword = 'Confirm password is required';
        }
        if (values.newPassword !== values.confirmNewPassword) {
          errors.confirmNewPassword = 'Passwords  does not matchs';
        }
        return errors;
      };
    
     
    
      const handleSubmitPassword =async (e) => {
        e.preventDefault();
        console.log(password);
        const errors = validateInputs(password);
        setIsError(errors);
        if (Object.keys(errors).length > 0) {
          return;
        }
        setIsLoading(true);
        try {
          // console.log(password);
          const respose = await userApis.changePassword(password);
          toast.success(respose?.message);
          setPassword({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          })
          toggleShowPasswordModel()
        } catch (error) {
          toast.error(error?.message);
        } finally {
          setIsLoading(false);
        }
      };
  return (
    <Model onClose={onClose} title='change password' className='bg-black/40'>
         <form
              onSubmit={handleSubmitPassword}
              className='flex flex-col gap-3 '
            >
              <div className='flex flex-col gap-2'>
                <InputText
                  label='current password'
                  type='password'
                  id='current-password'
                  name='currentPassword'
                  value={password.currentPassword}
                  onChange={handleChangePassword}
                  disabled={isLoading}
                  placeholder='enter your current password'
                />
                {isError.currentPassword && (
                  <p className='text-xs text-red-500'>
                    {isError.currentPassword}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <InputText
                  label='new password'
                  type='password'
                  id='new-password'
                  name='newPassword'
                  value={password.newPassword}
                  onChange={handleChangePassword}
                  disabled={isLoading}
                  placeholder='enter your new password'
                />
                {isError.newPassword && (
                  <p className='text-xs text-red-500'>{isError.newPassword}</p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <InputText
                  label='confirm new password'
                  type='password'
                  id='confirm-new-password'
                  name='confirmNewPassword'
                  value={password.confirmNewPassword}
                  onChange={handleChangePassword}
                  disabled={isLoading}
                  placeholder='confirm your new password'
                />
                {isError.confirmNewPassword && (
                  <p className='text-xs text-red-500'>
                    {isError.confirmNewPassword}
                  </p>
                )}
              </div>
              <div className='w-full flex items-center justify-center mt-2'>
                <button
                  type='submit'
                  className={`w-fit py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
                  disabled={isLoading}
                >
                  {isLoading ? 'updating...' : 'change password'}
                </button>
              </div>
            </form>
    </Model>
  )
}

export default ChangePasswordModel