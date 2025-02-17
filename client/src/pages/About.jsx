import SectionTitle from '../components/SectionTitle';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { UseAppContext } from '../context/appContext';
import Loader from '../components/Loader';
const About = () => {
  
  const {loading,aboutData}=UseAppContext();


  if(loading){
    return <Loader/>
  }
  return (
    <section id='about' className='min-h-[90vh] bg-primary'>
      <div className='container mx-auto p-10 lg:p-20'>
        <SectionTitle title='About' />
        <div className='w-full flex flex-col gap-8 lg:flex-row items-center my-10 lg:mt-0 '>
          <div className='md:h-[70vh] w-full lg:w-1/2'>
            <DotLottieReact
              src={aboutData?.lottieUrl}
              loop
              speed='1'
              autoplay
            />
          </div>
          <div className='flex flex-col gap-5 w-full lg:w-1/2 '>
            <p className='text-white text-sm leading-6   text-justify'>
              {aboutData?.description1}
            </p>
            <p className='text-white text-sm leading-6   text-justify'>
              {aboutData?.description2}
            </p>
          </div>
        </div>
       <div className="py-5">

        <h1 className="text-tertiary text-xl">
          Here are few technologies I&apos;ve been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10 justify-start items-center mt-10">
  {
          
        aboutData?.skills && aboutData?.skills.map((skill, index) => (
            <div key={index} className="w-full min-[640px]:w-44 text-center border rounded border-tertiary py-3 px-10 tracking-[2px]">
              <h3 className="text-tertiary capitalize  text-sm">{skill}</h3>
              
            </div>
          ))
        }
        </div>
      
       </div>
      </div>
    </section>
  );
};

export default About;
