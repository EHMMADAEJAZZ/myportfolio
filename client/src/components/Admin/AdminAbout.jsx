import { useState } from 'react';
import { UseAppContext } from '../../context/appContext';
import InputText from '../../UI/InputText';
import TextArea from '../../UI/TextArea';
import { aboutApi } from '../../common/services';
import { toast } from 'react-toastify';

const AdminAbout = () => {
  const { aboutData ,fetchPortfolio} = UseAppContext();
  const [editAbout, setEditAbout] = useState({
    lottieUrl: aboutData?.lottieUrl,
    description1: aboutData?.description1,
    description2: aboutData?.description2,
    skills: aboutData?.skills,
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [skill, setSkill] = useState('');
  const handleInputChange = (e) => {
    setEditAbout({ ...editAbout, [e.target.name]: e.target.value });
  };
  //handle skills arry change
  const handleSkillsChange = (e) => {
    const { value } = e.target;

    setSkill(value);
  };
  //handle delete skill
  const handleDeleteSkill = (index) => {
    const skills = [...editAbout.skills];
    skills.splice(index, 1);
    setEditAbout({ ...editAbout, skills });
  };
  const addSkill = (skill) => {
    if (skill) {
      setEditAbout({ ...editAbout, skills: [...editAbout.skills, skill] });
      setSkill('');
    }
  };
  //handle edit skills
  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateInputs(editAbout);
    setIsError(errors);
    setIsLoading(true);
    try {
      const response = await aboutApi.updateAbout(aboutData?._id,editAbout);
      toast.success(response?.message);
      fetchPortfolio()
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  function validateInputs(values) {
    const errors = {};
    if (!values.lottieUrl) {
      errors.lottieUrl = 'Lottie URL is required';
    }
    if (!values.description1) {
      errors.description1 = 'Description 1 is required';
    }
    if (!values.description2) {
      errors.description2 = 'Description 2 is required';
    }
    if (!values.skills) {
      errors.skills = 'Skills are required';
    }
    return errors;
  }
  //validate add skill add only one skill at a time

  return (
    <div className='p-5'>
      
      <form
        onSubmit={handleSubmit}
        className=' flex flex-col gap-5 p-5 shadow-gray-300/20 shadow-lg'
      >
        <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
        About
      </h1>
        <div className='flex flex-col gap-2'>
          <InputText
            label='lottie url'
            value={editAbout?.lottieUrl}
            id='lottieUrl'
            name='lottieUrl'
            disabled={isLoading}
            onChange={handleInputChange}
          />
          {isError.lottieUrl && (
            <p className='text-xs text-red-600'>{isError.lottieUrl}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <TextArea
            label='Description 1'
            value={editAbout?.description1}
            id='description1'
            name='description1'
            disabled={isLoading}
            onChange={handleInputChange}
            rows={5}
            cols={10}
            placeholder='entered Description'
          />
          {isError.description1 && (
            <p className='text-xs text-red-600'>{isError.description1}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <TextArea
            label='Description 2'
            value={editAbout?.description2}
            id='description2'
            name='description2'
            disabled={isLoading}
            onChange={handleInputChange}
            rows={5}
            cols={10}
            placeholder='entered Description 2'
          />
          {isError.description2 && (
            <p className='text-xs text-red-600'>{isError.description2}</p>
          )}
        </div>
        <div>
          <p className='text-secondary font-semibold tracking-widest leading-6 max-sm:text-sm mb-1 text-sm capitalize '>
            skills:-
          </p>
          <div className='flex items-center gap-2 text-tertiary overflow-hidden overflow-x-auto w-full pb-2'>
            {editAbout?.skills &&
              editAbout?.skills.map((skill, index) => (
                <div
                  key={index}
                  className='py-1 px-2 min-w-28 flex justify-between items-center text-sm rounded border border-tertiary'
                >
                  <p>{skill}</p>

                  <button
                    onClick={() => handleDeleteSkill(index)}
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
              label='Add Skill'
              value={skill}
              id='skill'
              name='skill'
              disabled={isLoading}
              onChange={handleSkillsChange}
              placeholder='add Skill'
            />
            <button
              onClick={() => addSkill(skill)}
              type='button'
              className='absolute -top-2 right-0 text-tertiary border border-gray-300/30 rounded tracking-widest capitalize text-sm font-semibold py-[2px] cursor-pointer hover:border-green-900 hover:text-white hover:bg-red-600  px-6'
            >
              Add
            </button>
          </div>

          {isError.skills && (
            <p className='text-xs text-red-600'>{isError.skills}</p>
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

export default AdminAbout;
