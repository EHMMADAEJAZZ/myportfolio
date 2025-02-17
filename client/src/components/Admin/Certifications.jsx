import { useState } from "react";
import AddCertificate from "./AddCertificate";
import { UseAppContext } from "../../context/appContext";
import CertificationCard from "./CertificationCard";

const Certifications = () => {
  const [showModel, setShowModel] = useState(false);
      const toggleModel=()=>{
        setShowModel(!showModel);
      }
      const {certificationData}=UseAppContext();
  return (
    <>
    <div className="p-5">
        <div className="flex items-center justify-end ">
        <button onClick={toggleModel} type="button" className="border text-tertiary text-sm font-semibold rounded border-tertiary px-4 py-[5px] hover:bg-green-700 hover:text-white hover:border-green-700 tracking-widest cursor-pointer transition-all ease-in-out duration-300">Add Certification</button>
      </div>
       <div className={`w-full mt-5 grid  gap-5 ${certificationData?.length <= 2 ?"grid-cols-[repeat(auto-fit,minmax(250px,400px))]":"grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"}`}>
        {
          certificationData.map((certification, index) => (
            <CertificationCard key={index} data={certification}/>
          ))
        }
       </div>
    </div>
    {
      showModel && (
        <AddCertificate onClose={toggleModel}/>
      )
    }
    </>
  )
}

export default Certifications