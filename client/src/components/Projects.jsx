import { useState } from 'react';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';
import { UseAppContext } from '../context/appContext';
const Projects = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const { projectData } = UseAppContext();
  return (
    <section className=' min-h-[90vh] bg-primary '>
      <div className='container mx-auto p-20'>
        <SectionTitle title='Projects' />
        <div className='w-full flex flex-col lg:flex-row my-10 gap-5 '>
          <div className='flex flex-row lg:flex-col gap-3 lg:gap-6 lg:border-l-2  lg:border-[#1b9e9827] w-full lg:w-1/3  max-lg:justify-between max-lg:overflow-x-scroll max-lg:p-2 overflow-hidden '>
            {projectData.map((project, index) => (
              <div
                key={index}
                className='min-w-fit max-lg:text-center cursor-pointer'
                onClick={() => setSelectedPeriod(index)}
              >
                <h2
                  className={`text-xs min-w-fit lg:text-sm  max-sm:px-3 max-sm:py-2  px-5 py-3 font-semibold w-full capitalize ${
                    selectedPeriod === index
                      ? 'text-tertiary -ml-[3px]  max-lg:border-b-2  lg:border-l-4 border-tertiary bg-[#45d4cd2d] '
                      : 'text-white max-lg:border-b-2 border-[#1124645e]'
                  }`}
                >
                  {project.title}
                </h2>
              </div>
            ))}
          </div>
          <div className='flex flex-col lg:flex-row gap-5 lg:gap-10 w-full lg:w-2/3 lg:items-center '>
            <img
              src={projectData[selectedPeriod]?.image}
              alt={projectData[selectedPeriod]?.title}
              className='max-lg:mx-auto  rounded-md mix-blend-color-dodge w-60 h-52 object-scale-down'
            />
            <div className='flex flex-col gap-3 items-start'>
              <h2
              
                className='text-secondary text-xl font-semibold cursor-pointer hover:text-blue-500'
              >
                {projectData[selectedPeriod]?.title}
              </h2>
              <Link
                to={projectData[selectedPeriod]?.link}
                className='text-blue-500 text-xs font-semibold hover:text-blue-600'
              >{projectData[selectedPeriod]?.link}</Link>
              <p className='text-white text-xs text-wrap leading-6 lg:text-[15px]  text-justify'>
                {projectData[selectedPeriod]?.technologies.join(', ')}
              </p>
              <p className='text-white text-xs leading-5  lg:text-[12px] text-justify '>
                {projectData[selectedPeriod]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
