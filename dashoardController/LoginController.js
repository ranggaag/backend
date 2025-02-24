import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../dashboardModels/UserModel.js"

import dotenv from "dotenv"

dotenv.config()

export const saveLogin = async (req, res) => {
  if(!req.body) return res.status(400).json({msg: "No File Uploaded"})

  const { username, password } = req.body

  // validasi login
  if(!username || !password) {
    return res.status(400).json({
      status_code : 400,
      message : "Username and password are required"
    })
  }

  if(username.length < 3) {
    return res.status(400).json({
      status_code : 400,
      message : "Username must be at least 3 characters"
    })
  }

  if(password.length < 6) {
    return res.status(400).json({
      status_code : 400,
      message : "Password must be at least 6 characters"
    })
  }

  try {
    // cari pengguna berdasarkan username
    const user = await User.findOne({
      where : {
        username
      }
    })

    if(!user) {
      return res.status(401).json({
        status_code : 401,
        message : "Username atau password salah"
      })
    }

    // validasi password dengan salt dan hash
    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) {
      return res.status(401).json({
        status_code : 401,
        message : "Username atau password salah"
      })
    }

    const key = process.env.SECRET_KEY

    // buat token
    const token = jwt.sign({
      id : user.id,
      role: user.role
    },
    key, { 
      expiresIn: '1h'
    })

    // update last_login dan login_attempt
    await User.update({
      last_login : new Date(),
      login_attempt : user.login_attempt + 1
    },
    {
      where : {
        id : user.id
      }
    })

    //  kirim token dan data pengguna

    res.status(200).json({
      status_code : 200,
      message : "Login berhasil",
      token : token,
      user : {
        id : user.id,
        username : user.username,
        role : user.role
      }
    })

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}