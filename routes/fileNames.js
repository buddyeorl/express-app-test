const fileNameRoute = require("express").Router();
const fs = require("fs");

fileNameRoute.get("/", (req, res) => {
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            let result = {
                data: JSON.parse(data)
            }
            res.json(result);
        }
    })
})

//POST REQUEST TO ADD
fileNameRoute.post("/", (req, res) => {
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
            let newFileName = {
                name: receivedName,
                id: Math.random().toString(16).slice(2)
            }
            dataToChange.push(newFileName);
            //write to the file
            fs.writeFile("./db/fileName.json", JSON.stringify(dataToChange), (err, data) => {
                if (err) {
                    res.send("error writing to file")
                } else {
                    res.json(
                        {
                            data: dataToChange,
                            lastAdded: newFileName
                        }
                    )
                }
            })
        }
    })
})


//POST REQUEST TO ADD
fileNameRoute.delete("/", (req, res) => {
    console.log(req.body)
    const idToDelete = req.body.id;
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let dataToChange = JSON.parse(data);
            console.log(dataToChange);
            let indexToDelete = null;
            for (let i = 0; i < dataToChange.length; i++) {
                if (dataToChange[i].id === idToDelete) {
                    indexToDelete = i;
                }
            }
            if (indexToDelete !== null) {
                dataToChange.splice(indexToDelete, 1);
            } else {
                res.send("id not found")
            }


            //write to the file
            fs.writeFile("./db/fileName.json", JSON.stringify(dataToChange), (err, data) => {
                if (err) {
                    res.send("error writing to file")
                } else {
                    res.json(
                        {
                            data: dataToChange
                        }
                    )
                }
            })
        }
    })
})


//UPDATES
fileNameRoute.put("/", (req, res) => {
    const idToUpdate = req.body.id;
    const updatedName = req.body.name;
    fs.readFile("./db/fileName.json", "utf-8", (err, data) => {
        if (err) {
            res.send("Error reading file")
        } else {
            console.log(data);
            let dataToChange = JSON.parse(data);
            dataToChange = dataToChange.map(item => {
                if (item.id === idToUpdate) {
                    item.name = updatedName;
                    return item
                } else {
                    return item
                }
            })

            //write to the file
            fs.writeFile("./db/fileName.json", JSON.stringify(dataToChange), (err, data) => {
                if (err) {
                    res.send("error writing to file")
                } else {
                    res.json(
                        {
                            data: dataToChange
                        }
                    )
                }
            })
        }
    })
})


module.exports = fileNameRoute;