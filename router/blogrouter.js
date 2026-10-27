
const blogControler = require("../controler/blogControler")

const express = require("express")

const router = express.Router()

router.get("/", blogControler.sentBlogs)
router.get("/:id", blogControler.sentBlogsByID)
router.post("/",blogControler.createBlogs)
router.patch("/:id", blogControler.updateBlog)
router.delete("/:id", blogControler.removeBlogs)

module.exports = router;