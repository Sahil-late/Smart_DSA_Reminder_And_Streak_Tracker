import mongoose from 'mongoose'

const SignSchema = new mongoose.Schema({
  email: String,
  password:String
});

const Sign = mongoose.models.SignIn || mongoose.model("SignIn", SignSchema);

export default Sign;