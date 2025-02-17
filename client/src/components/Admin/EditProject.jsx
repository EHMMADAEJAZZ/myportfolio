import { useState } from 'react';
import Model from '../../UI/Model';
import { projectApis } from '../../common/services';
import InputText from '../../UI/InputText';
import TextArea from '../../UI/TextArea';
import ImageInput from '../../UI/ImageInput';
import {toast} from 'react-toastify';
import ImagePreview from '../ImagePreview';
import { UseAppContext } from '../../context/appContext';
const EditProject = ({data,onClose}) => {
      const [projectData, setProjectData] = useState({
        title: data?.title,
        description: data?.description,
        link: data?.link,
        image: data?.image,
        technologies: data?.technologies,
      });
    
      const [technology, setTechnology] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [isError, setIsError] = useState({});
      const [previewImg, setPreviewImg] = useState(data?.image)
      const [technologyError, setTechnologyError] = useState(null);
      const {fetchPortfolio} =UseAppContext()
      const handleChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
      };
      const handleImageChange = (e) => {
        setProjectData({ ...projectData, image: e.target.files[0] });
        setPreviewImg(URL.createObjectURL(e.target.files[0]));
      };
      const handleTechnologyChange = (e) => {
        const { value } = e.target;
    
        setTechnology(value);
      };
      const handleAddTechnology = (technology) => {
        console.log(technology);
        if (!technology) {
          setTechnologyError('Enter Technology to add');
          return;
        }
        setProjectData({
          ...projectData,
          technologies: [...projectData.technologies, technology],
        });
        setTechnology('');
        setTechnologyError(null);
      };
      const handleRemoveTechnology = (index) => {
        setProjectData({
          ...projectData,
          technologies: projectData.technologies.filter((_, i) => i !== index),
        });
      };
      const validateInputs = (values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Title is required';
        }
        if (!values.description) {
          errors.description = 'Description is required';
        }
        if (!values.link) {
          errors.link = 'Link is required';
        }
        if (!values.image) {
          errors.image = 'Image is required';
        }
        if (projectData.technologies.length === 0) {
          errors.technologies = 'At least one technology is required';
        }
        return errors;
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        // add project to your project list
        const errors = validateInputs(projectData);
        setIsError(errors);
        if (Object.values(errors).length > 0) {
          return;
        }
        console.log(projectData)
        const formData = new FormData();
        formData.append('title', projectData.title);
        formData.append('description', projectData.description);
        formData.append('link', projectData.link);
        formData.append('image', projectData.image);
        projectData.technologies.forEach((tech, i) =>
          formData.append(`technologies[${i}]`, tech)
        );
    
        // add to your project list using projectApis.addProject() method
        setIsLoading(true);
        try {
          const response = await projectApis.updateProject(data._id,formData);
          console.log(response);
          toast.success(response?.message)
          setPreviewImg(null);
          fetchPortfolio() 
          onClose();
        } catch (error) {
          console.log(error?.message);
          toast.error(error?.message)
          setPreviewImg(null)
        } finally {
          setIsLoading(false);
          setPreviewImg(null)
        }
      };
  return (
    <Model onClose={onClose} className='bg-black/40' title='Edit Project'>
      <form
        onSubmit={handleSubmit}
        className=' flex flex-col p-3 gap-3 shadow-gray-300/20 shadow-lg'
      >
        <div className='flex flex-col gap-2'>
          <InputText
            label='title'
            value={projectData?.title}
            id='title'
            name='title'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='enter project name'
          />
          {isError.title && (
            <p className='text-xs text-red-600'>{isError.title}</p>
          )}
        </div>
        <div>
          <InputText
            label='link'
            value={projectData?.link}
            id='link'
            name='link'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='project url'
          />
          {isError.link && (
            <p className='text-xs text-red-600'>{isError.link}</p>
          )}
        </div>

        {/* technologies */}
         {projectData?.technologies.length ? (
        <div>
          <p className='text-secondary font-semibold tracking-widest leading-6 max-sm:text-sm mb-1 text-sm capitalize '>
            technologies:-
          </p>
       <div className='flex items-center gap-2 text-tertiary overflow-hidden overflow-x-auto w-full pb-2'>
            {projectData?.technologies && projectData.technologies.map((tech,index)=>(
                 <div
                  key={index}
                  className='py-1 px-2 min-w-28 flex justify-between items-center text-sm rounded border border-tertiary'
                >
                  <p>{tech}</p>

                  <button
                    onClick={() => handleRemoveTechnology(index)}
                    type='button'
                    className='group sm:block'
                  >
                    <i className='ri-close-circle-line group-hover:text-red-700 text-white'></i>
                  </button>
                </div>
                
              ))}
            
        </div>
        </div>):(<div>{''}</div>)
}
        <div className='flex flex-col gap-2'>
          <div className='flex relative'>
            <InputText
              label='add technology'
              value={technology}
              id='technology'
              name='technology'
              disabled={isLoading}
              onChange={handleTechnologyChange}
              placeholder='add technology'
            />
            <button
              onClick={() => handleAddTechnology(technology)}
              type='button'
              className='absolute -top-2 right-0 text-tertiary border border-gray-300/30 rounded tracking-widest capitalize text-sm font-semibold py-[2px] cursor-pointer hover:border-green-900 hover:text-white hover:bg-red-600  px-6'
            >
              Add
            </button>
          </div>

          {technologyError && (
            <p className='text-xs text-red-600'>{technologyError}</p>
          )}
          {isError?.technologies && (
            <p className='text-xs text-red-600'>{isError?.technologies}</p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <TextArea
            label='description'
            value={projectData?.description}
            id='description'
            name='description'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='description'
          />
          {isError.description && (
            <p className='text-xs text-red-600'>{isError.description}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <ImageInput
          label='project image'
          name="image"
          id="image"
          onChange={handleImageChange}
          disabled={isLoading}
          />
          {isError.image && (
          <p className='text-xs text-red-600'>{isError.image}</p>
        )}
        </div>
        <div className='w-full flex items-center justify-start'>
          {
           previewImg && ( <div className='w-32 rounded'>

            <ImagePreview imageUrl={previewImg} />
            </div>)
          }
        </div>
        
        <div className='w-full flex items-center justify-center'>
          <button
            type='submit'
            className={`w-40 py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </Model>
  )
}

export default EditProject