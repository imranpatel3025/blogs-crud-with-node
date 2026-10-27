
const { error } = require("node:console")
let blogs = require("../data/blog")
const { read } = require("node:fs")
const { title } = require("node:process")

function sentBlogs(req, res){
    try{
        res.status(200).json({
            success : true,
            data : blogs,            
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : `Somthing Went Wrong....!`,
            error : err.message
        })
    }   
}

function sentBlogsByID(req, res){
    try{
        let blogId = req.params.id
        let blog = blogs.find(b => b.id === blogId)
        if(!blog){
            return res.status(404).json({
                success : false,
                message : `Blog with id is not found..!`
            })
        }

        res.status(200).json({
            success : true,
            message : `Blog is fetched Successfully`,
            data : blog
        })

    }catch(err){
        res.status(500).json({
            success : false,
            message : `Somthing Went wrong...!`,
            error : err.message
        })
    }
}

function createBlogs(req, res){
    try{
        let body =  req.body
        if(!body.title || !body.content){
            return res.status(404).json({
                success : false,
                message : `Title and Content is not found...!`
            })
        }
        let newObj = {
            title : body.title,
            content : body.content,
            userid : body.userid,
            id : Date.now().toString()
        }
        blogs.push(newObj)
        res.status(201).json({
            success : true,
            message : `New Blog is Created Succesfuly...!`,
            data : newObj
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Somthing went Wrong....!`
        })
    }
}

function updateBlog(req,res){
    try{
        let updateID = req.params.id;
        let body = req.body;
        let blogIndex = blogs.findIndex(b => b.id === updateID)
        if(!blogIndex === -1){
            return res.status(404).json({
                success : false ,
                 message : `Blog With id is not Found...!`
            })
        }

        if(!body.title || !body.content){
            return res.status(404).json({
                success : false,
                message : `Title and Content is not found...!`
            })
        }

        let updateObj = {
            ...blogs[blogIndex],
            title : body.title,
            content : body.content
        }
        blogs[blogIndex] = updateObj;

        res.status(200).json({
            success : true,
            message : `Blog is updated successfully...!`
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `Somthing went wrong`,
            error : err.message
        })
    }
}

function removeBlogs(req, res){
    try{
        let removeID = req.params.id
        let removeIndex = blogs.findIndex(b => b.id === removeID)
        if(!removeIndex === -1){
            return res.status(404).json({
                success : false,
                message : `Remove Id is not found..!`
            })
        }

        let removeBlog = blogs.splice(removeBlogs, 1)
        res.status(200).json({
            success : true,
            message : `Blog is Removed Successfully`,
            data : removeBlog[0]
        })
    }catch(err){
        res.status(500).json({
            success : false,
            message : `somthing went wrong...!`
        })
    }
}

module.exports = {
    sentBlogs,
    sentBlogsByID,
    createBlogs,
    updateBlog,
    removeBlogs
}