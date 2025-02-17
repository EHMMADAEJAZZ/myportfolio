import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
    welcomeText:{
        type: String,
        required: true,
        trim: true,
    },
    firstName:{
        type: String,
        required: true,
        trim: true,
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
    },
    caption:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
 
},{
    timestamps: true
})
const Intro = mongoose.model('Intro',introSchema);

export default Intro;