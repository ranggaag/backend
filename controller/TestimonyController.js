import Testimony from "../models/TestimonyModel.js"
import path from "path"
import fs from "fs"

export const getTestimony = async(req, res) => {
    try {
        const testimony = await Testimony.findAll()

        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : testimony
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }

}

export const getTestimonyById = async(req, res) => {
    try {
        const testimony = await Testimony.findOne({
            where : {
                id : req.params.id
            }
        })

        res.json({
            status_code: 200,
            message: "DATA SUCCESSFULLY OBTAINED",
            data: testimony
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

export const saveTestimony = (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
    const rating = req.body.rating
    const name = req.body.name
    const description = req.body.description
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/profile/${fileName}`
    const allowedType = ['.png', '.jpg', 'jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
        status_code : 422,
        msg: "Invalid images"
    })

    if(fileSize > 5000000) return res.status(422).json({
        status_code : 422,
        msg: "File size is too large. Max size is 5MB"
    })

    file.mv(`./public/profile/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Testimony.create({
                rating : rating,
                name : name,
                description : description,
                profile : fileName,
                url_profile : url
            })
            res.status(201).json({
                status_code: 201,
                msg: "Testimony Created Successfully"
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                status_code : 500,
                message: "Internal server error"
            });
        }
    })

}

// update testimony

export const updateTestimony = async(req, res) => {
    const testimony = await Testimony.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!testimony) return res.status(404).json({
        status_code: 404,
        message: "Data Not Found"
    })

    let fileName = testimony.profile

    if(req.files !== null){
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png', '.jpg', 'jpeg']

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"})
        if(fileSize > 5000000) return res.status(422).json({msg: "File size is too large. Max size is 5MB"})

        const filepath = `./public/profile/${testimony.profile}`
        fs.unlinkSync(filepath)

        file.mv(`./public/profile/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message})
        })
    }

    const rating = req.body.rating
    const name = req.body.name
    const description = req.body.description
    const url = `${req.protocol}://${req.get("host")}/profile/${fileName}`

    try {
        await Testimony.update({
            rating : rating,
            name : name,
            description : description,
            profile : fileName,
            url_profile : url
        },
        {
            where  : {
                id : req.params.id
            }
        })

        res.status(200).json({
            status_code: 200,
            message: "Product Updated Successfully"
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

// delete testimony

export const deleteTestimony = async(req, res) => {

    const testimony = await Testimony.findOne({
        where : {
            id : req.params.id
        }
    })

    if(!testimony) return res.status(404).json({
        status_code : 404,
        message : "Data Not Found"
    })
    
    try {
        await Testimony.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status_code: 200,
            msg: "Data Successfully Deleted"
        })
    } catch (error) {
        console.log(err.message)
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}