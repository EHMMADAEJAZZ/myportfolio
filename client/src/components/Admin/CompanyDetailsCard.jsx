import { useState } from "react";
import { UseAppContext } from "../../context/appContext";
import formatDateTime from "../../utils/dateFormat"
import { toast } from "react-toastify";
import { contactMeApi } from "../../common/services";
import ConfirmDeleteBox from "./ConfirmDeleteBox";

const CompanyDetailsCard = ({data}) => {
  const [deleteId, setDeleteId] = useState('');
        const [deleting, setDeleting] = useState(false);
        const [showmore, setShowmore] = useState(false);
        const [showDeleteModel, setShowDeleteModel] = useState(false);
        const toggleDeleteModel = () => {
        setShowDeleteModel(!showDeleteModel);
      };
       const handleDelete = () => {
        toggleDeleteModel();
        setDeleteId(data?._id);
      };
       const { fetchPortfolio } = UseAppContext();
         const deleteCompany = async (companyId) => {
               setDeleting(true);
               try {
                 const response = await contactMeApi.deleteContactMeMessage(companyId)
                 console.log(response);
                 toast.success(response?.message);
                 fetchPortfolio();
               } catch (error) {
                 toast.error(error?.message);
               } finally {
                 setDeleting(false);
               }
             };
  return (
    <>
    <div className='flex flex-col gap-0.5 p-0 bg-primary  border border-gray-600 rounded-lg shadow-blue-50 shadow-md min-h-[200px] overflow-hidden'>
        
        <div className='px-4 py-2 flex flex-col gap-0.5'>
          <h1 className=' text-[1rem] capitalize font-semibold tracking-wide text-secondary'>
            {data?.companyName}
          </h1>
          <h2 className=' tracking-wide text-xs font-semibold lowercase text-gray-600 '>
            {data?.email}
          </h2>
          <h2 className=' tracking-wide text-xs font-semibold lowercase text-gray-600 '>
            <a href={"tel:" + data?.phoneNumber}>{data?.phoneNumber}</a>
          </h2>
          <h2 className=' tracking-wide text-xs font-semibold capitalize text-gray-600 '>
            {formatDateTime(data?.createdAt)}
          </h2>

          
          <div className={` p-1 text-[0.9rem] text-white ${showmore?"min-h-24 ":"min-h-24 max-h-24 "}`}>
            <p className={` text-xs tracking-wide first-letter:uppercase ${showmore?"line-clamp-none":"text-ellipsis line-clamp-4"}`}>
              {data?.message}
              
            </p>
            <button onClick={()=>setShowmore(!showmore)} className=" mt-1 border px-1 py-0.5" >
              {
                showmore ? "show less":"show more"
              }
            </button>
          </div>
          <div className='flex items-center justify-between'>
            
            <button
              onClick={handleDelete}
              className='bg-red-500 mt-2 hover:bg-red-700 text-xs tracking-wider text-white font-bold py-2 px-4 rounded'
              >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showDeleteModel && (
        <ConfirmDeleteBox
          closeModel={toggleDeleteModel}
          label={`Are you sure to Delete ${data?.title} Project permanently`}
          deleteHandler={deleteCompany}
          deleteId={deleteId}
          deleting={deleting}
        />
      )}
              </>
  )
}

export default CompanyDetailsCard