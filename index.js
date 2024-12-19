import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import ProductRoute from "./routes/ProductRoute.js"
import CommentRoute from "./routes/CommentRoute.js"
import TestimonyRoute from "./routes/TestimonyRoute.js"
import FaqRoute from "./routes/FaqRoute.js"

const app = express()

// middleware

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"))
app.use(ProductRoute)
app.use(CommentRoute)
app.use(TestimonyRoute)
app.use(FaqRoute)




app.listen(5050, () => console.log('Server running'))