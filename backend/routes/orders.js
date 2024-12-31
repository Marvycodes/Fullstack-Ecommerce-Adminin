const router = require("express").Router();
let Orders = require("../models/order");


router.route("/").get((req, res) => {
    Orders.find().sort({createdAt:-1})
      .then((orders) => res.json(orders))
      .catch((err) => res.status(400).json("Error: " + err));
  });
 
  module.exports = router;