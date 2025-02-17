import { useState } from "react";
import { UseAppContext } from "../../context/appContext";
import ConfirmDeleteBox from "./ConfirmDeleteBox";
import { toast } from "react-toastify";
import { certificationApis } from "../../common/services";
import EditCerification from "./EditCerification";

const CertificationCard = ({data}) => {
    const [deleteId, setDeleteId] = useState('');
      const [deleting, setDeleting] = useState(false);
      const [showDeleteModel, setShowDeleteModel] = useState(false);
      const [showEditModel, setShowEditModel] = useState(false);
      const toggleDeleteModel = () => {
        setShowDeleteModel(!showDeleteModel);
      };
      const toggleEditModel = () => {
        setShowEditModel(!showEditModel);
      };
      const handleDelete = () => {
        toggleDeleteModel();
        setDeleteId(data?._id);
      };
      const { fetchPortfolio } = UseAppContext();
      const deleteExperience = async (certificationId) => {
        setDeleting(true);
        try {
          const response = await certificationApis.deleteCertifications(certificationId)
          console.log(response);
          toast.success(response?.message);
          fetchPortfolio();
        } catch (error) {
          console.error('Error deleting experience:', error.message);
        } finally {
          setDeleting(false);
        }
      };
  return (
    <>
      <div className='flex flex-col gap-0.5 p-0 bg-primary  border border-gray-600 rounded-lg shadow-blue-50 shadow-md min-h-[200px] overflow-hidden'>
        <div className='min-h-48 w-full bg-white'>
          <img
            src={data?.certificationImage}
            alt={data?.title}
            className='w-full max-w-full h-full object-scale-down bg-blend-color-dodge'
          />
        </div>
        <div className='px-4 py-2 flex flex-col gap-0.5'>
          <h1 className=' min-h-12 max-h-12 text-[1rem] text-ellipsis line-clamp-2 capitalize font-semibold tracking-wide text-secondary'>
            {data?.title}
          </h1>
          <h2 className=' tracking-wide text-xs font-semibold lowercase text-gray-600 '>
            {data?.institution}
          </h2>
          <h2 className=' tracking-wide text-xs font-semibold lowercase text-gray-600 '>
            {data?.duration}
          </h2>
          <h2 className=' tracking-wide text-xs font-semibold lowercase text-gray-600 '>
            {data?.year}
          </h2>

          
          <div className='min-h-20 max-h-20 p-1 text-[0.9rem] text-white'>
            <p className='text-ellipsis line-clamp-3 text-xs tracking-wide first-letter:uppercase'>
              {data?.description}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <button
              onClick={toggleEditModel}
              className='bg-blue-500 hover:bg-blue-700 text-white text-xs tracking-wider font-bold py-2 px-4 rounded'
            >
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
      </div>
      {showDeleteModel && (
        <ConfirmDeleteBox
          closeModel={toggleDeleteModel}
          label={`Are you sure to Delete ${data?.title} Project permanently`}
          deleteHandler={deleteExperience}
          deleteId={deleteId}
          deleting={deleting}
        />
      )}
      {showEditModel && <EditCerification onClose={toggleEditModel} data={data} />}
    </>
  )
}

export default CertificationCard