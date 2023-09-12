const express = require('express')
const router = express.Router()

const blogsCtrl = require('../controllers/blogs')
const ensureLoggedIn = require('../config/ensureLoggedIn')

//GET /myblogs
router.get('/', ensureLoggedIn, blogsCtrl.myBlogs)
module.exports = router