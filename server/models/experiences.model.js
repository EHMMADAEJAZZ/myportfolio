import mongoose from 'mongoose';

const experiencesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);
const Experience = mongoose.model('Experience', experiencesSchema);

export default Experience;
