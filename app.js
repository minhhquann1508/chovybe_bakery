require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./configs/connectDb');
const categoryRoute = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/products', productRoute);

db.connect((err) => {
    if (err) {
        console.log('Error connecting', err);
        return;
    } else {
        console.log('Connect to db successfully');
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
});


