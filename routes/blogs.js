const express = require('express')
const router = express.Router()

const blogsCtrl = require('../controllers/blogs')


// GET /movies

router.get('/', blogsCtrl.index)

module.exports = router