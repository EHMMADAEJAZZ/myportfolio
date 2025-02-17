import { useState } from "react"
import { UseAppContext } from "../../context/appContext"
import InputText from "../../UI/InputText"
import { contactApi } from "../../common/services"
import { toast } from "react-toastify"

const AdminContact = () => {
  const {contactData,fetchPortfolio}=UseAppContext()
  const [editContact, setEditContact] = useState({
    name:contactData.name,
    email:contactData.email,
    phone:contactData.phone,
    age:contactData.age,
    gender:contactData.gender,
    occupation:contactData.occupation,
    education:contactData.education,
    languages:contactData.languages,
    address:contactData.address,
  })
   const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('');

  const handleInputChange = (e) => {
    setEditContact({...editContact, [e.target.name]: e.target.value });
  };
const handleLangChange = (e) => {
    const { value } = e.target;

   setLanguage(value);
 
}
 
  //handle delete skill
  const handleDeleteLanguage = (index) => {
    const language = [...editContact.languages];
    language.splice(index, 1);
    setEditContact((prev)=>{
      return {...prev, languages: language };
    });
  };
  const addLanguage = (language) => {
    if (language) {
      setEditContact({ ...editContact, languages: [...editContact.languages, language] });
      setLanguage('');
    }
  };

  const vaidateInputs =(values)=>{
    const errors ={};
    if(!values.name.trim()){
      errors.name='Name is required';
    }
    if(!values.email.trim()){
      errors.email='Email is required';
    }else if(!/^\S+@\S+\.\S+$/.test(values.email)){
      errors.email='Please enter a valid email address';
    }
    if(!values.phone.trim()){
      errors.phone='Phone number is required';
    } else if(!/^\+91\d{10}$|^\+91 \d{5} \d{5}$|^0\d{10}$/.test(values.phone)){
      errors.phone='Please enter a valid phone number with a country code e.g +91 or 0';
      
    }
    if(!values.age){
      errors.age='Age is required';
    } else if(isNaN(Number(values.age))){
      errors.age='Please enter a valid age with country code';
    }
    if(!values.gender){
      errors.gender='Gender is required';
    }
    if(!values.occupation){
      errors.occupation='Occupation is required';
    }
    if(!values.education){
      errors.education='Education is required';
    }
    if(!values.languages){
      errors.languages='Languages are required';
    }
    if(!values.address){
      errors.address='Address is required';
    }
    return errors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = vaidateInputs(editContact);

    setIsError(errors);
    if (Object.values(errors).length > 0) {
      return;
    }
    setIsLoading(true)
    try {
      const response = await  contactApi.updateContact(contactData._id,editContact);
      toast.success(response?.message);
      fetchPortfolio();
    } catch (error) {
      toast.error(error?.message);
      
    }finally{
      setIsLoading(false);
    }
      
  }
  return (
    <div className="p-5">
      <form
      onSubmit={handleSubmit}
        className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg'
      >
        <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
        Contact Details
      </h1>
        <div className='flex flex-col gap-2'>
          <InputText
            label='name'
            value={editContact.name}
            id='name'
            name='name'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="name"
          />
          {isError.name && (
            <p className='text-xs text-red-600'>{isError.name}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='email'
            type="email"
            value={editContact.email}
            id='email'
            name='email'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your email"
          />
          {isError.email && (
            <p className='text-xs text-red-600'>{isError.email}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='phone'
            type="tel"
            value={editContact.phone}
            id='phone'
            name='phone'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your phone number"
          />
          {isError.phone && (
            <p className='text-xs text-red-600'>{isError.phone}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='age'
            type="number"
            value={editContact.age}
            id='age'
            name='age'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your age"
          />
          {isError.age && (
            <p className='text-xs text-red-600'>{isError.age}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='gender'
            value={editContact.gender}
            id='gender'
            name='gender'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your gender"
          />
          {isError.gender && (
            <p className='text-xs text-red-600'>{isError.gender}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='occupation'
            value={editContact.occupation}
            id='occupation'
            name='occupation'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your occupation"
          />
          {isError.occupation && (
            <p className='text-xs text-red-600'>{isError.occupation}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='education'
            value={editContact.education}
            id='education'
            name='education'
            disabled={isLoading}
            onChange={handleInputChange}
            placeholder="enter your education"
          />
          {isError.education && (
            <p className='text-xs text-red-600'>{isError.education}</p>
          )}
        </div>
         <div>
          <p className='text-secondary font-semibold tracking-widest leading-6 max-sm:text-sm mb-1 text-sm capitalize '>
            languages:-
          </p>
          <div className='flex items-center gap-2 text-tertiary overflow-hidden overflow-x-auto w-full pb-2'>
            {editContact?.languages &&
              editContact?.languages.map((lang, index) => (
                <div
                  key={index}
                  className='py-1 px-2 min-w-28 flex justify-between items-center text-sm rounded border border-tertiary'
                >
                  <p>{lang}</p>

                  <button
                    onClick={() => handleDeleteLanguage(index)}
                    type='button'
                    className='group sm:block'
                  >
                    <i className='ri-close-circle-line group-hover:text-red-700 text-white'></i>
                  </button>
                </div>
              ))}
          </div>
        </div>
                <div className='flex flex-col gap-2'>
          <div className='flex relative '>
            <InputText
              label='Add language'
              value={language}
              id='language'
              name='language'
              disabled={isLoading}
              onChange={handleLangChange}
              placeholder='add language'
            />
            <button
              onClick={() => addLanguage(language)}
              type='button'
              className='absolute -top-2 right-0 text-tertiary border border-gray-300/30 rounded tracking-widest capitalize text-sm font-semibold py-[2px] cursor-pointer hover:border-green-900 hover:text-white hover:bg-red-600  px-6'
            >
              Add
            </button>
          </div>

          {isError.languages && (
            <p className='text-xs text-red-600'>{isError.languages}</p>
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
  )
}

export default AdminContact