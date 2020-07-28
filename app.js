const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({ limit: "2mb" }));
app.use("/api/v1", routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
