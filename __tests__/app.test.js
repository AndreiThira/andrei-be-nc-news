const app = require("../app");
const request = require("supertest");
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testdata = require("../db/data/test-data/index")

afterAll(()=>{
    return db.end()
})

beforeEach(()=>{
    return seed(testdata);
})

describe("app", ()=>{
    describe("/api/topics", ()=>{
        test("200: responds with a status of 200", ()=>{
            return request(app).get("/api/topics").expect(200)
        })
        test("200: responds with the topics from the topics table", ()=>{
            return request(app).get("/api/topics").then((response)=>{
                const {topics} = response.body
        
                expect(topics).toHaveLength(3);

                topics.forEach(topic => {
                    expect(topic).toHaveProperty("slug", expect.any(String));
                    expect(topic).toHaveProperty("description", expect.any(String))
                });            
            })
        })
    })
})

describe("404 Not Found - endpoint doesn't exist", ()=>{
    test("404: responds with a status of 404 and a 'Not Found' msg when presented with a non-existent endpoint", ()=>{
        return request(app).get("/api/123").expect(404).then((res)=>{
            expect(res.status).toBe(404)
            expect(res.res.statusMessage).toBe("Not Found")
        })
    })
})

describe("GET /api", ()=>{
    test("200: responds with a status of 200", ()=>{
        return request(app).get("/api").expect(200).then((response)=>{
            expect(response.status).toBe(200)
        })
    })
    test("200: responds with the list of available endpoints along with their description and usage", ()=>{
        return request(app).get("/api").expect(200).then((response)=>{
            const parsedEndpoints = (JSON.parse(response.text))
            expect(Object.keys(parsedEndpoints.endpoints)[0]).toBe('GET /api')
            expect(Object.keys(parsedEndpoints.endpoints)[1]).toBe('GET /api/topics')
            expect(Object.keys(parsedEndpoints.endpoints)[2]).toBe("GET /api/articles")

            expect(parsedEndpoints.endpoints["GET /api/articles"].queries).toEqual(["author", "topic", "sort_by", "order"])
            expect(parsedEndpoints.endpoints["GET /api/articles"].exampleResponse).toEqual({
                articles: [
                  {
                    title: "Seafood substitutions are increasing",
                    topic: "cooking",
                    author: "weegembump",
                    body: "Text from the article..",
                    created_at: "2018-05-30T15:59:13.341Z",
                    votes: 0,
                    comment_count: 6
                  }
                ]
              })
        })
    })
})