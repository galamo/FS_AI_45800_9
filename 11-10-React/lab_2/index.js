const express = require("express");

const app = express();

app.get("/", (req, res) => {
    const param = req.query.param;
    res.json({ message: "Hello World" + param});
});

app.listen(3000, (error) => {
    console.log(error)
    console.log("Server is running on port 3000");
});
