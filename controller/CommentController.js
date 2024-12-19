import Comment from "../models/CommentModel.js"

export const getComments = async (req, res) => {
    try {
        const comment = await Comment.findAll()
        
        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : comment
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCommentById  = async (req, res) => {
    try {
        const comment = await Comment.findOne({
            where : {
                id: req.params.id
            }
        })

        res.json({
            status_code: 200,
            message: "DATA SUCCESSFULLY OBTAINED",
            data: comment
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const saveComment  = async (req, res) => {
    if(!req.body) return res.status(400).json({msg: "No File Uploaded"})
    
    const { name, description, attendance } = req.body
    
    if (!name || !description || attendance === undefined) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    try {
        await Comment.create({
            name: name,
            description: description,
            attendance: attendance
        })

        res.status(201).json({
            status_code: 201,
            message: "DATA SUCCESSFULLY CREATED",
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }

}

export const updateComment  = async (req, res) => {

    const comment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!comment) return res.status(404).json({
        status_code : 404,
        message: "Data Not Found"
    })

    const { name, description, attendance } = req.body
    try {
        await Comment.update({
            name: name,
            description: description,
            attendance: attendance 
        },
        {
            where : {
                id : req.params.id
            }
        })

        res.status(200).json({
            status_code : 200,
            message : "Data Successfully Updated"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

export const deleteComment  = async (req, res) => {
    const comment = await Comment.findOne({
        where : {
            id : req.params.id
        }
    })

    if(!comment) return res.status(404).json({
        status_code : 404,
        message : "Data Not Found"
    })

    try {
        await Comment.destroy({
            where : {
                id : req.params.id
            }
        })

        res.status(200).json({
            status_code : 200,
            message : "Data Successfully Deleted"
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }

}
