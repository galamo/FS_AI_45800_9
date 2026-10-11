const express = require("express");
// nodejs as single thread
// nodejs as single thread
// nodejs as single thread
// nodejs as single thread
// nodejs as single thread
// nodejs as single thread
const app = express();

app.get("/", (req, res) => {
    console.log(req.query);
    // zod validation - make sure that password and user name are arrived 
    // answer the user with appropriate message 
    const {user, password} = req.query;
    res.json({ message: "Hello World", user, password});
});


app.get("/users", (req, res) => {
    // get from db
   const users = [ { id: 1, name: "John", email: "john@example.com" }, { id: 2, name: "Jane", email: "jane@example.com" }, { id: 3, name: "Jim", email: "jim@example.com" }];
    res.json({ users });
});



app.listen(3000, (error) => {
    console.log(error)
    console.log("Server is running on port 3000");
});
