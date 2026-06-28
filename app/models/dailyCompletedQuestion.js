import mongoose from "mongoose";
const dailyCompletedQuestionSchema = new mongoose.Schema({
    Email: String,
    Provider: String,
    Questions: [{
        date: Date,
        solved: [
            {
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
            }
        ],
    }],
    xp: {
        type: Number,
        default: 0
    },
})
export default mongoose.models.dailyCompletedQuestion || mongoose.model('dailyCompletedQuestion', dailyCompletedQuestionSchema)