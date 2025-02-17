import Certificate from "../models/certification.model.js";
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

//add new certfication
export const addCertification = async(req,res,next)=>{
    
    const {title,institution,duration,description,year} = req.body;
    try {
        const imagePath = req.file?.path;
        if(!title || !institution || !duration || !year || !description || !imagePath){
            return next(new ApiErrors(400,'All fields are required'))

        } 
        const imageUrl = await uploadOnCloudinary(imagePath);
        const newCertification = await Certificate.create({
            title,
            institution,
            duration,
            description,
            year,
           certificationImage: imageUrl?.secure_url
        });
        res.status(201).json(new ApiResponse(201,'certification created successfully',newCertification));
    } catch (error) {
        next(error);
    }
}

//get all certifications
export const getAllCertifications = async(req,res,next)=>{
    try {
        const certifications = await Certificate.find();
        res.json(new ApiResponse(200,'all certifications fetched successfully',certifications));
    } catch (error) {
        next(error);
    }
};

//get single certification
export const getCertificationById = async(req,res,next)=>{
    try {
        const certification = await Certificate.findById(req.params.id);
        if(!certification){
            return next(new ApiErrors(404,'certification not found'));
        }
        res.json(new ApiResponse(200,'certification fetched successfully',certification));
    } catch (error) {
        next(error);
    }
};

//update certification
export const updateCertification = async(req,res,next)=>{
    const {title, institution, duration, description, year} = req.body;
    const {id} = req.params;
    console.log(id)
    try {
        const imagePath = req.file?.path;
        const certification = await Certificate.findById(id);
        if(!certification){
            return next(new ApiErrors(404,'certification not found'));
        };
        let imageUrl;
        if(imagePath && certification?.certificationImage){
            imageUrl = await uploadOnCloudinary(imagePath);
            await deleteOnCloudinary(certification?.certificationImage)
        }
        if(imagePath && !certification?.certificationImage){
            imageUrl = await uploadOnCloudinary(imagePath);
        }
        if(!title || !description || !institution || !duration || !year || (!imageUrl && !certification?.certificationImage)){
            return next(new ApiErrors(400,'All fields are required'))
        }
        const updatedCertification = await Certificate.findByIdAndUpdate(id, {
            title,
            institution,
            duration,
            description,
            year,
            certificationImage: imageUrl?.secure_url || certification?.certificationImage
        }, {new: true,runValidators:true});
        
        res.json(new ApiResponse(200,'certification updated successfully',updatedCertification));
    } catch (error) {
        next(error);
    }
};


//delete certification
export const deleteCertification = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const certification = await Certificate.findById(id);
        if(!certification){
            return next(new ApiErrors(404,'certification not found'));
        }
        await deleteOnCloudinary(certification?.certificationImage);
        await Certificate.findByIdAndDelete(id);
        res.json(new ApiResponse(200,'certification deleted successfully'));
    } catch (error) {
        next(error);
    }
};