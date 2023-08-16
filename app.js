const express = require("express");
const app = express();
const {getAllTopics, getAllEndpoints, getArticleByID, getAllArticles} = require("./controllers/topics-controller");



app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndpoints)
app.get("/api/articles/:article_id", getArticleByID)
app.get("/api/articles", getAllArticles)

app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ message: err.message });
    } else next(err);
  });

app.use((err,request, response, next)=>{
    if (err.code === "22P02"){
        response.status(400).send({message: "Invalid Article ID"})
    } else {
        next(err)
    }
})

app.use((err, request, response, next)=>{
    response.status(500).send({message: "Internal Server Error"})
})


module.exports = app;