const myDataModel = require('../model/data'); 


const saveData = async (req, res) => {
  try {
    const { slack_name, track, github_file_url, github_repo_url, status_code } = req.body;

    //// set uct_time
    const utc_time = new Date();

    // Create a new data document
    const newData = new myDataModel({
      slack_name,
      current_day: new Date(),
      utc_time,
      track,
      github_file_url,
      github_repo_url,
      status_code,
    });

    // Save the data to the database
    const savedData = await newData.save();

    res.status(201).json({ message: 'Data saved successfully', data: savedData });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



///// find data wit ObjectId

const viewById = async (req, res) => {
  try {
    const dataId = req.params.id;
    const data = await myDataModel.findById(dataId); 
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

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

    // Define an object with the selected fields
    const dataToRender = {
      slack_name: data.slack_name,
      current_day: currentDay,
      utc_time: getCurrentUtcTime(),
      track: data.track,
      github_file_url: data.github_file_url,
      github_repo_url: data.github_repo_url,
      status_code: data.status_code,
    };

    res.status(200).json(dataToRender); // Send the data as JSON
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const viewAllData = async (req, res) => {
  try {
    const allData = await myDataModel.find(); // Retrieve all data

    if (!allData || allData.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Define an array to store the formatted data for each document
    const formattedData = [];

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

    for (const data of allData) {
      const currentDay = daysOfWeek[new Date().getDay()];

      // Define an object with the selected fields for each document
      const dataToRender = {
        slack_name: data.slack_name,
        current_day: currentDay,
        utc_time: getCurrentUtcTime(),
        track: data.track,
        github_file_url: data.github_file_url,
        github_repo_url: data.github_repo_url,
        status_code: data.status_code,
      };

      formattedData.push(dataToRender);
    }

     // Send the data as JSON array
    res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const queryData = async (req, res) => {
  try {
    const slack_name = req.query.slack_name;
    const track = req.query.track;

    // Initialize the query object with the conditions
    const query = {};

    // If slack_name parameter is provided, add it to the query
    if (slack_name) {
      query.slack_name = slack_name;
    }

    // If track parameter is provided, add it to the query
    if (track) {
      query.track = track;
    }

    // Execute the query and retrieve matching data
    const matchingData = await myDataModel.find(query);

    // Check if any matching data was found
    if (!matchingData || matchingData.length === 0) {
      return res.status(404).json({ error: 'No data matching the criteria found' });
    }

    // Define an array to store the formatted data for each document
    const formattedData = [];

    for (const data of matchingData) {
      
            // CURREN TIME FORMATTING LOGIC
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

      // Define fields to be render
      const dataToRender = {
        slack_name: data.slack_name,
        current_day: currentDay,
        utc_time: getCurrentUtcTime() ,
        track: data.track,
        github_file_url: data.github_file_url,
        github_repo_url: data.github_repo_url,
        status_code: data.status_code,
      };

      formattedData.push(dataToRender);
    }

    res.status(200).json(formattedData);
    // res.json({
    //   status: 200,
    //   formattedData
    // })
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



  const dataController = {
    saveData,
    viewById,
    viewAllData,
    queryData
  };
  module.exports = dataController;