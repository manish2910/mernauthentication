require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

mongoose
    .connect(process.env.DATABASE_URL, 
    { useNewUrlParser:true , useCreateIndex:true, useFindAndModify:false, useUnifiedTopology: true })
    .then((res, err) => {
        if(err) return console.log(err);
        console.log(`DB connected`);
    });

app.use(morgan('dev'));
app.use(express.json());

app.use(authRoutes);

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});