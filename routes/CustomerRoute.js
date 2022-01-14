const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/CustomerController");

customerRouter.post("/addCustomer", customerController.addCustomer);
// delete customer route
customerRouter.delete("/deleteCustomer/:id", customerController.deleteCustomer);
module.exports = customerRouter;
