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
        message: "404 Not Found"
      })
    }
    return rows;
  })
}

const fetchAllArticles = () =>{
  return db.query(`SELECT 
  articles.article_id,
  articles.author,
  articles.title,
  topic,
  articles.created_at,
  articles.votes,
  article_img_url,
  COUNT(comments.article_id) AS comment_count
FROM
  articles
LEFT JOIN
  comments ON articles.article_id = comments.article_id
GROUP BY
  articles.article_id
ORDER BY
  created_at DESC;`).then(({rows})=>{
    return rows
  })
}

const fetchCommentsByArticle = async (article_id) => {
  const articleExists = await db.query("SELECT COUNT(*) FROM articles WHERE article_id = $1;", [article_id]);

  if (articleExists.rows[0].count === '0') {
    return Promise.reject({status:404, message: "Article not found"})
  }

  const comments = await db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;", [article_id]);
  return comments.rows; 
};


module.exports = { fetchAllTopics, fetchArticleByID, fetchAllArticles, fetchCommentsByArticle};
