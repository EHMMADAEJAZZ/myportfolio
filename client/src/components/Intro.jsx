import { UseAppContext } from '../context/appContext';
import Loader from './Loader';

const Intro = () => {
 
  const {  introData, loading } = UseAppContext();
  if (loading) {
    return <Loader />;
  }
  return (
    <section className=' min-h-[90vh] bg-primary '>
      <div className='h-full container mx-auto flex flex-col items-start justify-center gap-2 sm:gap-8  p-10 lg:p-20 '>
        <h3 className='text-white text-base mt-10 lg:mt-2'>{introData?.welcomeText}</h3>
        <h3 className=' text-xl xs:text-3xl sm:text-4xl lg:text-6xl text-secondary font-semibold'>
          {introData?.firstName} {introData?.lastName}
        </h3>
        <h3 className='text-xl xs:text-3xl sm:text-5xl text-white lg:text-6xl font-semibold'>
          {introData?.caption}
        </h3>
        <p className='text-white text-xs leading-5 tracking-wider lg:text-base w-full lg:w-3/5 text-justify text-wrap'>
          {introData?.description}
        </p>
        <button className='border-2 text-base cursor-pointer font-medium border-tertiary px-10 py-3 rounded text-tertiary'>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Intro;
