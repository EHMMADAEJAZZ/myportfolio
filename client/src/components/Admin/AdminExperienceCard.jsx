import { useState } from "react";
import { experienceApis } from "../../common/services";
import { UseAppContext } from "../../context/appContext";
import ConfirmDeleteBox from "./ConfirmDeleteBox";
import { toast } from "react-toastify";
import AdminEditExperience from "./AdminEditExperience";

const AdminExperienceCard = ({ data }) => {
    const [deleteId, setDeleteId] = useState('')
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const toggleDeleteModel = () => {
        setShowDeleteModel(!showDeleteModel);
    }
    const toggleEditModel = () => {
        setShowEditModel(!showEditModel);
    }
    const handleDelete = () => {
        toggleDeleteModel()
        setDeleteId(data?._id);
    };
    const {fetchPortfolio} =UseAppContext()
    const deleteExperience =async(experienceId)=>{
        setDeleting(true)
        try {
          const response = await experienceApis.deleteExperience(experienceId);
          console.log(response);
          toast.success(response?.message)
          fetchPortfolio()
        } catch (error) {
          console.error('Error deleting experience:', error.message);
        }finally{
            setDeleting(false)
  
        }
      };
    
  return (
    <>
      <div className='flex flex-col gap-0.5 p-6 bg-primary  border border-gray-600 rounded-lg shadow-blue-50 shadow-md min-h-[250px] overflow-hidden'>
        <h1 className=' text-lg capitalize font-semibold tracking-wide text-secondary'>
          {data?.title}
        </h1>
        <h2 className=' tracking-wide text-xs font-semibold capitalize text-gray-600 '>
         {data?.company}
        </h2>
        <h3 className="text-secondary capitalize text-sm font-semibold">{data?.location}</h3>
        <h4 className="text-gray-600 text-xs font-semibold capitalize tracking-widest">{data?.period}</h4>
        <div className="min-h-20 max-h-20 p-1 text-[0.9rem] text-white">

        <p className="text-ellipsis line-clamp-3 text-xs tracking-wide first-letter:uppercase">{data?.description}</p>
        </div>
        <div className='flex items-center justify-between'>
              <button onClick={toggleEditModel} className='bg-blue-500 hover:bg-blue-700 text-white text-xs tracking-wider font-bold py-2 px-4 rounded'>
                Edit
              </button>
            <button
            onClick={handleDelete}
              className='bg-red-500 hover:bg-red-700 text-xs tracking-wider text-white font-bold py-2 px-4 rounded'
             
            >
              Delete
            </button>
        </div>
      </div>
      {
        showDeleteModel && (
            <ConfirmDeleteBox closeModel={toggleDeleteModel}
            label={`Are you sure to Delete ${data?.title} Experience permanently`}
            deleteHandler={deleteExperience}
            deleteId={deleteId}
              deleting={deleting}            
            />
        )
          
      }
      {
        showEditModel && (
            <AdminEditExperience onClose={toggleEditModel} data={data}/>
        )
      }
    </>

  );
};

export default AdminExperienceCard;
