const express = require("express")
const cors = require("cors");
const { connection } = require("./config/db");
const { BooksRouter } = require("./routes/book.routes");
const { userRouter } = require("./routes/user.routes");
const { ReviewRoutes } = require("./routes/reveiw.routes");
const PORT = process.env.PORT || 4500;

const app = express();
app.use(cors())
app.use(express.json());
app.use("/books", BooksRouter);
app.use("/user", userRouter);
app.use("/review", ReviewRoutes)

app.listen(PORT, async () => {
    try {
        await connection
        console.log("Connected to db...")
        console.log("your server is running at http://localhost:4500")
    } catch (error) {

    }
})
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to Books Review API" })
})

