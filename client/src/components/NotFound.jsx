import { useNavigate } from "react-router-dom";

function NotFound() {
   const navigate= useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <button type="button"
      onClick={()=>navigate(-1)}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back 
      </button>
    </div>
  );
}

export default NotFound;