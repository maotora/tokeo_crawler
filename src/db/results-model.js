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

const sampleResults = new Schema({
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

export const Results = mongoose.model('results', resultsSchema)
export const SampleDb = mongoose.model('sampleResults', sampleResults, 'resultsTable')
