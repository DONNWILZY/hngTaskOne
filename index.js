const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

function getCurrentUtcTime() {
    const now = new Date();
    const utcOffsetInMinutes = now.getTimezoneOffset() - (60 * 1); // 1 hour behind WAT
    const utcTime = now;

    // Validate the UTC offset
    if (utcOffsetInMinutes < -120 || utcOffsetInMinutes > 120) {
        throw new Error('The UTC offset must be within +/- 2 hours');
    }

    return utcTime;
}

// Get the current day of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDay = daysOfWeek[new Date().getDay()];

const outputData = {
    "slack_name": "GODSWILL_EFFIONG",
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
            <P> <b>RESPONSE WITH QUERIED PARAMETERS:</b>  <a href="https://hng-task-one-two.vercel.app/api/query?&slack_name=GODSWILL_EFFIONG&track=backend" target="_blank">https://hng-task-one-two.vercel.app/api/query?&slack_name=GODSWILL_EFFIONG&track=backend</a></p> </P>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

          // query parameters
app.get('/api/query', (req, res) => {
    const slack_name = req.query.slack_name;
    const track = req.query.track;


             // If both parameters are missing, return a 400 Bad Request
    if (!slack_name && !track) {
        return res.status(400).json({ error: 'Both slack_name and track are not correct' });
    }
             // Validate the slack_name parameter if present
    if (slack_name && slack_name !== 'GODSWILL_EFFIONG') {
        return res.status(400).json({ error: 'Incorrect slack name' });
    }
        // Validate the track parameter if present
    if (track && track !== 'backend') {
        return res.status(400).json({ error: 'Invalid track' });
    }

    // Generate an HTML response or JSON response based on the presence of parameters
    if (slack_name || track) {
        res.json({
            status: 200,
            message: 'Successfully fetched data',
            data: outputData
        });
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
    if (slack_name !== 'GODSWILL_EFFIONG') {
        return res.status(400).json({ error: 'Incorrect slack name' });
    }
            // Response data
    res.json({
        status: 200,
        message: 'Successfully fetched data',
        data: outputData
    });
});

///// ROUTE TO GET ALL DATA
app.get('/api/data', (req, res) => {
        // Response data
    res.json({
        status: 200,
        message: 'Successfully fetched data',
        data: outputData
    });
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
