import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000,
    },
    
    link:{
        type: String,
        required: true,
       
    },
    image:{
        type: String,
        required: true,
        
    },
    technologies: {
        type: [String],
        required: true,
        minlength: 2,
        maxlength: 10,
    },
   

},{
    timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);

export default Project;