const mongoose = require('mongoose')
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

//Comments embedded into blog
const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isFavorite: {
        type: Boolean,
        required: true
    },
    userName: String,
    userAvtar: String
}, {
    timestamps: true
})


const blogSchema = new Schema({
    title: { type: String, required: true },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    comments: [commentSchema]
}, {
    timestamps: true

})

// Compile the schema into a model and export it
module.exports = mongoose.model('Blog', blogSchema)