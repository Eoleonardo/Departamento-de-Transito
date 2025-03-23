const app = require("express")();

app.get("/", (req, res) => {
    res.send("HELLO BABY");
});

app.listen(8000);