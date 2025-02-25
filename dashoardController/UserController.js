import Login from "../dashboardModels/UserModel.js"

export const getUser = async (req, res) => {
    try {
        const user = await Login.findAll()

        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : user
        })
    } catch (error) {
        
    }
}