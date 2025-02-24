import Gallery from "../models/GalleryModel.js"

export const getGallery = async(req, res) => {
    try {
        const gallery = await Gallery.findAll()

        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : gallery
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        })
    }
}

export const getGalleryById = async(req, res) => {
    try {
        const gallery = await Gallery.findOne({
            where: {
                id: req.params.id
            }
        })

        res.json({
            status_code: 200,
            message: "DATA SUCCESSFULLY OBTAINED",
            data: gallery
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

