const express = require('express');
const connecDb = require("./config/dbConnection")
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const cors = require("cors");
const morgan = require("morgan");
const CooKieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(cors({
  origin:true
}));
app.use(morgan('short'))
app.use(bodyParser.json());
app.use(errorHandler)
app.use(express.json())
app.use(CooKieParser())


app.use("/api/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/taskRoutes"));
app.use("/api", require("./routes/adminRoutes"))
app.use("/api/room", require("./routes/roomRoutes"))

connecDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});