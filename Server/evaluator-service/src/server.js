import app from "./app.js"

const port = process.env.PORT||5001;
app.listen(port, () => console.log(`Auth-Service running on port ${port}`));