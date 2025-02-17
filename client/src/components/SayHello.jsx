import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { UseAppContext } from "../context/appContext";
import Loader from "./Loader";



const SayHello = () => {
  const { 
        contactData,loading}=UseAppContext();
        delete contactData._id

  if(loading){
    return <Loader/>
  }
  return (
    <section className=' min-h-[90vh] bg-primary '>
      <div className='container mx-auto p-10 lg:p-20'>
        <SectionTitle title='Say Hello' />
        <div className="flex flex-col lg:flex-row my-10 gap-10">
            <div className="flex flex-col text-white gap-2 max-lg:order-2">
             
                <p>{"{"}</p>
                {
                    Object.values(contactData) && (<div>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">Name : </span>
                             <span className="">{contactData?.name}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">email : </span>
                             <span className="">{contactData?.email}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">phone : </span>
                             <span className="">{contactData?.phone}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">age : </span>
                             <span className="">{contactData?.age}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">gender : </span>
                             <span className="">{contactData?.gender}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">occupation : </span>
                             <span className="">{contactData?.occupation}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">education : </span>
                             <span className="">{contactData?.education}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">languages : </span>
                             <span className="">{contactData?.languages && contactData?.languages.join(", ")}</span>
                           </p>
                           <p  className="ml-5  text-tertiary">
                             <span className="capitalize ">address : </span>
                             <span className="">{contactData?.address}</span>
                           </p>
                    </div>)
                        // <p key={index} className="ml-5  text-tertiary">
                        //     <span className="capitalize ">{key} : </span>
                        //     <span className="">{contactData[key]}</span>
                        // </p>
                }
                <p>{"}"}</p>
                <div className="w-full my-5">
                  <Link to='/contact' className="w-fit py-2 px-5 rounded-md text-white font-bold tracking-widest capitalize text-sm  border border-tertiary shadow-gray-300/40 shadow-md  hover:bg-secondary  transition-all ease-in-out  duration-300" >contact me</Link>
                </div>
            </div>
            <div className=" w-full flex items-center justify-center lg:w-1/2 h-[200px] lg:h-[250px] ">
              <DotLottieReact
      src="https://lottie.host/e0edff55-1f62-4a09-81b1-f28ab6e2e22a/q7an0MIMyo.lottie"
      loop
      autoplay
      speed={0.8}
      


    />
            </div>

        </div>
        </div>
        </section>
  )
}

export default SayHello