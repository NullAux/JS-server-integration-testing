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
            expect(result.status).toBe(404)
            expect(result.body.msg).toBe("User name GhostUser was not found in database")
        })
    })
})

describe("GET /users?isOnline error messages", () => {
    test("When given an invalid query (not true/false), return 400", () => {
        return request(app).get("/users?isOnline=notabool")
        .then((result) => {
            expect(result.status).toBe(400)
        })
    })
})

describe("GET /users/multi/:columns - Get multiple columns of information in one query", () => {
    test("When given one column, return that column for all users", () => {
        return request(app).get("/users/multi/name")
        .then((result) => {
            expect(result.body).toEqual([{"name": "userNumberOne"}, {"name": "SecondUser"}, {"name": "<3('rd user)"}, {"name": "4th Gear"}])
        })
    })

    test("When given multiple columns, return those columns (as objects showing each row", () => {
        return request(app).get("/users/multi/name+status")
        .then((result) => {
            expect(result.body).toEqual([{"name": "userNumberOne", "status": "I'm number one!"}, {"name": "SecondUser", "status": "Rising star!"}, {"name": "<3('rd user)", "status": "..."}, {"name": "4th Gear", "status": "Named after a particularly good song."}])
        })
    })

    test("Greenlisting - Check all requested columns are valid (to ensure no unhandled error, and to prevent SQL injection", () => {
        return request(app).get("/users/multi/notARealColumn+*")
        .then((result) => {
            expect(result.status).toBe(400)
            expect(result.body.msg).toBe("Requested column(s) notARealColumn,* are not valid")
        })


    })
})

describe("GET /users/nameLike/:name - Get user names by LIKE term ie search", () => {
    test("Given a term like one name in database, return that name in an array", () => {
        return request(app).get("/users/nameLike/4th")
        .then((result) => {
            expect(result.body).toEqual(["4th Gear"])
        })
    })

    test("Given a term like multiple names in databse, return those names in an array", () => {
        return request(app).get("/users/nameLike/user")
        .then((result) => {
            expect(result.body).toEqual(["userNumberOne", "SecondUser", "<3('rd user)"])
        })
    })
})