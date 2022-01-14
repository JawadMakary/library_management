var CustomerModel = require("../models/CustomerModel");
var jwt = require("jsonwebtoken");

// check if staff has jwt token
const checkAuth = (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    return true;
    // next();
  } catch (err) {
    console.log(err);
    return false;
  }
};
// add book
exports.addCustomer = async (req, res) => {
  if (checkAuth(req, res)) {
    try {
      const customer = await CustomerModel.findOne({
        Name: req.body.Name,
      });
      if (customer) {
        return res.status(400).json({
          message: "customer already exists",
        });
      } else {
        // create new book with req.body using mongoose create
        const newCustomer = await CustomerModel.create(req.body);
        return res.status(201).json({
          message: "customer added successfully",
          data: newCustomer,
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json({
      message: "you are not authorized to add a customer",
    });
  }
};
exports.deleteCustomer = async (req, res) => {
  if (checkAuth(req, res)) {
    try {
      const customer = await CustomerModel.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          message: "customer not found",
        });
      }
      await CustomerModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "customer deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(401).json({
      message: "you are not authorized to delete a customer",
    });
  }
};
