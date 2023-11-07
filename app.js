const express = require('express');
const connecDb = require("./config/dbConnection")
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
const morgan = require("morgan");
const CooKieParser = require("cookie-parser");
// const multer = require('multer');
// const path = require("path")
// const Category = require('./models/categoryModel');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(cors({origin:true}));
app.use(morgan('short'))
app.use(bodyParser.json());
app.use(errorHandler)
app.use(express.json())
app.use(CooKieParser())
app.use(express.static("public"))

// const storage = multer.diskStorage({
//   destination:(req, file, cb) =>{
//     cb(null, "public/Images")
//   },
//   filename:(req,file, cb) =>{
//     cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({
//   storage: storage
// })

// app.post("/upload", upload.single('file'),(req, res) => {
//   Category.create({image: req.file.filename})
//   .then(result => res.json(result))
//   .catch(err => console.log(err))
// })


app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/taskRoutes"));
app.use("/api", require("./routes/adminRoutes"))
app.use("/", require("./routes/roomRoutes"))

connecDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
