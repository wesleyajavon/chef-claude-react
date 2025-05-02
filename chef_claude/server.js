// defining the server port
const port = 5002

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
const corsOptions = {
    origin: '*',
    credentials: false,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// listening for port 5000
app.listen(5002, () => console.log(`Server is running on ${port}`))

// API request
app.get('/', (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://api.anthropic.com/v1/messages',
        headers: {
            'x-api-key': "wesleyhidethis",
            'x-api-host': 'api.anthropic.com',
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        data: {
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 1024,
            "messages": [
                { "role": "user", "content": "Hello, world" }
            ]
        }


    };

    axios.request(options).then(function (response) {
        res.json(response.data);
        console.log("jsuis ici fdp2")
    }).catch(function (error) {
        console.log("jsuis ici fdp")
        console.error(error);
    });
})
