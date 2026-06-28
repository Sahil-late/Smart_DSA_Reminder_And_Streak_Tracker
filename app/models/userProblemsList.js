import mongoose from 'mongoose'
const UserProblemsSchema = new mongoose.Schema({
    Email: String,
    Provider:String,
    Problems: [{
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
        status: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }]
});

export default mongoose.models.UserProblems || mongoose.model("UserProblems", UserProblemsSchema);