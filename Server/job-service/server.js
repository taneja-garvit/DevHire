import app from "./app.js"

const port = process.env.PORT||5002
app.listen(port,`Server running on port${port}`)