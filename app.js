const express = require("express");
const app = express();
const {getAllTopics, getAllEndpoints, getArticleByID, getAllArticles, getCommentsByArticle, postCommentByArticle} = require("./controllers/topics-controller");

app.use(express.json())

app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndpoints)
app.get("/api/articles/:article_id", getArticleByID)
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id/comments", getCommentsByArticle)
app.post("/api/articles/:article_id/comments", postCommentByArticle)

app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ message: err.message });
    } else next(err);
  });

app.use((err,request, response, next)=>{
    if (err.code === "22P02"){
        response.status(400).send({message: "Invalid Article ID"})
    } else if (err.code === "23502"){
        response.status(404).send({message: "Please enter a username and body"})
    } else{
        next(err)
    }
})

app.use((err, request, response, next)=>{
    response.status(500).send({message: "Internal Server Error"})
})


module.exports = app;