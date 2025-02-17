import mongoose from "mongoose";

const contactmeSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
         validate:{
            validator: function(v) {
                return /^\+91\d{10}$|^\+91 \d{5} \d{5}$|^0\d{10}$/.test(v);
            },
            message: 'please enter a valid phone number with  country code eg +91 or 0'
        }
    },
    message:{
        type: String,
        required: true,
        minlength: [10,'minimum 10 characters'],
        maxlength: [2000,'maximum 2000 characters'],
    },
},{
    timestamps: true,
});

const ContactMessages = mongoose.model('ContactMessages', contactmeSchema);

export default ContactMessages;
