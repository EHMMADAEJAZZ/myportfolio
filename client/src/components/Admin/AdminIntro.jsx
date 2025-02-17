import { useState } from 'react';
import { UseAppContext } from '../../context/appContext';
import InputText from '../../UI/InputText';
import TextArea from '../../UI/TextArea';
import { introApis } from '../../common/services';
import { toast } from 'react-toastify';

const AdminIntro = () => {
  const { introData, fetchPortfolio } = UseAppContext();
  const [editIntroData, setEditIntroData] = useState({
    welcomeText: introData?.welcomeText,
    firstName: introData?.firstName,
    lastName: introData?.lastName,
    caption: introData?.caption,
    description: introData?.description,
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditIntroData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  function validInputs(values) {
    const errors = {};
    if (!values.welcomeText) {
      errors.welcomeText = 'Welcome text is required';
    }
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!values.caption) {
      errors.caption = 'Caption is required';
    }
    if (!values.description) {
      errors.description = 'Description is required';
    }
    return errors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validInputs(editIntroData);
    setIsError(errors);
    if (Object.values(errors).length > 0) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await introApis.updateIntro(
        introData?._id,
        editIntroData
      );
      toast.success(response?.message);
      fetchPortfolio();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='p-5'>
      <form
        onSubmit={handleSubmit}
        className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg'
      >
        <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
          {' '}
          Introduction
        </h1>
        <div className='flex flex-col gap-2'>
          <InputText
            label='welcome text'
            value={editIntroData?.welcomeText}
            id='welcomeText'
            name='welcomeText'
            disabled={isLoading}
            onChange={handleChange}
          />
          {isError.welcomeText && (
            <p className='text-xs text-red-600'>{isError.welcomeText}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='first name'
            value={editIntroData?.firstName}
            id='firstName'
            name='firstName'
            disabled={isLoading}
            onChange={handleChange}
          />
          {isError.firstName && (
            <p className='text-xs text-red-600'>{isError.firstName}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='last name'
            value={editIntroData?.lastName}
            id='lastName'
            name='lastName'
            disabled={isLoading}
            onChange={handleChange}
          />
          {isError.lastName && (
            <p className='text-xs text-red-600'>{isError.lastName}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='caption'
            value={editIntroData?.caption}
            id='caption'
            name='caption'
            disabled={isLoading}
            onChange={handleChange}
          />
          {isError.caption && (
            <p className='text-xs text-red-600'>{isError.caption}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <TextArea
            label='description'
            id='description'
            value={editIntroData.description}
            name='description'
            onChange={handleChange}
            disabled={isLoading}
            rows={5}
            cols={10}
            placeholder='entered description'
          />
          {isError.description && (
            <p className='text-xs text-red-600'>{isError.description}</p>
          )}
        </div>
        <div className='w-full flex items-center justify-center'>
          <button
            type='submit'
            className={`w-40 py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminIntro;
