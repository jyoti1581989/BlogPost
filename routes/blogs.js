const express = require('express')
const router = express.Router()

const blogsCtrl = require('../controllers/blogs')
const ensureLoggedIn = require('../config/ensureLoggedIn')


// GET /blogs
router.get('/', blogsCtrl.index)
//GET /blogs/new
router.get('/new', ensureLoggedIn, blogsCtrl.new)
//POST /blogs
router.post('/', ensureLoggedIn, blogsCtrl.create)
//POST /blogs
router.get('/:id', blogsCtrl.show)
//GET /blogs/:id/edit
router.get('/:id/edit', ensureLoggedIn, blogsCtrl.edit)
//PUT /blogs/:id
router.put('/:id', ensureLoggedIn, blogsCtrl.update)
//DELETE /blogs/:id/edit
router.delete('/:id', ensureLoggedIn, blogsCtrl.delete)


module.exports = router