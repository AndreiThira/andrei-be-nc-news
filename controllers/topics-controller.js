const {fetchAllTopics} = require("../models/topic-model")
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

const fetchAllEndpoints = () => {
    return fs.readFile("endpoints.json").then((endpoints) => {
      const preparedEndpoints = endpoints.toString();
      return JSON.parse(preparedEndpoints)
    });
  };


module.exports = {getAllTopics, getAllEndpoints}