const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
        const user = await User.findOne(email);
        if (user) {
            return res
                .status(500)
                .json({ message: "There is already such a user..." });
        }

        if (password.length < 6)
            res.status(500).json({ message: "Your password is too short..." });
        const passwordHash = await bcrypt.hash(password, 12);

        if (!isEmail(email))
            res
                .status(500)
                .json({ message: "Check your email, and write an email type email!" });

        const newUser = await User.create({ ...req.body, password: passwordHash });

        const token = await jwt.sign(
            { id: newUser._id, idAdmin: newUser.isAdmin },
            "SECRET_KEY",
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true }).status(201).json({
            token,
            newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const login = async (req, res, next) => {
    const { password, email } = req.body;

    try {
        const user = await User.findOne(email);
        if (!user) {
            return res
                .status(500)
                .json({ message: "There is no such a user..." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            res
                .status(500)
                .json({ message: "Your password does not match!" });            
        }

        const token = await jwt.sign(
            { id: user._id, idAdmin: user.isAdmin },
            "SECRET_KEY",
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { httpOnly: true }).status(200).json({
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailAdress.match(regex)) return true;
    else return false;
}

module.exports = { register, login} 
