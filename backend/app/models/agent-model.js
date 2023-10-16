const mongoose = require('mongoose');

const Schema = mongoose.Schema

const agentSchema = new Schema({
    agentName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    languages: {
        type: [String], // "languages" is an array of strings
        required: true
    },
    propertyType: {
        type: [String], //  "propertyType" is an array of strings
        required: true
    },
    expertise: {
        type: [String], // "expertise" is an array of strings
        required: true
    },
    propertyImage: {
        type: String,
        required : true
    },
    areasOfOperation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    }
}, { timestamps: true })

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent
