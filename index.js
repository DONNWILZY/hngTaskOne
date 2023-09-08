const express = require('express');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
dotenv.config();

const PORT = 5000;



  // Get the current day of the week
function getCurrentUtcTime() {
    const now = new Date();
    return now.toISOString();
}


  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];


const outPutdata = {
 "slack_name": "example_name",
 "current_day": currentDay,
  "utc_time": getCurrentUtcTime(),
 "track": "backend",
 "github_file_url": "https://github.com/username/repo/blob/main/file_name.ext",
 "github_repo_url": "https://github.com/username/repo",
 "status_code": 200

 
}
console.log(outPutdata)



app.get('/api/data', (req, res) => {

    
    res.json({
        status: 200,
        message: 'sucessfully fetch data',
        data: outPutdata

    })
  });

//   // Connect to MongoDB (replace 'mongodb://localhost/mydatabase' with your MongoDB URL)
// mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });
  





app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });

