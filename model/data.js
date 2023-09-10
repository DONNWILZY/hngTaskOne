const mongoose = require('mongoose');

// Create a Mongoose schema
const myDataSchema = new mongoose.Schema({
  slack_name: {
    type: String,
    required: true,
  },
  current_day: {
    type: Date,
    required: true,
    default: Date.now, // Set to the current date and time by default
  },
  utc_time: {
    type: Date,
    required: true,
  },
  track: {
    type: String,
    required: true,
  },
  github_file_url: {
    type: String,
    required: true,
  },
  github_repo_url: {
    type: String,
  },

  status_code: {
    type: Number,
  },

  
});

// Create a Mongoose model from the schema
const myData = mongoose.model('myData', myDataSchema);

module.exports = myData;
