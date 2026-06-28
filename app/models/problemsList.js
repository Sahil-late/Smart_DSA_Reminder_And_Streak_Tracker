import mongoose from 'mongoose'
const ProblemsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },

  question: {
    type: String,
    required: true,
  },

  difficultyLevel: {
    type: String,
    required: true
  },

  xp: {
    type: Number,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true
  }
});

export default mongoose.models.Problems || mongoose.model("Problems", ProblemsSchema);