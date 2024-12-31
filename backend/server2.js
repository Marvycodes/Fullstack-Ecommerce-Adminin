const express = require("express");
const multiparty = require("multiparty");

const app = express();
const PORT = 7000;
const IMAGE_UPLOAD_DIR = "./public/images";
const IMAGES_BASE_URL = "http://localhost:7000/images/"
app.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}`);
});
app.use(express.static('public'))
app.get("/", (req, res) => {
  console.log("Home..");
  res.send('Home page')
});
app.post("/addproduct", (req, res) => {
  let form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR });
  form.parse(req, function (err, fields, files) {
    if (err) return res.send({ error: err.message });
    console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
    console.log(`files = ${JSON.stringify(files, null, 2)}`);
    const imagePath = files.image[0].path;
    const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1);
    const imageURL = IMAGES_BASE_URL + imageFileName;
    console.log(imageURL);
    
  });
});
