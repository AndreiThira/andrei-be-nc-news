const db = require("../db/connection");
const endpoints = require("../endpoints.json");
const {checkExists} = require("../db/seeds/utils")


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


const fetchCommentsByArticle = (article_id, next) => {
  return checkExists("articles", "article_id", article_id).then(()=>{
    return db.query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;", [article_id])
  .then(commentsResult => {
      return commentsResult.rows
    })
    .catch(next)})
};

const fetchPostCommentByArticle = (username, body, article_ID, next) => {
  return checkExists("users", "username", username)
    .then(() => {
      const query = "INSERT INTO comments (author, body, votes, article_id) VALUES ($1, $2, $3, $4) RETURNING *;"
      const values = [username, body, 0, article_ID];

      return db.query(query, values)
        .then(result => {
          return result.rows
        })
        .catch(next)
    })
    .catch(next)
};

const fetchPatchArticleByID = (newVotes, article_ID, next) =>{
    return checkExists("articles", "article_id", article_ID)
    .then(() => {
      const query = "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;"
      const values = [newVotes, article_ID]
      return db.query(query, values).then((comment)=>{
        return comment.rows
      })
      .catch(next)
})
.catch(next)
}
  




module.exports = { fetchAllTopics, fetchArticleByID, fetchAllArticles, fetchCommentsByArticle, fetchPostCommentByArticle, fetchPatchArticleByID};
