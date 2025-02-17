import About from '../models/about.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';

//update an about

export const updateAbout = async (req, res, next) => {
  const { lottieUrl, description1, description2 ,skills} = req.body;
  const {id} = req.params
  try {
    if (!lottieUrl || !description1 || !description2 || !skills) {
      return next(new ApiErrors(400, 'All fields are required'));
    }
    const about = await About.findByIdAndUpdate(id, {
      $set:{
      lottieUrl,
      description1,
      description2,
      skills
      }
    }, { new: true });
    if (!about) {
      return next(new ApiErrors(404, 'About not found'));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, 'About updated successfully', about));
  } catch (error) {
    next(error);
  }
};
