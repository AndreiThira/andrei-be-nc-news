
const {fetchAllTopics, fetchArticleByID, fetchAllArticles, fetchCommentsByArticle, fetchPostCommentByArticle} = require("../models/topic-model")
const fs = require("fs/promises");

const getAllTopics = (request, response, next) =>{
    fetchAllTopics().then((result)=>{
        response.status(200).send({topics: result})
    })
    .catch(next)
}

const getAllEndpoints = (request, response, next) =>{
    fetchAllEndpoints().then((result)=>{
        response.status(200).send({endpoints: result})
    })
}

const getArticleByID = (request, response, next) => {
    const articleID = request.params.article_id
    fetchArticleByID(articleID).then((result)=>{
        response.status(200).send({article: result})
    })
    .catch(next)
}

const getAllArticles = (request, response, next) => {
    fetchAllArticles().then((result)=>{
        response.status(200).send({articles: result})
    })
    .catch(next)
}

const getCommentsByArticle = (request, response, next) =>{
    const article_ID = request.params.article_id
    fetchCommentsByArticle(article_ID).then((result)=>{
        response.status(200).send({comments: result})
    })
    .catch(next)
}


const fetchAllEndpoints = () => {
    return fs.readFile("endpoints.json").then((endpoints) => {
      const preparedEndpoints = endpoints.toString();
      return JSON.parse(preparedEndpoints)
    });
  };
  
const postCommentByArticle = (request, reponse, next)=>{
    const article_ID = request.params.article_id
    const { username, body } = request.body
    fetchPostCommentByArticle(username, body, article_ID).then((result)=>{
        reponse.status(201).send({comment: result})
    })
    
  .catch(next)
}


module.exports = {getAllTopics, getAllEndpoints, getArticleByID, getAllArticles, getCommentsByArticle, postCommentByArticle}