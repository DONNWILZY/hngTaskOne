const mongoose = require('mongoose');

// Define the function to get the current UTC time
function getCurrentUtcTime() {
  const now = new Date();
  const utcOffsetInMinutes = now.getTimezoneOffset() - (60 * 1); // 1 hour behind WAT

  // Validate the UTC offset
  if (utcOffsetInMinutes < -120 || utcOffsetInMinutes > 120) {
    throw new Error('The UTC offset must be within +/- 2 hours');
  }

  return now;
}

// Create a Mongoose schema
const myDataSchema = new mongoose.Schema({
  slack_name: {
    type: String,
    required: true,
  },
  current_day: {
    type: String, // Store the day of the week as a string
    required: true,
  },
  utc_time: {
    type: Date,
    required: true,
    default: getCurrentUtcTime, // Set to the current UTC time by default using the function
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

// Define a pre-save middleware function to update the current_day field
myDataSchema.pre('save', function (next) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()]; // Get the current day as a string
  this.current_day = currentDay; // Update the current_day field with the current day
  next();
});

// Create a Mongoose model from the schema
const myData = mongoose.model('myData', myDataSchema);

module.exports = myData;
