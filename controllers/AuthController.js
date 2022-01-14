const jwt = require("jsonwebtoken");
const Staff = require("../models/StaffModel");

// create jwt token by signing it with sign fct and encoding it with the jwt secret

const signToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// helper fct
// we can use it in other fcts
const createSendToken = (Staff, statusCode, res) => {
  //mongoose create ._id automatically
  const token = signToken(Staff);
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
    //No need for other information in the req.body (Will make username unique)
    //Or we will be needing a password
    const { FirstName } = req.body;
    const staff = await Staff.findOne({ 'FirstName': FirstName});

    if (!staff) {

      return res
        .status(404)
        .json({staff, message: "no staff is found with these credentials" });
        
    }

    createSendToken(staff,200,res)

  } catch (err) {
    console.log(err.message);
  }
};
