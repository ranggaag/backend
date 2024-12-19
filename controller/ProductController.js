import Product from "../models/ProductModel.js"
import path from "path"
import fs from "fs"

//  get products

export const getProducts = async(req, res) => {
    try {
        const product = await Product.findAll()

        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : product
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

// get product by id

export const getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })

        res.json({
            status_code: 200,
            message: "DATA SUCCESSFULLY OBTAINED",
            data: product
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

// input product

export const saveProduct = (req, res) => {
    if(req.files === null) return res.status(400).json({
        status_code: 400,
        msg: "No File Uploaded"
    })
    const productName = req.body.name
    const productCategory = req.body.category
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    const allowedType = ['.png', '.jpg', 'jpeg']

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"})
    if(fileSize > 5000000) return res.status(422).json({msg: "File size is too large. Max size is 5MB"})

    file.mv(`./public/images/${fileName}`, async(err) => {
        if(err) return res.status(500).json({
            status_code: 500,
            msg: err.message
        })
        try {
            await Product.create({
                product_name: productName,
                product_category: productCategory,
                product_image: fileName,
                url_image: url
            })
            res.status(201).json({
                status_code: 201,
                msg: "Product Created Successfully"
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

// update product

export const updateProduct = async(req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!product) return res.status(404).json({
        status_code: 404,
        message: "NO DATA FOUND"
    })

    let fileName = product.product_image
    
    if(req.files !== null){
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png', '.jpg', 'jpeg']

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"})
        if(fileSize > 5000000) return res.status(422).json({msg: "File size is too large. Max size is 5MB"})

        const filepath = `./public/images/${product.product_image}`
        fs.unlinkSync(filepath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if(err) return res.status(500).json({msg: err.message})
        })
    }

    const productName = req.body.name
    const productCategory = req.body.category
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    
    try {
        await Product.update({
            product_name : productName,
            product_category : productCategory,
            product_image : fileName,
            url_image : url
        },
        {
            where: {
                id: req.params.id
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

// detele product

export const deleteProduct = async(req, res) => {
    
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }
    })

    if(!product) return res.status(404).json ({
        status_code: 404,
        msg: "Product Not Found"
    })

    try {
        const filepath = `./public/images/${product.product_image}`
        fs.unlinkSync(filepath)
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status_code: 200,
            msg: "Product Deleted Successfully"
        })
    } catch (error) {
        console.log(err.message)
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}