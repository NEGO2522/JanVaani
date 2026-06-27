require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/complaints", require("./routes/complaints"));
app.use("/api/dashboard", require("./routes/dashboard"));

app.get("/", (req, res) => res.json({ status: "JanVaani API running!" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));