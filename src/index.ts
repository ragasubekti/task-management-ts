import express from "express";

const app = express();

// Express Middewares
app.use(express.json());

const PORT = process.env.PORT || 6900;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
