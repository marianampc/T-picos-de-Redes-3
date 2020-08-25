const express = require("express");
const server = express();

server.get("/", (req, res) => {
    return res.send(`
        <h1> Bom dia !</h1>
    `);
});

server.get("/user", (req, res) => {
    return res.json({ message: "tudo ok"});
});

server.listen(3000);