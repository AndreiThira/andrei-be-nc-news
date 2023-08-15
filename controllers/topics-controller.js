const {fetchAllTopics, fetchAllEndpoints} = require("../models/topic-model")

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


module.exports = {getAllTopics, getAllEndpoints}