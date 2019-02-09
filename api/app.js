const express = require("express");
const app = express();

const PORT = 3000;

app.listen(3000, () => {
    console.log("Server started");
});

app.get("/", (req, res) => {
    res.send("En David sucks");
});