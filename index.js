const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HELLO BABY");
});

const veiculoRoutes = require("./routes/veiculoRoutes");
app.use("/veiculos", veiculoRoutes)

app.listen(8000, (err) => {
    console.log("A aplicação esta rodando!!!")
});