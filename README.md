Project Title:  HNG Task One - API

Project Description:
The HNG Task One API is a simple HNG10 task on web service built to provide information in response to HTTP GET requests. The goal of this project is to create an API endpoint that can accept query parameters and return specific information in JSON format. E.g   https://hng-task-one-two.vercel.app/api/query?&slack_name=GODSWILL_EFFIONG&track=backend


Features:
1. Default Route: The default route `("/") `provides a detailed project description and documentation of available endpoints in HTML format.

2. Endpoint for Query Parameters: The `/api/` endpoint allows users to query parameters individually. It accepts "slack_name" and "track" as query parameters and returns JSON responses based on the presence and validity of these parameters.

3. Endpoint for Queried Data: The `/api/dataQuery `endpoint requires both "slack_name" and "track" parameters to be present together and returns JSON responses with validation. The first one I did before I decided to added more conditions for validation

4. Endpoint to Get All Data: The `/api/data `endpoint returns JSON responses without any query parameters, providing a complete set of information.


   GET DATA SAVED TO DATABASE
   

6. Endpoint: `/api/myData/save`
   Method: POST
   Description: Use this endpoint to save data to the database.
   Request Payload:
     ```json
     {
       "slack_name": "GODSWILL_EFFIONG",
       "track": "backend",
       "github_file_url": "https://github.com/DONNWILZY/hngTaskOne/blob/master/index.js",
       "github_repo_url": "https://github.com/DONNWILZY/hngTaskOne",
       "status_code": 200
     }
     ```

7. Endpoint: `/api/myData/view/:id`
   Method: GET
   Description: Retrieve data for a specific ID.

8. Endpoint: `/api/myData/viewall`
   Method: GET
   Description: View all data for this schema.

9. Endpoint: `/api/myData/query`
   Method: GET
   Description: Use this endpoint to query data with specific parameters.
   Example Query: `/api/myData/query?slack_name=wilz&track=backend`

Please note that these endpoints are case-sensitive, and you should replace `:id` with the actual ID you want to retrieve when using the `/api/myData/view/:id` endpoint.

Technologies Used:

 Node.js: A JavaScript runtime environment used for server-side development.

Express.js: A web application framework for building APIs and web applications.

MongoDB  A NoSQL database for data storage. 

---

Feel free to send your corrections
