
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

### Technologies Used{#TechUsed}
- **Express.js:** The primary backend framework for building the RESTful API. 
- **PostgreSQL:** A powerful and reliable relational database used to store and manage data in the project. 
- **CORS:** Middleware used to handle Cross-Origin Resource Sharing, allowing for secure communication between the client and the server.
- **dotenv:** A utility for managing environment variables, enhancing the configuration of the project.

See [Acknowledgments](#Acknowledgments) for additional libraries used.

### Deployment{#Deployment}
Render for API Hosting
We have deployed our RESTful API using [Render](https://render.com/), a powerful platform for hosting web applications. This ensures that our API is highly available and scales effortlessly to meet user demand.
You can access our API [here](https://nc-news-sem6.onrender.com/api).

Database Instance with ElephantSQL
For our database needs, we rely on [ElephantSQL](https://www.elephantsql.com/), a managed PostgreSQL database service. This hosted database instance ensures data durability, reliability, and scalability.

### Installation guide{#Installation}

### Usage{#Usage}

### API Documentation{#APIDocs}

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

### Acknowledgments{#Acknowledgments}
- **Jest:** A widely-used JavaScript testing framework for ensuring the reliability and correctness of the codebase.
- **Jest-extended:** An extension for Jest that provides additional testing utilities, further enhancing the testing capabilities.
- **supertest:** A testing library for making HTTP requests during testing, aiding in the comprehensive testing of API endpoints. 
- **husky:** A tool for setting up Git hooks to automate and improve various aspects of the development workflow.

// Setting up the environment packages
In order to connect to the relavant database, you need to define the environmental variable PGDATABASE. In order to do so, please follow the provided instructions:

1. Create a file called **.env.REPLACENAMEHERE** in the root folder for every seperate database connection you wish to have - in this case we will use .env.development and .dev.test
2. Inside each file, write **PGDATABASE=name_of_your_database**, replacing the filler text with the respective name of the database you wish to connect to.


