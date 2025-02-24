import FaqRecord from "../models/FaqModel.js"

// get faq

export const getFaq = async(req, res) => {
    try {

        const faq = await FaqRecord.findAll()

        res.status(200).json({
            status_code : 200,
            message : "Data Successfull Obtained",
            data : faq
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }

}

// get faq by id

export const getFaqById = async (req, res) => {
    try {
        const faq = await FaqRecord.findOne({
            where : {
                id : req.params.id
            }
        })

        res.status(200).json({
            status_code : 200,
            message : "Data Successfull Obtained",
            data : faq
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });
    }
}

// export const saveFaq = () => {
    
// }

// export const updateFaq = () => {
    
// }

// export const deleteFaq = () => {
    
// } 