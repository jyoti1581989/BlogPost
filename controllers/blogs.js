const Blog = require('../models/blog')

module.exports = {
    index,
    new: newBlog,
    create,
    show,
    myBlogs,
    edit: editBlog,
    update: updateBlog,
    delete: deleteBlog
}

async function index(req, res) {
    const blogs = await Blog.find({})
    res.render('blogs/index', { title: "All Blogs", blogs })
}

function newBlog(req, res) {
    // We'll want to be able to render an  
    // errorMsg if the create action fails
    res.render('blogs/new', { title: 'Add Blog', errorMsg: '' })
}

async function create(req, res) {
    req.body.userId = req.user._id
    try {
        const blog = await Blog.create(req.body)
        // Redirect to the new movie's show functionality
        res.redirect(`/blogs/${blog._id}`)
    } catch (err) {
        // Typically some sort of validation error
        console.log(err)
        res.render('blogs/new', { errorMsg: err.message })
    }
}

async function show(req, res) {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/show', { title: blog.title, blog })
}

async function myBlogs(req, res) {
    const blogs = await Blog.find({ userId: req.user._id })
    res.render('myblogs/index', { title: 'My Blog', blogs })

}

async function editBlog(req, res) {
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/edit', {
        title: "Edit Blog",
        blog
    })
}

async function updateBlog(req, res) {
    try {
        const updatedBlog = await Blog.findOneAndUpdate({ '_id': req.params.id },
            // update object with updates properties    
            req.body,
            // options object {new: true} return update doc
            { new: true })
        res.redirect(`/blogs/${updateBlog._id}`)
    } catch (e) {
        console.log(e.message)
        res.redirect('/blogs')
    }

}
async function deleteBlog(req, res) {
    await Blog.findOneAndDelete({ '_id': req.params.id })
    res.redirect('/blogs')

}
