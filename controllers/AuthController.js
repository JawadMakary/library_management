const jwt = require("jsonwebtoken");
const validator = require("validator");
const Staff = require("../models/StaffModel");

// create jwt token by signing it with sign fct and encoding it with the jwt secret

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// helper fct
// we can use it in other fcts
const createSendToken = (Staff, statusCode, res) => {
  //mongoose create ._id automatically
  const token = signToken(Staff._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      Staff,
    },
  });
};

exports.login = async (req, res) => {
  try {
    const { FirstName, Role } = req.body;
    const staff = await Staff.findOne({ FirstName });
    if (!staff) {
      return res
        .status(404)
        .json({ message: "no staff is found with these credentials" });
    }
    createSendToken(staff,200,res)
    
  } catch (err) {
    console.log(err.message);
  }
};
