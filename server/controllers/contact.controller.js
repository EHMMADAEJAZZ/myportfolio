import Contact from '../models/contact.model.js';
import { ApiErrors } from '../utils/apiErrors.js';
import { ApiResponse } from '../utils/apiResponse.js';
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return next(new ApiErrors(400, ' Contact not found'));
    }
    res
      .status(200)
      .json(new ApiResponse(200, 'contact fetched successfully', contact));
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    age,
    gender,
    occupation,
    education,
    languages,
    address,
  } = req.body;
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          phone,
          age,
          gender,
          occupation,
          education,
          languages,
          address,
        },
      },
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return next(new ApiErrors(400, 'Contact not found'));
    }
    res
      .status(200)
      .json(
        new ApiResponse(200, 'contact updated successfully', updatedContact)
      );
  } catch (error) {
    next(error);
  }
};
