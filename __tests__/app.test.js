const request = require("supertest");
const { db } = require("../db/connection");

const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("API Endpoints", () => {
  it("should response with an object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  it("should respond with an object that looks like the endpoints.json file", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({ endpoints });
      });
  });
});

describe("API Topics", () => {
  describe("200 GET topics", () => {
    it("should return with slug and description as strings", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          response.body.topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
    it("should return 3 topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          expect(response.body.topics.length).toBe(3);
        });
    });
    it("should return the right values, checking first topic", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          const firstResponse = response.body.topics[0];
          expect(firstResponse.description).toBe(
            "The man, the Mitch, the legend"
          );
          expect(firstResponse.slug).toBe("mitch");
        });
    });
  });
});

describe("API Articles", () => {
  describe("GET /api/articles/:article_id", () => {
    it("200 Success - should return articles with the correct key value pairs", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
          const article = response.body.article
          expect(article.article_id).toBe(1);
          expect(article.title).toBe(
            "Living in the shadow of a great man"
          );
          expect(article.topic).toBe("mitch");
          expect(article.author).toBe("butter_bridge");
          expect(article.body).toBe(
            "I find this existence challenging"
          );
          expect(article.created_at).toBe(
            "2020-07-09T20:11:00.000Z"
          );
          expect(article.votes).toBe(100);
          expect(article.article_img_url).toBe(
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
          );
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("body");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");

            expect(typeof article.title).toBe("string");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.author).toBe("string");
            expect(typeof article.body).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(article.article_img_url.startsWith("http")).toBe(true);
        });
    });
    it("400 invalid data - should return an error when the wrong data type is used", () => {
      return request(app)
        .get("/api/articles/one")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("Invalid data type");
        });
    });
    it("404 not found - should return a 404 not found error for ids not in the database", () => {
      return request(app)
        .get("/api/articles/7843")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("Article not found");
        });
    });
  });
  describe("GET /api/articles", () => {
    it("200 Success - should return articles with the correct keys and a sum of each articles comments", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((response) => {
          response.body.articles.forEach((story) => {
            expect(story).toHaveProperty("author");
            expect(story).toHaveProperty("title");
            expect(story).toHaveProperty("article_id");
            expect(story).toHaveProperty("topic");
            expect(story).toHaveProperty("created_at");
            expect(story).toHaveProperty("votes");
            expect(story).toHaveProperty("article_img_url");
            expect(story).toHaveProperty("comment_count");

            expect(typeof story.author).toBe("string");
            expect(typeof story.title).toBe("string");
            expect(typeof story.article_id).toBe("number");
            expect(typeof story.topic).toBe("string");
            expect(typeof story.created_at).toBe("string");
            expect(typeof story.votes).toBe("number");
            expect(typeof story.article_img_url).toBe("string");
            expect(typeof story.comment_count).toBe("number");
          });
        });
    });
    it("200 desc order - should return articles in desc order based on create_at date", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    it("200 return the comments for an article_id, with comment_id, votes, created_at, author, body, article_id. Sorted most recent first", () => {
      return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const firstComment = body.comments[0];
        expect(body.comments.length).toBe(11);
          if (body.comments.length > 0) {
            body.comments.forEach((comment) => {
              expect(comment).toHaveProperty("comment_id");
              expect(comment).toHaveProperty("votes");
              expect(comment).toHaveProperty("created_at");
              expect(comment).toHaveProperty("author");
              expect(comment).toHaveProperty("body");
              expect(comment).toHaveProperty("article_id");
            });
            expect(body.comments).toBeSortedBy("created_at", {
              descending: true,
            });
            expect(firstComment.body).toBe("I hate streaming noses");
            expect(firstComment.article_id).toBe(1);
            expect(firstComment.author).toBe("icellusedkars");
            expect(firstComment.votes).toBe(0);
            expect(firstComment.created_at).toBe("2020-11-03T21:00:00.000Z");
          }
        });
      });
    it('200 and empty array for articles with no comments', () => {
      return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then(({body}) => {
        expect(body.comments).toEqual([])
      })
    })
    it("400 returns invalid data message if the wrong data type is used", () => {
      return request(app)
        .get("/api/articles/one/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Invalid data type");
        });
    });
    it("404 returns a 404 message if the article ID does not exist", () => {
      return request(app)
        .get("/api/articles/400/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article does not exist");
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    it("adds a new comment to an article and returns the comment", () => {
      return request(app)
        .post("/api/articles/2/comments")
        .send({ username: "butter_bridge", body: "I saw this on Facebook" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment.body).toBe("I saw this on Facebook")
          expect(body.comment.article_id).toBe(2);
          expect(body.comment.username).toBe("butter_bridge")
        })
        .then(() => {
          return db.query(`SELECT * FROM comments`).then((totalComments) => {
            const numComments = totalComments.rows.length;
            expect(numComments).toBe(19);
          });
        });
    });
    it("400 returns invalid data message if the wrong data type is used", () => {
      return request(app)
        .post("/api/articles/four/comments")
        .send({ username: "butter_bridge", body: "I saw this on Facebook" })
        .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe("Invalid data type")
      })
    })
    it("404 returns a 404 message if the article ID does not exist", () => {
      return request(app)
      .post("/api/articles/999/comments")
      .send({ username: "butter_bridge", body: "I saw this on Facebook" })
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe(`Article does not exist`)
      })
    })
    it("400 returns error when incomplete data is submitted", () => {
      return request(app)
      .post("/api/articles/6/comments")
      .send({ username: "butter_bridge", })
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe(`Missing required data`)
      })
    })
    it("400 returns error when the wrong format of data is used with the correct columns", () => {
      return request(app)
      .post("/api/articles/6/comments")
      .send({ username: "butter_bridge", body: {number:34758} })
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe(`Wrong data type in body`)
      })
    })
    it("400 returns error when unregistered user submits comment", () => {
      return request(app)
      .post("/api/articles/6/comments")
      .send({ username: "cliffno1", body: "Is wired for sound a good a true classic?"})
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("User does not exist")
      })
    })
  });
});
