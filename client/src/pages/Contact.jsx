import { useState } from 'react';
import InputText from '../UI/InputText';
import TextArea from '../UI/TextArea';
import { useNavigate } from 'react-router-dom';
import { contactMeApi } from '../common/services';
import { toast } from 'react-toastify';
const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };
  function validateContact(values) {
    const errors = {};
    // Check if company name is provided
    if (!values.companyName) {
      errors.companyName = 'Company Name is required';
    }
    // Check if email is provided and is valid
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    // Check if phone number is provided and is valid
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (
      !/^\+91\d{10}$|^\+91 \d{5} \d{5}$|^0\d{10}$/.test(values.phoneNumber)
    ) {
      errors.phoneNumber = 'enter a valid phone number with country code e.g +911234123123';
    }
    // Check if message is provided
    if (!values.message) {
      errors.message = 'Message is required';
    }
    return errors;
  }
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateContact(contactInfo);
    setIsError(errors);
    if (Object.values(errors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await contactMeApi.sendContactMeMessage(contactInfo);

      toast.success(response?.message);
      navigate('/');
      setContactInfo({
        companyName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mt-[10vh] bg-primary min-h-[90vh]'>
      <div className='pt-10 pb-20 px-10 '>
        <h1 className='text-2xl tracking-widest font-bold text-secondary text-center underline underline-offset-8 '>
          Contact Me
        </h1>
        <form
          onSubmit={handleSubmit}
          className='max-w-lg mx-auto flex flex-col gap-5 mt-5 p-5 shadow-gray-300/20 shadow-lg'
        >
          <div className='flex flex-col gap-2'>
            <InputText
              label='company name'
              id='company-name'
              value={contactInfo.companyName}
              name='companyName'
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder=' entered company name'
            />
            {isError.companyName && (
              <p className='text-xs text-red-600'>{isError.companyName}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <InputText
              label='email'
              id='email'
              value={contactInfo.email}
              name='email'
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder='entered email'
            />
            {isError.email && (
              <p className='text-xs text-red-600'>{isError.email}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <InputText
              label='phone number'
              id='phone'
              type='number'
              value={contactInfo.phoneNumber}
              name='phoneNumber'
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder='entered phone number'
            />
            {isError.phoneNumber && (
              <p className='text-xs text-red-600'>{isError.phoneNumber}</p>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <TextArea
              label='message'
              id='message'
              value={contactInfo.message}
              name='message'
              onChange={handleInputChange}
              disabled={isLoading}
              rows={5}
              cols={10}
              placeholder='entered message'
            />
            {isError.message && (
              <p className='text-xs text-red-600'>{isError.message}</p>
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
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
