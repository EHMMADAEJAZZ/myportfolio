import Intro from '../models/intro.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';

//create a new intro
export const createIntro = async (req, res, next) => {
  const { welcomeText, firstName, lastName, caption, description } = req.body;
  try {
    if (!welcomeText || !firstName || !lastName || !caption || !description) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    const intro = await Intro.create({
      welcomeText,
      firstName,
      lastName,
      caption,
      description,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, 'intro created successfully', intro));
  } catch (error) {
    next(error);
  }
};

//get intro
export const getIntro = async (req, res, next) => {
  try {
    const intro = await Intro.findOne();
    if (!intro) {
      return next(new ApiErrors(404, 'Intro not found'));
    }
    return res
     .status(200)
     .json(new ApiResponse(200, 'intro fetched successfully', intro));
  } catch (error) {
    next(error);
  }
};

//update intro by id


export const updateIntro = async (req, res, next) => {
    const { welcomeText, firstName, lastName, caption, description } = req.body;
      const {id} = req.params;
    try {
        if (!welcomeText || !firstName || !lastName || !caption || !description) {
          return next(new ApiErrors(400, 'All fields are required'));
        }
      const intro = await Intro.findByIdAndUpdate(id,{
        $set: {
            welcomeText,
            firstName,
            lastName,
            caption,
            description,
        }
    },
        {
            new: true,
            runValidators: true,
        }
      )
    
     
      if (!intro) {
        return next(new ApiErrors(404, 'Intro not found'));
      }
      return res
       .status(200)
       .json(new ApiResponse(200, 'Intro updated successfully', intro));
    } catch (error) {
      next(error);
    }
  };

  //delete intro by id
  export const deleteIntro = async (req, res, next) => {
    try {
        const {id} = req.params;
      const intro = await Intro.findByIdAndDelete(id);
      if (!intro) {
        return next(new ApiErrors(404, 'Intro not found'));
      }
      return res
       .status(200)
       .json(new ApiResponse(200, 'Intro deleted successfully'));
    } catch (error) {
      next(error);
    }
  };    