import About from "../models/about.model.js";
import Contact from "../models/contact.model.js";
import Intro from "../models/intro.model.js";
import Experience from "../models/experiences.model.js";
import Certificate from "../models/certification.model.js";
import Project from '../models/project.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
export const portfolio= async(req,res,next)=>{
    try {
        const [about,contact,intro,experience,project,certification] = await Promise.all([
            About.findOne(),
            Contact.findOne(),
            Intro.findOne(),
            Experience.find({}),
            Project.find({}),
            Certificate.find({})  
        ])
        if (!about ||!contact ||!intro) {
            return res.json(new ApiResponse(200, 'No Data Found'));
        }
        return res.json(new ApiResponse(200, 'Portfolio fetched successfully', { about, contact, intro,experience,project,certification }))
    } catch (error) {
        next(error)
        
    }
}
    