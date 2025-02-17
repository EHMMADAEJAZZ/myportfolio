import Project from '../models/project.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudinary, uploadOnCloudinary } from '../utils/cloudinary.js';

//add new project
export const addProject = async (req, res, next) => {
  const { title, description, link, technologies } = req.body;
  const imagePath = req.file?.path;
 
  try {
    if (!title || !description || !link || !technologies || !imagePath) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    const imageUrl = await uploadOnCloudinary(imagePath)
    const project = await Project.create({
      title,
      description,
      link,
      technologies,
      image:imageUrl?.secure_url
    });
    return res.status(201).json(new ApiResponse(201,'Project Added successfully', project));

  } catch (error) {
    next(error);
  }
};

//get All Projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({});
    return res.status(200).json(new ApiResponse(200, 'Projects fetched successfully', projects));
  } catch (error) {
    next(error);
  }
};

//update project
export const updateProject = async (req, res, next) => {
    try {
         const { id } = req.params;
  const { title, description, link, technologies } = req.body;
  
    const imagePath = req.file?.path;
    const project = await Project.findById(id);
    if (!project) {
      return next(new ApiErrors(404, 'Project not found'));
    }
    let imageUrl
    
    if (imagePath && project.image) {
        await deleteOnCloudinary(project.image)
       imageUrl = await uploadOnCloudinary(imagePath);
    }
    if(imagePath && !project.image){
       imageUrl = await uploadOnCloudinary(imagePath);

    }
    if(!title || !description || !link || !technologies || (!imageUrl && !project.image)){
      return next(new ApiErrors(400, 'All fields are required'));
    } 
    const updateProject = await Project.findByIdAndUpdate(id,{
        $set:{
            title:title,
            description:description,
            link:link,
            technologies:technologies,
            image: imageUrl?.secure_url || project.image
        }
    },
{
    new: true,
    runValidators:true
})
    return res.status(200).json(new ApiResponse(200,'Project updated successfully', updateProject));
        
    } catch (error) {
        next(error);
        
    }
   

}

//delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return next(new ApiErrors(404, 'Project not found'));
    }
    await deleteOnCloudinary(project.image);
    await Project.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200,'Project deleted successfully'));
  } catch (error) {
    next(error);
  }
};