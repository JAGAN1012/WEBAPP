const express = require('express')
const bodypraser = require('body-parser')
var cors = require('cors')
const app = express()
const mysql = require('mysql2');
app.use(bodypraser.json());
app.use(cors())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'movie_review'
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as ID ' + db.threadId);
});

const port = 8080

app.listen(port, (err) => {
    if (err) {
        console.log("error....")
    }
    else {
        console.log("started")
    }
})

app.get("/api/hello", (req, res) => {

    res.send({
        status: true,
        message: "Hello World"
    })
})

app.post('/submit-review', (req, res) => {
    const { name, email, rating, review } = req.body;
    const query = 'INSERT INTO reviews (name, email, rating, review) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, rating, review], (err, result) => {
        if (err) {
            console.error('Error saving to DB:', err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'Review submitted successfully!' });
    });
});
