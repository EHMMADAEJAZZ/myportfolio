import { useState } from 'react';
import Model from '../../UI/Model';
import { UseAppContext } from '../../context/appContext';
import InputText from '../../UI/InputText';
import TextArea from '../../UI/TextArea';
import ImageInput from '../../UI/ImageInput';
import ImagePreview from '../ImagePreview';
import { certificationApis } from '../../common/services';
import { toast } from 'react-toastify';

const AddCertificate = ({ onClose }) => {
  const [certificatData, setCertificateData] = useState({
    title: '',
    description: '',
    duration: '',
    year: '',
    institution: '',
    certificationImage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const { fetchPortfolio } = UseAppContext();
  const handleChange = (e) => {
    setCertificateData({ ...certificatData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setCertificateData({
      ...certificatData,
      certificationImage: e.target.files[0],
    });
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };
  function validateInputs(values) {
    const errors = {};

    if (!values.title) {
      errors.title = 'Title is required';
    }
    
    if (!values.description) {
      errors.description = 'Description is required';
    }
    if (!values.duration) {
      errors.duration = 'Duration is required';
    }
    if (!values.year) {
      errors.year = 'Year is required';
    }
    if (!values.institution) {
      errors.institution = 'Institution is required';
    }
    if (!values.certificationImage) {
      errors.certificationImage = 'Image is required';
    }

    return errors;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs(certificatData);
    setIsError(errors);
    
    if (Object.values(errors).length > 0) {
      return;
    }
    console.log('hello')
    const formData = new FormData();
    formData.append('title', certificatData.title);
    formData.append('description', certificatData.description);
    formData.append('duration', certificatData.duration);
    formData.append('year', certificatData.year);
    formData.append('institution', certificatData.institution);
    formData.append('certificationImage', certificatData.certificationImage);
    console.log(certificatData);
    setIsLoading(true);
    try {
      const response = await certificationApis.addCertifications(formData);
      toast.success(response?.message);
      onClose();
      fetchPortfolio();
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Model onClose={onClose} className='bg-black/40' title='add Certifaction'>
      <form
        onSubmit={handleSubmit}
        className=' flex flex-col p-3 gap-3 shadow-gray-300/20 shadow-lg'
      >
        <div className='flex flex-col gap-2'>
          <InputText
            label='title'
            value={certificatData?.title}
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
        <div className='flex flex-col gap-2'>
          <InputText
            label='institution'
            value={certificatData?.institution}
            id='institution'
            name='institution'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='institution name'
          />
          {isError.institution && (
            <p className='text-xs text-red-600'>{isError.institution}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='duration'
            value={certificatData?.duration}
            id='duration'
            name='duration'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='duration'
          />
          {isError.duration && (
            <p className='text-xs text-red-600'>{isError.duration}</p>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          <InputText
            label='year'
            type='number'
            value={certificatData?.year}
            id='year'
            name='year'
            disabled={isLoading}
            onChange={handleChange}
            placeholder='year'
          />
          {isError.year && (
            <p className='text-xs text-red-600'>{isError.year}</p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <TextArea
            label='description'
            value={certificatData?.description}
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
            label='certificationImage image'
            name='certificationImage'
            id='certificationImage'
            onChange={handleImageChange}
            disabled={isLoading}
          />
          {isError.certificationImage && (
            <p className='text-xs text-red-600'>{isError.certificationImage}</p>
          )}
        </div>
        <div className='w-full flex items-center justify-start'>
          {previewImg && (
            <div className='w-32 rounded'>
              <ImagePreview imageUrl={previewImg} />
            </div>
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
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
    </Model>
  );
};

export default AddCertificate;
