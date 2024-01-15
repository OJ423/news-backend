const request = require("supertest");
const { db } = require("../db/connection");

const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
            })
        });
    })
    it("should return 3 topics", () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        expect(response.body.topics.length).toBe(3)
      })
    })
    it("should return the right values, checking first topic", () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then((response) => {
        const firstResponse = response.body.topics[0]
        expect(firstResponse.description).toBe('The man, the Mitch, the legend')
        expect(firstResponse.slug).toBe('mitch')
      })
    });
  });
});