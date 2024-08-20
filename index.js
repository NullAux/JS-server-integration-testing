//Open server
const app = require("./server_files/app.js")
app.listen(9090,() => {
    console.log("Server is listening on port 9090")
})