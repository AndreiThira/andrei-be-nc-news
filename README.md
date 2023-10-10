
# Northcoders News API

Developed a feature-rich RESTful API serving articles, topics, and user-generated comments. This API empowers users with comprehensive access to content, allowing them to effortlessly explore articles, discover topics, and participate in vibrant discussions. Key functionalities include seamless GET requests for reading articles and topics, as well as interactive features like comment posting and voting via PATCH requests.


## Table of Contents
1. [Technologies Used](#TechUsed)
2. [Deployment](#Deployment)
3. [Installation Guide](#Installation)
4. [Usage](#Usage)
5. [API Documentation](#APIDocs)
6. [Acknowledgments](#Acknowledgments)

***

### Technologies Used <a name="TechUsed"></a>
- **Express.js:** The primary backend framework for building the RESTful API. 
- **PostgreSQL:** A powerful and reliable relational database used to store and manage data in the project. 
- **CORS:** Middleware used to handle Cross-Origin Resource Sharing, allowing for secure communication between the client and the server.
- **dotenv:** A utility for managing environment variables, enhancing the configuration of the project.

See [Acknowledgments](#Acknowledgments) for additional libraries used.

***

### Deployment <a name="Deployment"></a>
**Render for API Hosting**    
I have deployed the RESTful API using [Render](https://render.com/), a powerful platform for hosting web applications. This ensures that our API is highly available and scales effortlessly to meet user demand.You can access our API [here](https://nc-news-sem6.onrender.com/api).

**Database Instance with ElephantSQL**  
For my database needs, I rely on [ElephantSQL](https://www.elephantsql.com/), a managed PostgreSQL database service. This hosted database instance ensures data durability, reliability, and scalability.

***

### Installation guide <a name="Installation"></a>
1. Fork and clone this repository.
2. Open the directory in VS.
3. In the terminal, run ```npm i``` in order to install all the required dependencies.
4. In order to connect to the relavant database, you need to define the environmental variable PGDATABASE:
    1. In the root folder, create a .env.development and a .env.test file. If you wish to use a hosted database which is ready for production, you can also create a .env.production file.
    2. Inside .env.development, paste ```PGDATABASE=nc_news```
    3. Inside .env.test, paste ```PGDATABASE=nc_news_test```
   
   The values of PGDATABASE can be changed according to the name of your desired database. If you wish to add a hosted database, set the value of PGDATABASE to the link provided by your hosting provider.   
6. In the terminal, run the command ```npm run seed``` to seed the database.
7. In the terminal, enter the command ```npm start``` to run the server. By default, the port when running the server is 9090, this can be changed in the **listen.js** module. 
8. Test by using an API client such as [Insomnia](https://insomnia.rest/) and execute a GET request at http://localhost:9090/api where a response should be served with a list of available endpoints.

### Usage <a name="Usage"></a>

### API Documentation <a name="APIDocs"></a>

#### `GET /api`

- **Description:** Serves up a JSON representation of all the available endpoints of the API.

#### `GET /api/topics`

- **Description:** Serves an array of all topics.
- **Example Response:**
```json
{
  "topics": [
    {
      "slug": "coding",
      "description": "Code is love, code is life"
    },
    {
      "slug": "football",
      "description": "FOOTIE!"
    },
    {
      "slug": "cooking",
      "description": "Hey good looking, what you got cooking?"
    }
  ]
}
```

#### `GET /api/articles`

- **Description:** Serves an array of all articles.
- **Example Response:**
```json
{
  "articles": [
    {
      "title": "Seafood substitutions are increasing",
      "topic": "cooking",
      "author": "weegembump",
      "body": "Text from the article..",
      "created_at": "2018-05-30T15:59:13.341Z",
      "votes": 0,
      "comment_count": 6
    }
  ]
}
```

#### `GET /api/articles/:article_id`

- **Description:** Serves the article with the corresponding `article_id`.
- **Example Response:**

```json
{
  "article": [
    {
      "article_id": 3,
      "title": "Eight pug gifs that remind me of mitch",
      "topic": "mitch",
      "author": "icellusedkars",
      "body": "some gifs",
      "created_at": "2020-11-03T09:12:00.000Z",
      "votes": 0,
      "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    }
  ]
}
```

#### `GET /api/articles/:article_id/comments`

- **Description:** Serves all comments for the corresponding `article_id`, sorted by most recent.
- **Example Response:**

```json
{
  "comments": [
    {
      "body": "This morning, I showered for nine minutes.",
      "votes": 16,
      "author": "butter_bridge",
      "article_id": 1,
      "created_at": "2020-12-03T09:12:00.000Z",
      "comment_id": 12
    }
  ]
}
```

#### `POST /api/articles/:article_id/comments`

- **Description:** Allows the client to post a comment to a specific article, then serves the new comment.
- **Example Input:**

```json
{
  "body": "This morning, I showered for nine minutes.",
  "user": "butter_bridge"
}
```
- **Example Output:**

```json
{
  "comment": [
    {
      "body": "This morning, I showered for nine minutes.",
      "votes": 16,
      "author": "butter_bridge",
      "article_id": 1,
      "created_at": "2020-12-03T09:12:00.000Z",
      "comment_id": 12
    }
  ]
}
```

#### `PATCH /api/articles/:article_id`

- **Description:** Allows the client to update votes by a certain value.
- **Example Input:**

```json
{
  "inc_votes": 12
}
```
- **Example Output:**
```json
{
  "article": [
    {
      "article_id": 3,
      "title": "Eight pug gifs that remind me of mitch",
      "topic": "mitch",
      "author": "icellusedkars",
      "body": "some gifs",
      "created_at": "2020-11-03T09:12:00.000Z",
      "votes": 12,
      "article_img_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
    }
  ]
}
```
***

### Acknowledgments <a name="Acknowledgments"></a>
- **Jest:** A widely-used JavaScript testing framework for ensuring the reliability and correctness of the codebase.
- **Jest-extended:** An extension for Jest that provides additional testing utilities, further enhancing the testing capabilities.
- **supertest:** A testing library for making HTTP requests during testing, aiding in the comprehensive testing of API endpoints. 
- **husky:** A tool for setting up Git hooks to automate and improve various aspects of the development workflow.


1. Create a file called **.env.REPLACENAMEHERE** in the root folder for every seperate database connection you wish to have - in this case we will use .env.development and .dev.test
2. Inside each file, write **PGDATABASE=name_of_your_database**, replacing the filler text with the respective name of the database you wish to connect to.


