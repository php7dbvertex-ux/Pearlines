import mongoose from "mongoose";

const aboutUsSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        
      },

      description: {
        type: String,
       
      },

      phone: {
        type: String,
       
      },

      website: {
        type: String,
    
      },
    },
   
  );

export default mongoose.model(
  "AboutUs",
  aboutUsSchema
);