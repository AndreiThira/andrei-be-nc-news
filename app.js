const express = require("express");
const app = express();
const {getAllTopics, getAllEndpoints} = require("./controllers/topics-controller")


app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndpoints)


app.use((err, request, response, next)=>{
    response.status(500).send({message: "Internal Server Error"})
})


module.exports = app;