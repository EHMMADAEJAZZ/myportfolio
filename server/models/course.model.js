import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    institution:{
        type: String,
        required: true
    },
    logo:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
},{
    timestamps: true
});

const Course = mongoose.model("Course", courseSchema);

export default Course;