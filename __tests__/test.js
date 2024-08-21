//Testing

const request = require("supertest")
const db = require("../server_files/database/db_index.js")
const app = require("../server_files/app.js")

afterAll(() => {
    db.closePool()
})

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

describe("GET /users/:user - get user info by name", () => {
    test("Returns a 200 and JSON when given valid user", () => {
        return request(app).get("/users/userNumberOne")
        .expect(200)
        .expect("Content-type","application/json; charset=utf-8")
    })
    
    test("Body contains user information", () => {
        return request(app).get("/users/userNumberOne")
        .then((result) => {
            expect(result.body).toEqual({"id": 1, "isonline": false, "name": "userNumberOne", "status": "I\'m number one!"})
        })
    })
})

describe("GET /users?isOnline=true - get the names of online users", () => {
    test("Returns a 200 and JSON", () => {
        return request(app).get("/users?isOnline=true")
        .expect(200)
        .expect("Content-type","application/json; charset=utf-8")
    })

    test("Return names in an array", () => {
        return request(app).get("/users?isOnline=true")
        .then((result) => {
            expect(result.body).toEqual(["SecondUser", "<3('rd user)"])
        })
    })
})

//Testing error messages
describe("GET /users/:user error messages", () => {
    test("When given an invalid ID, return 400 Bad Request", () => {
        return request(app).get("/users/NameThatIsTooooooLong")
        .then((result) => {
            expect(result.status).toBe(400)
        })
    })

    test("When user does not exist, return 404 Not Found", () => {
        return request(app).get("/users/GhostUser")
        .then((result) => {
            console.log(result.body)
            expect(result.status).toBe(404)
            expect(result.body.msg).toBe("User name GhostUser was not found in database")
        })
    })
})