import app from "./app.js"

const port = process.env.PORT||8000;
app.listen(`Server started at port ${port}`);