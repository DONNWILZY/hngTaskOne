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

/////// DEFAULT ROUTE
app.get('/', (req, res) => {
    res.send(outputData)
});

/////// ROUTE TO GET QUERIED DATA
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
