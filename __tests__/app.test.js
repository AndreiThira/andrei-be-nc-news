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

describe("GET /api/articles/:article_id", ()=>{
    test("200: responds with a status of 200", ()=>{
        return request(app).get("/api/articles/3").expect(200).then((response)=>{
            expect(response.status).toBe(200)
        })
    })
    test("200: responds with an article object, containing the following properties: author,title, article_id, body, topic, created_at, votes and article_img_url", ()=>{
        return request(app).get("/api/articles/3").expect(200).then((response)=>{
            expect(response.body).toEqual( {
                article: [
                  {
                    article_id: 3,
                    title: 'Eight pug gifs that remind me of mitch',
                    topic: 'mitch',
                    author: 'icellusedkars',
                    body: 'some gifs',
                    created_at: '2020-11-03T09:12:00.000Z',
                    votes: 0,
                    article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
                  }
                ]
              })
        })
    })
    test("400: responds with an error message when passed an invalid article ID", ()=>{
        return request(app).get("/api/articles/banana").expect(400).then((response)=>{
            expect(response.body).toEqual({message: "Invalid Article ID"})
        })
    })
    test("404: responds with an error message when passed a valid, but non existent article ID", ()=>{
        return request(app).get("/api/articles/123123").expect(404).then((response)=>{
            expect(response.body).toEqual({message: "404 Not Found"})
        })
    })
})

describe("GET /api/articles", ()=>{
    test("200: responds with a status of 200", ()=>{
        return request(app).get("/api/articles").expect(200).then((response)=>{
            expect(response.status).toBe(200)
        })
    })
    test("200: responds with all articles, with the following properties: author, title, article_id, topic, created_at, votes, article_img_url, comment_count", ()=>{
        return request(app).get("/api/articles").then((response)=>{
            const articles = response.body.articles
            articles.forEach((article) => {
                expect(article).toHaveProperty("author")
                expect(article).toHaveProperty("title")
                expect(article).toHaveProperty("article_id");
                expect(article).toHaveProperty("topic")
                expect(article).toHaveProperty("created_at");
                expect(article).toHaveProperty("votes")
                expect(article).toHaveProperty("article_img_url");
                expect(article).toHaveProperty("comment_count");
                expect(article).not.toHaveProperty("body")
            });
        })
    })
    test("200: articles are ordered in descending order by created_at", ()=>{
        return request(app).get("/api/articles").then((response)=>{
            const articles = response.body.articles
            const timestampArray = articles.map(article => new Date(article.created_at).getTime())
            const isSorted = timestampArray.every((current, index) => {
              if (index === 0) {
                return true
              }
              const previous = timestampArray[index - 1]
              return current <= previous
            });
            expect(isSorted).toBe(true);
        })
    })
})