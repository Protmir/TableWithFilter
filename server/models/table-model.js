const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        start_date: {
            type: String,
            required: true
        }
    },
    {timestamps: true},
)

module.exports = mongoose.model('tables', Table)