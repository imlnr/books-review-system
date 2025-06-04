const express = require("express")
const cors = require("cors");
const { connection } = require("./config/db");
const PORT = process.env.PORT || 4500;

const app = express();
app.use(cors())
app.use(express.json());


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