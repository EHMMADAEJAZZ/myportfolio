import Experience from "../models/experiences.model.js";
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';

//add new experience with title,company period location and description 
export const newExperience = async (req,res,next)=>{
    

    try {const {title,company,location,period,description} = req.body;
        if(!title || !company || !location || !period || !description){
            return next(new ApiErrors(400,' All fields are required'))
        }
        const experience =  await Experience.create({
            title,
            company,
            location,
            period,
            description
        })
        return res.status(201).json(new ApiResponse(201,' experience created successfully',experience));
        
    } catch (error) {
        next(error);
        
    }
}
//get All experiences
export const getAllExperiences =async(req,res,next)=>{
    try {
        const allExperiences = await Experience.find({});
        if(!allExperiences.length){
            return next(new ApiErrors(400,'experience not found'));
        }
        return res.status(200).json(new ApiResponse(200,'experiences fetched successfully',allExperiences));
    } catch (error) {
        next(error)
        
    }
}

//update experience details
export const updateExperiences = async(req,res,next) => {
const {title,company,location,period,description} = req.body;
const {id} = req.params;
    try {
          if(!title || !company || !location || !period || !description){
            return next(new ApiErrors(400,' All fields are required'))
        }
        const updatedExp = await Experience.findByIdAndUpdate(id,{
            $set:{
                title:title,
                company:company,
                location:location,
                period:period,
                description:description
            }},{
                new:true,
                runValidators:true
            }
        )
        if(!updatedExp){
            return next(new ApiErrors(404,'experience not found'));
        }
        return res.status(200).json(new ApiResponse(200,'experience updated successfully',updatedExp));
        
    } catch (error) {
        next(error)
        
    }
}



//delete experience details
export const deleteExperience = async(req,res,next)=>{
    const {id} = req.params;
    console.log(id)
    
    try {
        const exp = await Experience.findByIdAndDelete(id);
        if(!exp){
            return next(new ApiErrors(404,'Experience not found'))
        }
        return res.status(200).json(new ApiResponse(200,'Experiences deleted successfully'))
    } catch (error) {
        next(error)
    }
}