import mongoose from 'mongoose'
const codesSchema = new mongoose.Schema({
    User:{required:true,type:String},
    Provider:{required:true,type:String},
    Lang_id:{required:true,type:String},
    Language:{required:true,type:String},
    Question:{required:true,type:String},
    Code:{required:true,type:String}
})

export default mongoose.models.Codes || mongoose.model("Codes", codesSchema);