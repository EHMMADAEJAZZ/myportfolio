import { useEffect, useState } from 'react';
import { userApis } from '../../common/services';
import formatDateTime from '../../utils/dateFormat';
import ChangePasswordModel from './ChangePasswordModel';
const Profile = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const [user, setUser] = useState(null)
  const toggleShowPasswordModel = () => {
    setShowChangePassword(!showChangePassword);
  };

 

  const getMe = async()=>{
    setIsLoading(true);
    try {
      const response = await userApis.getMe();
      setUser(response?.data);
    } catch (error) {
      console.log(error?.message);
    }finally{
      setIsLoading(false);
    }
  }

  
useEffect(()=>{
  getMe();

  
},[])
if(isLoading){
  return <div className='w-full h-[50vh] flex items-center justify-center'>
    <p className='animate-spin text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="rgba(240,240,240,1)"><path d="M12 4C9.25144 4 6.82508 5.38626 5.38443 7.5H8V9.5H2V3.5H4V5.99936C5.82381 3.57166 8.72764 2 12 2C17.5228 2 22 6.47715 22 12H20C20 7.58172 16.4183 4 12 4ZM4 12C4 16.4183 7.58172 20 12 20C14.7486 20 17.1749 18.6137 18.6156 16.5H16V14.5H22V20.5H20V18.0006C18.1762 20.4283 15.2724 22 12 22C6.47715 22 2 17.5228 2 12H4Z"></path></svg>
    </p>
  </div>
}
  return (
    <div className='p-0 xs:p-5'>
      <div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center shadow-2xl py-5'>
        <h1 className='  xs:text-lg  sm:text-2xl capitalize text-center my-5 font-bold tracking-[4px] underline underline-offset-4 text-secondary'>personal details</h1>
        <div className='text-tertiary text-sm flex flex-col gap-5'>
          <p className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-4'>
            <span className=' capitalize font-semibold w-24 tracking-[3px] '>name:</span>
            <span className='underline underline-offset-4'>{user?.name}</span>
          </p>
          <p className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-4'>
            <span className=' capitalize font-semibold w-24 tracking-[3px]'>email:</span>
            <span className='underline underline-offset-4'>{user?.email}</span>
          </p>
          <p className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-4'>
            <span className=' capitalize font-semibold w-24 tracking-[3px] '>Mobile:</span>
            <span className='underline underline-offset-4'>{user?.mobile}</span>
          </p>
          <p className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-4'>
            <span className=' capitalize font-semibold w-24 tracking-[3px] '>lastLogin:</span>
            <span className='underline underline-offset-4'>{formatDateTime( user?.lastLogin)}</span>
          </p>
          <p className='flex flex-col gap-1 xs:flex-row xs:items-center xs:gap-4'>
            <span className=' capitalize font-semibold w-24 tracking-[3px] '>role:</span>
            <span className='underline underline-offset-4'>{user?.role}</span>
          </p>
        </div>
        <div className='my-2'>
          <div className='flex items-center gap-5 mt-5'>
            <button
              type='button'
              onClick={(e) => toggleShowPasswordModel(e)}
              className='px-4 py-2 w-fit font-semibold tracking-[2px] rounded border border-tertiary text-secondary text-xs  uppercase'
            >
              change password
            </button>
          </div>

         
        </div>
      </div>
      {
        showChangePassword && (
          <ChangePasswordModel onClose={toggleShowPasswordModel} />
        )
          
      }
    </div>
  );
};

export default Profile;
