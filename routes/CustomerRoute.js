const express = require("express");
const customerRouter = express.Router();
const customerController = require("../controllers/CustomerController");

//add customer
customerRouter.post("/addCustomer", customerController.addCustomer);

// delete customer route
customerRouter.delete("/:id", customerController.deleteCustomer);


module.exports = customerRouter;
