const router = require("express").Router();

let Categories = require("../models/category.model");

router.route("/").get((req, res) => {
  Categories.find()
    .populate("parentCategory")
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const parentCategory = req.body.parentCategory;
  const properties = req.body.properties;

  const newCategories = new Categories({
    name,
    parentCategory,
    properties
  });

  newCategories
    .save()
    .then(() => res.json("Category added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Categories.findById(req.params.id)
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Categories.findByIdAndDelete(req.params.id)
    .then(() => res.json("categories deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
  Categories.findById(req.params.id)
    .then(category => {
      category.name = req.body.name;
      category.parentCategory = req.body.parentCategory;
      category.properties = req.body.properties;
     

      category.save()
        .then(() => res.json('category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
