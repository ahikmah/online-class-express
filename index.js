require('dotenv').config();
const express = require('express');
const cors = require('cors');

const Router = require('./src/routers/router');
const app = express();

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });

app.use(cors());

app.use(jsonParser);
app.use(urlEncodedParser);

app.use(Router);

app.use((req, res) => {
    res.status(404).send('<h1>Page not Found!</h1>');
});

app.listen(process.env.PORT);
