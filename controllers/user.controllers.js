const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.model");
const jwt = require("jsonwebtoken")
require("dotenv").config();


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExist = await UserModel.findOne({ email: email });
        console.log(userExist)
        if (userExist) {
            return res.status(409).json({ msg: `User with ${email} is already exist` })
        }
        bcrypt.hash(password, 8, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ name, email, password: hash })
                await user.save();
                res.status(201).json({ msg: "New User has been created successfully", user })
            }
            else {
                res.send({ "msg": "Error creating the hash", "error": err })
            }
        })

    } catch (error) {
        res.send({ "msg": error })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ msg: "Error comparing passwords", error: err.message });
            }

            if (result) {
                const token = jwt.sign({ userID: user._id }, process.env.TOKEN_SECRET);
                const { password, ...userWithoutPassword } = user.toObject();
                res.status(200).json({
                    msg: "Login successful",
                    accessToken: token,
                    ...userWithoutPassword
                });
            } else {
                res.status(403).json({ msg: "Invalid credentials" });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
}

module.exports = {
    loginUser,
    registerUser
}