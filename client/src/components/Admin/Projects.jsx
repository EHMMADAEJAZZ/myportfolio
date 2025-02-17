import { useState } from "react";
import { UseAppContext } from "../../context/appContext";
import AddProject from "./AddProject";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const {projectData}=UseAppContext()
    const [showModel, setShowModel] = useState(false);
    const toggleModel=()=>{
      setShowModel(!showModel);
    }
  return (
    <>
     <div className="p-5">
        <div className="flex items-center justify-end ">
        <button onClick={toggleModel} type="button" className="border text-tertiary text-sm font-semibold rounded border-tertiary px-4 py-[5px] hover:bg-green-700 hover:text-white hover:border-green-700 tracking-widest cursor-pointer transition-all ease-in-out duration-300">Add Project</button>
      </div>
       <div className={`w-full mt-5 grid  gap-5 ${projectData?.length <= 2 ?"grid-cols-[repeat(auto-fit,minmax(250px,400px))]":"grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"}`}>
         {
          projectData.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))
            

        }
       </div>
    </div>
    {
      showModel && (
        <AddProject onClose={toggleModel}/>
      )
    }
    </>

  )
}

export default Projects