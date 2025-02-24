import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../dashboardModels/UserModel.js"

import dotenv from "dotenv"

dotenv.config()

export const saveRegister = async (req, res) => {
  if(!req.body) return res.status(400).json({msg: "No File Uploaded"})
  const { username, password, role } = req.body

  if (!username || !password === undefined) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {

    const existingUser = await User.findOne({
      where: {
        username
      }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Username sudah digunakan' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const key = process.env.SECRET_KEY

    const token = jwt.sign({
      id: null,
      role: role
    },
    key, {
      expiresIn: '1h'
    })

    await User.create({
      username: username,
      password: hashedPassword,
      role: role,
      token,
      expired: new Date(Date.now() + 3600000), // 1 jam
      last_login: null,
      login_attempt: 0,
    })

    res.status(201).json({
      status_code: 201,
      message: "DATA SUCCESSFULLY CREATED",
  })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}