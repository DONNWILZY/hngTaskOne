const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5001;

const dataRoutes = require('./routes/viewData'); 

// Database connection
mongoose.connect(process.env.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

/// db connection error
db.on('error', (error) => {
  console.error('Connection error:', error);
});
//// db connecrion status.Successful message
db.once('open', () => {
  console.log('Connection to MongoDB successful!');
});
//// db connecrion status.failure  message
db.once('close', () => {
  console.log('Connection to MongoDB disconnected.');
});


  
  function getCurrentUtcTime() {
    const now = new Date();
    let utc_time = now.toISOString().split(".")[0] + "Z";
    return utc_time;
  }
  

// Get the current day of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = daysOfWeek[new Date().getDay()];

const outputData = {
    "slack_name": "wilz",
    "current_day": currentDay,
    "utc_time": getCurrentUtcTime(),
    "track": "backend",
    "github_file_url": "https://github.com/DONNWILZY/hngTaskOne/blob/master/index.js",
    "github_repo_url": "https://github.com/DONNWILZY/hngTaskOne",
    "status_code": 200
};

/////// DEFAULT ROUTE FOR DESSCIPTION
app.get('/', (req, res) => {
       const htmlResponse = `
        <html>
        <head><title>Data</title></head>
        <body>
            <h2>TASK ONE:</h2>
            <h3>NAME: EFFIONG GODSWILL O.</h3>
            <p>Slack Name: ${outputData.slack_name}</p>
            <p>Current Day: ${outputData.current_day}</p>
            <p>UTC Time: ${outputData.utc_time}</p>
            <p>Track: ${outputData.track}</p>
            <p>Github File URL: <a href="${outputData.github_file_url}" target="_blank">${outputData.github_file_url}</a></p>
            <p>Github Repo URL: <a href="${outputData.github_repo_url}" target="_blank">${outputData.github_repo_url}</a></p>
            <p>Status Code: ${outputData.status_code}</p>

            <h2> END POINTS</h2>
            <P> <b>GET RESPONSE DATA WITHOUT QUERY PARAMETERS:</b>  <a href="https://hng-task-one-two.vercel.app/api/data" target="_blank">https://hng-task-one-two.vercel.app/api/data</a></p> </P>
            <P> <b>RESPONSE WITH QUERIED PARAMETERS:</b>  <a href="https://hng-task-one-two.vercel.app/api?slack_name=wilz&track=backend" target="_blank">https://hng-task-one-two.vercel.app/api?slack_name=wilz&track=backend</a></p> </P>
            <P> <b>READ ME - PROJECT DESCRIPTION:</b>  <a href="https://github.com/DONNWILZY/hngTaskOne/blob/master/README.md">https://github.com/DONNWILZY/hngTaskOne/blob/master/README.md</a></p> </P>

        </body>
        </html>
    `;

    res.send(htmlResponse);
});

          // query parameters
app.get('/api', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;


             // If both parameters are missing, return a 400 Bad Request
    if (!slack_name && !track) {
        return res.status(400).json({ error: 'Both slack_name and track are not correct' });
    }
             // Validate the slack_name parameter if present
    if (slack_name && slack_name !== 'wilz') {
        return res.status(400).json({ error: 'Incorrect slack name' });
    }
        // Validate the track parameter if present
    if (track && track !== 'backend') {
        return res.status(400).json({ error: 'Invalid track' });
    }

    // response
    if (slack_name || track) {
        res.status(200).json(outputData);
        // res.json({
        //     status: 200,
        //    // message: 'Successfully fetched data',
        //     data: outputData
        // });
    } else {
        res.send('No data matching the criteria found');
    }
});


/////// ROUTE TO GET QUERIED DATA only TWO PARAMS TOGETHER
app.get('/api/dataQuery', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;

                // Validate the track parameter
    if (track !== 'backend') {
        return res.status(400).json({ error: 'Invalid track' });
    }

    // Validate the slack_name parameter
    if (slack_name !== 'wilz') {
        return res.status(400).json({ error: 'Incorrect slack name' });
    }
            // Response data
    res.json({
        status: 200,
        //message: 'Successfully fetched data',
        data: outputData
    });
});

///// ROUTE TO GET ALL DATA
app.get('/api/data', (req, res) => {
        // Response data
    res.json({
        status: 200,
       // message: 'Successfully fetched data',
        data: outputData
    });
});

app.use('/api/myData', dataRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  app.on('disconnect', () => {
    console.log('disconnected');
  });