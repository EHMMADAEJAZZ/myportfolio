import User from '../models/user.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';


//update user

export const updateUser = async (req, res, next) => {
  const { name, email, mobile } = req.body;
  try {
    if (req.body.password) {
      return next(new ApiErrors(400, 'this route is not for password change'));
    }
    if (!name && !email && !mobile) {
      return next(
        new ApiErrors(
          400,
          'PLease provide at least one field to update: name , email or mobile'
        )
      );
    }
   
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name || req.user.name,
          email: email || req.user.email,
          mobile: mobile || req.user.email,
        },
      },
      { new: true,runValidators: true }
    );
    return res
      .status(200)
      .json(new ApiResponse(200, 'user updated successfully', updatedUser));
  } catch (error) {
    next(error);
  }
};
