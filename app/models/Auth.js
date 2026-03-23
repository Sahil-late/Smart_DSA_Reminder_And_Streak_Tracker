import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  email: String,
  provider:String
});

const Auth = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);

export default Auth;