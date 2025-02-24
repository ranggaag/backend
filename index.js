import express from "express"
import fileUpload from "express-fileupload"
import cors from "cors"
import ProductRoute from "./routes/ProductRoute.js"
import CommentRoute from "./routes/CommentRoute.js"
import TestimonyRoute from "./routes/TestimonyRoute.js"
import FaqRoute from "./routes/FaqRoute.js"
import MenuRoute from "./routes/MenuRoute.js"
import GalleryRoute from "./routes/GalleryRoute.js"
import DashboardRoute from "./dashboardRoutes/DashboardRoute.js"

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
app.use(MenuRoute)
app.use(GalleryRoute)
app.use(DashboardRoute)




app.listen(5050, () => console.log('Server running'))