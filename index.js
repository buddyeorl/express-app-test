const { randomUUID } = require("crypto");
const server = require("express");
const fs = require("fs");
let filenameDb = require("./db/fileName.json");

const PORT = 3001;

const app = server();

//middlewares
app.use(server.urlencoded());
app.use(server.json());


app.get("/api/filename", (req, res) => {
    let result = {
        data: filenameDb
    }
    //logic here 
    res.json(result)
})


// EXPECTED REQUEST OBJECT
// body:
// {
// “name”:”cat.png”
// }
//POST REQUEST TO ADD
app.post("/api/filename/add", (req, res) => {
    //req will hold a body property
    const receivedName = req.body.name
    // read file data first
    // store the data info in a variable
    // add new data to the stored variable
    // write the updated data to the file
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let dataToChange = JSON.parse(data);
            console.log(dataToChange);
            [{ id: '1', name: 'cat1.png' }, { id: '2', name: 'cat2.png' }]
            dataToChange.push({
                name: receivedName,
                id: Math.random().toString(16).slice(2)
            })
        }
    })

})



const printPort = () => {
    console.log(`listening to port ${PORT}`)
}

app.listen(PORT, printPort);