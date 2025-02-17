import { useEffect, useState } from "react"
import { contactMeApi } from "../../common/services";
import CompanyDetailsCard from "./CompanyDetailsCard";
import { toast } from "react-toastify";

const CompanyContacts = () => {
    const [company, setCompany] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getCompany = async()=>{
        setIsLoading(true);
        try {
            const response =await contactMeApi.getContactMeMessages();
            setCompany(response?.data)
        } catch (error) {
            toast.error(error?.message)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        getCompany();
       
    },[])
  return (
    <div className="p-5">
        <h1 className='text-center text-sm xs:text-lg sm:text-xl underline underline-offset-8 text-secondary uppercase font-bold tracking-widest '>
        company contacts
      </h1>
      {
        company?.length>0?(<div className={`w-full mt-5 grid  gap-5 ${company?.length <= 2 ?"grid-cols-[repeat(auto-fit,minmax(250px,400px))]":"grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"}`}>
            {
             isLoading?(<p>loading......</p>):company?.map((comp,index)=>(

                    <CompanyDetailsCard key={index} data={comp}/>
                ))
            }
        </div>):(<div className="w-full flex items-center justify-center h-[50vh]">
            <p className="text-sm border shadow-xl shadow-gray-500 font-semibold bg-white text-red-600 p-10 rounded tracking-widest underline underline-offset-4 animate-pulse transition-all ease-in-out duration-500"> NO MESSAGE FOUND</p>
        </div>)
      }
        
    </div>
  )
}

export default CompanyContacts