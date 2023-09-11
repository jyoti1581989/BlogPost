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

module.exports = router