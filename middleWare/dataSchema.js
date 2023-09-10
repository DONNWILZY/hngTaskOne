myDataSchema.pre('save', function (next) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[new Date().getDay()]; // Get the current day as a string
    this.current_day = currentDay; // Update the current_day field with the current day
    next();
  });
  
  