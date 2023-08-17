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

const fetchAllArticles = () => {
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
      created_at DESC;`)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      next(err);
    });
};


const fetchCommentsByArticle = (article_id) => {
  return db.query("SELECT COUNT(*) FROM articles WHERE article_id = $1;", [article_id])
    .then(articleExistsResult => {
      if (articleExistsResult.rows[0].count === '0') {
        return Promise.reject({ status: 404, message: "Article not found" })
      }

      return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;", [article_id])
    })
    .then(commentsResult => {
      return commentsResult.rows
    })
    .catch(err => {
      throw err
    });
};

const fetchPostCommentByArticle = (username, body, article_ID) =>{
  if(!username || !body){
    return Promise.reject({ status: 400, message: "Please enter a username and body" })
  } else {


return db.query("SELECT username FROM users WHERE username = $1;", [username]).then((results)=>{
  if (results.rows.length === 0){
    return Promise.reject({status:400, message: "No user exists with this username" })
  } else {
    
    const currentTime = new Date().toISOString();
    const query = "INSERT INTO comments (author, body, votes, article_id) VALUES ($1, $2, $3, $4) RETURNING *;"
    const values = [username, body, 0, article_ID]

    return db.query(query, values).then((result)=>{
      console.log(result)
      return result.rows
    }).catch(err =>{
      throw err
    })
  }
})
}}


module.exports = { fetchAllTopics, fetchArticleByID, fetchAllArticles, fetchCommentsByArticle, fetchPostCommentByArticle};
