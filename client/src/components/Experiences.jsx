import { useState } from "react"
import SectionTitle from "./SectionTitle"
import { UseAppContext } from "../context/appContext"
const Experiences = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(0)
     const {experienceData}=UseAppContext()
  return (
    <section className=" min-h-[90vh] bg-primary ">
        <div className='container mx-auto p-10 lg:p-20' >
             <SectionTitle title='Experiences' />
             <div className="w-full flex flex-col lg:flex-row my-10 gap-5 ">
                <div className="flex flex-row lg:flex-col gap-3 lg:gap-6 lg:border-l-2  lg:border-[#1b9e9827] w-full lg:w-1/3  max-lg:justify-between max-lg:overflow-x-scroll max-lg:p-2 overflow-hidden ">
                    {
                      experienceData &&  experienceData.map((experience,index)=>(
                            <div key={index} className="min-w-36 max-lg:text-center cursor-pointer" onClick={()=>setSelectedPeriod(index)} >
                                <h2 className={`text-sm max-sm:px-3 max-sm:py-2  px-5 py-3 font-semibold w-full capitalize   ${selectedPeriod===index?"text-tertiary -ml-[3px]  max-lg:border-b-4  border-tertiary lg:border-l-4 bg-[#45d4cd2d] ":"text-white max-lg:border-b-2 border-[#1124645e] "}`}>{experience?.period}</h2>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col gap-4 w-full lg:w-2/3 ">
                    <h2 className="text-secondary text-xl capitalize font-semibold">{experienceData[selectedPeriod]?.title}</h2>

                    <p className="text-tertiary capitalize font-semibold text-sm">{experienceData[selectedPeriod]?.company}</p>
                    <p className="text-tertiary capitalize font-semibold text-sm">{experienceData[selectedPeriod]?.location}</p>
                    <p className='text-white text-xs leading-5 sm:leading-6 sm:text-[15px] text-justify'>{experienceData[selectedPeriod]?.description}</p>
                </div>
             </div>
            </div>
            </section>
  )
}

export default Experiences