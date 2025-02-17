import ContactMessages from "../models/contactme.model.js";

import sendEmail from '../config/sendEmail.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { contactMeEmail } from "../utils/verifyUser.js";
// Create and Save a new ContactMe
export const newContactMe = async(req,res,next)=>{
    const {companyName,email,phoneNumber,message} = req.body;
    try {
        const contact = await ContactMessages.create({
            companyName,
            email,
            phoneNumber,
            message
        })
        if(contact._id){

            await contactMeEmail('ehmmadaejazz33@gmail.com', companyName, message,res,"company contact")
        }else {
            return next(new ApiErrors(500,'something went wrong please try agian'))
        }
    } catch (error) {
        next(error)
    }
};

// Retrieve and return all ContactMes from the database.
export const getAllContactMessages = async(req,res,next)=>{
    try {
        const contacts = await ContactMessages.find({});
        
        return res.status(200).json(new ApiResponse(200,"contacts fetched successfully",contacts))
    } catch (error) {
        next(error)
    }
};
//delete contacts
export const deleteContactMe = async(req,res,next)=>{
    const {id} = req.params;
    try {
        const contact = await ContactMessages.findByIdAndDelete(id);
        if(!contact){
            return res.status(404).json(new ApiResponse(404,'Contact not found'))
        }
        return res.status(200).json(new ApiResponse(200,"contact deleted successfully"))
    } catch (error) {
        next(error)
    }
};