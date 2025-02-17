import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
     phone: {
        type: String,
        required: true,
       
        validate:{
            validator: function(v) {
                return /^\+91\d{10}$|^\+91 \d{5} \d{5}$|^0\d{10}$/.test(v);
            },
            message: 'please enter a valid phone number with  country code eg +91 or 0'
        }
    },
    age:{
        type: Number,
        required: true,
        min: [18,'age must be at least 18 years'],
        max: [70,'age must be at most 70 years'],
    },
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    occupation:{
        type: String,
        required: true,
    },
    education:{
        type: String,
        required: true,
    },
   
    languages:{
        type: [String],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
  
},{
    timestamps: true,
});
const Contact = mongoose.model('Contact',contactSchema);

export default Contact;