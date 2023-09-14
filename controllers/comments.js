const Blog = require('../models/blog')

module.exports = {
    create,
    delete: deleteComments
}

async function create(req, res) {
    const blog = await Blog.findById(req.params.id)
    // Map Data to match type
    req.body.isFavorite = req.body.isFavorite == 'Yes'
    // Add the user-centric info to req.body(the new comment)
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    // We can push(or unshift) subdocs into Mongooge arrays
    blog.comments.push(req.body)
    try {
        // Save any changes made to the blog doc
        await blog.save()
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/blogs/${blog._id}`)
}

async function deleteComments(req, res) {
    //Note the cool "dot" syntex to query on the property of a subdoc
    const blog = await Blog.findOne({ 'comments._id': req.params.id, "comments.user": req.user._id })
    // Rogue user!
    if (!blog) return res.redirect('/blogs')
    // Remove the comment using the remove method available on mongoose arrays
    blog.comments.remove(req.params.id)
    // Save the updated blog doc
    await blog.save()
    // Redirect back to the blog's show view
    res.redirect(`/blogs/${blog._id}`)
}



