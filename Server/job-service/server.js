import app from "./app.js"

const port = process.env.port||8000
app.listen(port,`Server running on port${port}`)