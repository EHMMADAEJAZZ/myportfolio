import mongoose from "mongoose";
const certificationSchema= new mongoose.Schema({
    
    title:{
        type: String,
        required: true,
    },
    institution:{
        type: String,
        required: true
    },
    certificationImage:{
        type: String,
        required: true
    },
    duration:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    year: {type: Number, required: true},

},{
    timestamps:true
});

const Certificate = mongoose.model('Certificate',certificationSchema);
export default Certificate;