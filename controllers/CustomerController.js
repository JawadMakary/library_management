const CustomerModel = require("../models/CustomerModel");
const checkAuth = require("../middleware/checkAuth.js");



// add Customer
exports.addCustomer = async (req, res) => {
  const staffData = checkAuth(req);

  if (staffData != undefined && staffData.data.role == "admin") {
    try {
      const customer = await CustomerModel.findOne({
        Email: req.body.Email,
      });
      if (customer) {
        return res.status(400).json({
          message: "Customer already exists",
        });
      } else {
        // create new book with req.body using mongoose create
        const newCustomer = await CustomerModel.create(req.body);
        return res.status(201).json({
          message: "Customer added successfully",
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

//Delete Customer
exports.deleteCustomer = async (req, res) => {

  const staffData = checkAuth(req);

  if (staffData != undefined && staffData.data.role == "admin") {

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
