import mongoose, { Schema } from 'mongoose'

const resultsSchema = new Schema({
    studentNumber: String,
    gender: String,
    studentName: String,
    points: String,
    division: String,
    subjects: String,
    examType: String,
    examYear: String,
    schoolNumber: String,
    schoolName: String,
})

export default mongoose.model('results', resultsSchema)
