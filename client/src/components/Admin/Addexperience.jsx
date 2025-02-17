import { useState } from "react"
import InputText from "../../UI/InputText";
import TextArea from "../../UI/TextArea";
import Model from "../../UI/Model";
import { experienceApis } from "../../common/services";
import { UseAppContext } from "../../context/appContext";
import { toast } from "react-toastify";
const Addexperience = ({onClose}) => {
    const [experience, setExperience] = useState({
    title:"",
    company:"",
    location:"",
    period:"",
    description:""
  })
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({});
  const {fetchPortfolio} =UseAppContext()
  const validateInputs=(values)=>{
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.company) {
      errors.company = "Company is required";
    }
    if (!values.location) {
      errors.location = "Location is required";
    }
    if (!values.period) {
      errors.period = "Period is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors
  }
  const handleChange = (e) => {
    setExperience({...experience, [e.target.name]: e.target.value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateInputs(experience);
    setIsError(errors);
    if (Object.values(errors).length > 0) {
            return;
        }
        setIsLoading(true);
        try {
          console.log(experience)
          const response = await experienceApis.addExperience(experience);
          toast.success(response?.message)
          setExperience({
            title:"",
            company:"",
            location:"",
            period:"",
            description:""
          });
          onClose();
          fetchPortfolio()
        } catch (error) {
          toast.error(error?.message);
        }finally{
          setIsLoading(false);
          
        }
  }
  return (
    <Model onClose={onClose} className='bg-black/40' title='add experience'>

    <div className="w-full">
         <form onSubmit={handleSubmit} className=" flex flex-col p-3 gap-5 shadow-gray-300/20 shadow-lg"> 
      <div className="flex flex-col gap-2">
          <InputText
          label='title'
            value={experience?.title}
            id='title'
            name='title'
            disabled={isLoading}
            onChange={handleChange}
            placeholder="profile"
          />
          {isError.title && <p className="text-xs text-red-600">{isError.title}</p> }
        </div>

        <div className="flex flex-col gap-2">
          <InputText
          label='company'
            value={experience?.company}
            id='company'
            name='company'
            disabled={isLoading}
            onChange={handleChange}
            placeholder="company name"
          />
          {isError.company && <p className="text-xs text-red-600">{isError.company}</p> }
        </div>

        <div className="flex flex-col gap-2">
          <InputText
          label='address'
            value={experience?.location}
            id='location'
            name='location'
            disabled={isLoading}
            onChange={handleChange}
            placeholder="company address"
          />
          {isError.location && <p className="text-xs text-red-600">{isError.location}</p> }
        </div>
        <div className="flex flex-col gap-2">
          <InputText
          label='period'
            value={experience?.period}
            id='period'
            name='period'
            disabled={isLoading}
            onChange={handleChange}
            placeholder="example - 2022-2023 or 2022-Present"
          />
          {isError.period && <p className="text-xs text-red-600">{isError.period}</p> }
        </div>
        <div className="flex flex-col gap-2">
          <TextArea
                label='description'
                id='description'
                value={experience.description}
                name='description'
                onChange={handleChange}
                disabled={isLoading}
                rows={5}
                cols={10}
              
                 placeholder="entered description"
                />
                {isError.description && <p className="text-xs text-red-600">{isError.description}</p> }
        </div>
        <div className="w-full flex items-center justify-center">

              <button
            type='submit'
            className={`w-40 py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
                {isLoading? 'Adding...' : 'Add'}
            </button>
            </div>
      </form>
    </div>
    </Model>

  )
}

export default Addexperience