const express = require('express')
const router = express.Router()
const commentsCtrl = require('../controllers/comments')
const ensureLoggedIn = require('../config/ensureLoggedIn')

//POST /blogs/:id/comments (create comment for a blog)
router.post('/blogs/:id/comments', ensureLoggedIn, commentsCtrl.create)
//DELETE/ comments/:id
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete)

module.exports = router
