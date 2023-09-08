const express = require('express');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();

const PORT = 5000;


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


const outPutdata = {
 "slack_name": "GODSWILL EFFIONG",
 "current_day": currentDay,
  "utc_time": getCurrentUtcTime(),
 "track": "backend",
 "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",
 "github_repo_url": "https://github.com/username/repo",
 "status_code": 200

 
}
console.log(outPutdata)



app.get('/api/data', (req, res) => {
     const slack_name = req.query.slack_name;
    const track = req.query.track;

    // Validate the track parameter
    if (track !== 'backend') {
        return res.status(400).json({ error: 'Invalid track' });
    }

    
    res.json({
        status: 200,
        message: 'sucessfully fetched data',
        data: outPutdata

    })
  });







app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

