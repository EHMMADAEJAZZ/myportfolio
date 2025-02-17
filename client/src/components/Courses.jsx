import SectionTitle from './SectionTitle';
import { useState } from 'react';
import  courseimg  from '../assets/courseimg.jpg';
import { UseAppContext } from '../context/appContext';
const Courses = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(0);
    const {certificationData}=UseAppContext();
  return (
    <section className=' min-h-[90vh] bg-primary '>
      <div className='container mx-auto p-10 lg:p-20'>
        <SectionTitle title='Certifications' />
        <div className='w-full flex flex-col lg:flex-row my-10 gap-5 '>
          <div className='flex flex-row lg:flex-col gap-3 lg:gap-6 lg:border-l-2  lg:border-[#1b9e9827] w-full lg:w-1/3  max-lg:justify-between max-lg:overflow-x-scroll max-lg:p-2 overflow-hidden '>
            {certificationData.map((certification, index) => (
              <div
                key={index}
                className='max-lg:min-w-48 max-lg:text-center cursor-pointer'
                onClick={() => setSelectedPeriod(index)}
              >
                <h2
                  className={`text-xs lg:text-sm  max-sm:px-3 max-sm:py-2  px-5 py-3 font-semibold w-full capitalize    ${
                    selectedPeriod === index
                      ? 'text-tertiary -ml-[3px]  max-lg:border-b-2  lg:border-l-4 border-tertiary bg-[#45d4cd2d] '
                      : 'text-white max-lg:border-b-2 border-[#1124645e]'
                  }`}
                >
                  {certification.title}
                </h2>
              </div>
            ))}
          </div>
          <div className='flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10 w-full lg:w-2/3 '>
            <img
              src={certificationData[selectedPeriod]?.certificationImage || courseimg}
              alt={certificationData[selectedPeriod]?.title}
              className='w-full max-lg:mx-auto rounded-md mix-blend-color-dodge  h-52 object-scale-down lg:order-2'
            />
            <div className='w-full flex flex-col gap-3 items-start lg:order-1'>
              <h2 className='text-secondary text-xl font-semibold'>
                {certificationData[selectedPeriod]?.title}
              </h2>

              <p className='text-tertiary text-xs leading-6  lg:text-[15px] '>
                {certificationData[selectedPeriod]?.duration}
              </p>
              <p className='text-tertiary text-xs leading-6  lg:text-[15px] '>
                {certificationData[selectedPeriod]?.year}
              </p>
              <p className='text-tertiary text-xs leading-6  lg:text-[15px] '>
                {certificationData[selectedPeriod]?.institution}
              </p>
              <p className='text-white text-xs leading-5  lg:text-[12px] text-justify '>
                {certificationData[selectedPeriod]?.description}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Courses