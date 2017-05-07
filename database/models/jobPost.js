const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobPostSchema = mongoose.Schema({
    companyName: { type: String, default: null },
    jobTitle: { type: String, default: null },
    jobDescription: { type: String, default: null },
    basicQualifications: { type: String, default: null },
    preferredQualifications: { type: String, default: null },
    location: { type: String, default: null },
    jobUrl: { type: String, default: null },
    creation_ime: { type: Date, default: Date.now },
});

const JobPost = mongoose.model('JobPost', JobPostSchema);

module.exports = JobPost;