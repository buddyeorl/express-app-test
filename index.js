const server = require("express");

// import routes
const api = require("./routes/index")
const PORT = process.env.PORT || 3001;
const app = server();

//middleware
//middlewares
app.use(server.urlencoded());
app.use(server.json());
//serve static files
app.use(server.static('public'));

app.use("/api", api);

const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

app.listen(PORT, printPort);