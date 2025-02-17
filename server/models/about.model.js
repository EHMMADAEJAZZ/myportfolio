import mongoose from "mongoose";
const aboutSchema = new mongoose.Schema({
    lottieUrl:{
        type:String,
        default:'https://lottie.host/69cdc480-50bd-4d10-8dc6-0d0dc8133fe8/auJsXwkbJA.lottie'
    },
    description1:{
        type:String,
        required:true,
    },
    description2:{
        type:String,
        required:true,
    },
  skills:{
    type:Array,
    required:true,
    default:[],
  },
  userId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
      }
},{
    timestamps:true,
});

const About = mongoose.model("About", aboutSchema);
export default About;