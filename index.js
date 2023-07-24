const express = require("express")
require('dotenv').config()
const app = express()
require("./config/dbConnection")
const userRouter = require('./controller/user.controller')
const productRouter = require("./controller/product.controller")
const categoryRouter = require("./controller/category.controller")
const whisListRouter = require("./controller/whislist.controller")
const cartRouter = require("./controller/cart.controller")
const bodyParser = require("body-parser")
const { errorHandler } = require("./middleware/errorHandeler")
const auth0 = require("./middleware/auth0.middleware")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const { auth } = require("express-openid-connect")
const Port = process.env.PORT || 8000


app.use(auth(auth0))

app.get('/', (req, res) => {
    // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    console.log(req.oidc.isAuthenticated());
});
app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.json())
app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/category", categoryRouter)
app.use("/whisList", whisListRouter)
app.use("/cart", cartRouter)

app.use(errorHandler)






app.listen(Port, () => {
    console.log(`connected to port no ${Port}`);
})