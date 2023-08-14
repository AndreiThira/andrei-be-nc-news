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
        
                expect(topics).toHaveLength(3)

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
            console.log(Object.keys(res))
            expect(res.status).toBe(404)
            expect(res.res.statusMessage).toBe("Not Found")
        })
    })
})