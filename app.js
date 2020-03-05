const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const appData = require('./apps-data.js');

app.get('/apps', (req, res) => {
    const { genres = "", sort } = req.query;
    

    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be either rating or app');
        }
      }

    //filter based on chosen genre
    let results = appData
            .filter(app =>
                app
                    .Genres
                    .toLowerCase()
                    .includes(genres.toLowerCase())
            );
    

    //sort by rating or app if value provided
    if (sort === 'App') {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
      } else if (sort === 'Rating') {
        results
          .sort((a, b) => {
            return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
        });
      }

    res
    .json(results);
 });


 module.exports = app;