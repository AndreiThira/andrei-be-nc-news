const db = require("../db/connection");
const endpoints = require("../endpoints.json");


const fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

const fetchArticleByID = (articleID)=>{
  return db.query("SELECT * FROM articles WHERE article_id = $1;", [articleID]).then(({rows})=>{
    const article = rows[0]
    if(!article){
      return Promise.reject({
        status:404,
        message: "No article found"
      })
    }
    return rows;
  })
}


module.exports = { fetchAllTopics, fetchArticleByID};
