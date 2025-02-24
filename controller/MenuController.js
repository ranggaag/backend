import Menu from "../models/MenuModel.js"

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.findAll()

        res.status(200).json({
            status_code : 200,
            message : "DATA SUCCESSFULLY OBTAINED",
            data : menu
        })

    } catch (error) {

        console.log(error.message);
        res.status(500).json({
            status_code : 500,
            message: "Internal server error"
        });

    }

}

// export const getMenuById = async (req, res) => {

// }

// export const createMenu = async (req, res) => {

// }

// export const updateMenu = async (req, res) => {

// }

// export const deleteMenu = async (req, res) => {

// }

