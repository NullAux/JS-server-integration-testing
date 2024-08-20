//Testing

const request = require("supertest")
//const db = require("./db-index.js")
const app = require("../server_files/app.js")

describe("GET /", () => {
    test("returns a JSON", () => {
        return request(app).get("/")
        .expect(200)
        .expect("Content-type","application/json; charset=utf-8")
    })
    test("Body contains expected message", () => {
        return request(app).get("/")
        .then((result) => {
            expect(result.body).toEqual({"msg": "Welcome to the server!"})
        })
    })
})