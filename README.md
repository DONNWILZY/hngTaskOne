Project Title:  HNG Task One - API
Project Description:
The HNG Task One API is a simple HNG10 task on web service built to provide information in response to HTTP GET requests. The goal of this project is to create an API endpoint that can accept query parameters and return specific information in JSON format. E.g   https://hng-task-one-two.vercel.app/api/query?&slack_name=GODSWILL_EFFIONG&track=backend

Features:
1. Default Route: The default route ("/") provides a detailed project description and documentation of available endpoints in HTML format.

2. Endpoint for Query Parameters: The "/api/query" endpoint allows users to query parameters individually. It accepts "slack_name" and "track" as query parameters and returns JSON responses based on the presence and validity of these parameters.

3. Endpoint for Queried Data: The "/api/dataQuery" endpoint requires both "slack_name" and "track" parameters to be present together and returns JSON responses with validation. The first one I did before I decided to added more conditions for validation

4. Endpoint to Get All Data: The "/api/data" endpoint returns JSON responses without any query parameters, providing a complete set of information.

Technologies Used:
 Node.js: A JavaScript runtime environment used for server-side development.
Express.js: A web application framework for building APIs and web applications.
MongoDB (not shown in this example): A NoSQL database for data storage. (WILL FURTHER IMPLMENT DATA TO BE STORES AND QUERIED FROM DB)

---

Feel free to send your corrections
