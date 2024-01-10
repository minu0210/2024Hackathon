import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("안녕하세요")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});