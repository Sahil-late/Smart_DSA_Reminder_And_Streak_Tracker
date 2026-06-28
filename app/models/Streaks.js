import mongoose from 'mongoose'
const streaksSchema = new mongoose.Schema({
    Email: { required: true, type: String },
    Provider: { required: true, type: String },
    Streak: { required: true, type: Number, default: 1 },
    CurrentStreak: { required: true, type: Date },
})

export default mongoose.models.Streaks || mongoose.model("Streaks", streaksSchema);