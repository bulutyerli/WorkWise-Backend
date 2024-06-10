# API Endpoints

## Staff Routes

### Get All Annual Leave Requests

- **URL**: `/api/v1/annual`
- - **Method**: GET
- - **Description**: Retrieves a annual leave data of all staff members of manager.
- - **Authorization**: Requires registered manager privileges.
- - **Query Parameters**:
    - `managerId` (number): The ID of the manager for whom to retrieve annual leave requests.
- - **Response**:
    - Status: 200 OK
    - Body:
    - `name` (string): The first name of the staff member.
    - `surname` (string): The last name of the staff member.
    - `starting_date` (string): The start date of the annual leave request (format: YYYY-MM-DD).
    - `end_date` (string): The end date of the annual leave request (format: YYYY-MM-DD).
    - `id` (number): The unique ID of the annual leave request.
- **Example**:

  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/annual?managerId=123
  ```

### Delete Annual Leave Requests

- **URL**: `/api/v1/annual`
- - **Method**: DELETE
- - **Description**: Deletes annual leave request.
- - **Authorization**: Requires registered user privileges.
- - **Query Parameters**:
    - `requestId` (string): The ID of the annual leave request.
- - **Response**:
    - Status: 204 No Content
    - Body: Empty
- **Example**:
  ```bash
  curl -X DELETE -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/annual?requestId=123
  ```

### Update Annual Leave Request Status

- **URL**: `/api/v1/annual`
- - **Method**: PUT
- - **Description**: Updated annual leave request status.
- - **Authorization**: Requires manager privileges.
- - **Request Body Parameters**:
  - `requestId` (string): The ID of the annual leave request.
  - `status` (string): The new status of the leave request (`approved`, `rejected`)
- - **Response**:
    - Status: 200 OK
  - **Error Response**:
    - Status: 400 Bad Request
    - Body: `{ "error": "Status or ID not provided" }`
- **Example**:
  ```bash
    curl -X PUT -H "Authorization: Bearer <firebase_id_token>" -H "Content-Type: application/json" -d '{"requestId": "123", "status": "approved"}' http://localhost:8080/api/v1/annual
  ```

### Make New Annual Leave Request

- **URL**: `/api/v1/annual`
- **Method**: POST
- **Description**: Creates a new annual leave request.
- **Authorization**: Requires registered user privileges.
- **Request Body Parameters**:
  - `firebase_id` (string): The Firebase ID of the user making the request.
  - `starting_date` (string): The starting date of the annual leave (format: YYYY-MM-DD).
  - `end_date` (string): The end date of the annual leave (format: YYYY-MM-DD).
  - `user_id` (number): The ID of the user making the request.
- **Response**:
  - Status: 201 Created
  - Body: `{ "success": true, "message": "Annual request created successfully" }`
- **Error Response**:
  - Status: 400 Bad Request
    - Body: `{ "error": "Invalid request data" }`
  - Status: 500 Internal Server Error
    - Body: `{ "error": "Internal Server Error" }`
- **Example**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"firebase_id": "<firebase_id>", "starting_date": "2024-07-01", "end_date": "2024-07-05", "user_id": 123}' http://localhost:8080/api/v1/annual
  ```

  ### Get Current Annual Leave

- **URL**: `/api/v1/annual-current/:id`
- **Method**: GET
- **Description**: Retrieves the current annual leave balance for a staff member.
- **Authorization**: Requires registered user privileges.
- **URL Parameters**:
  - `id` (number): The ID of the staff member.
- **Response**:
  - Status: 200 OK
  - Body: The current annual leave balance for the staff member.
- **Error Response**:
  - Status: 400 Bad Request
    - Body: `{ "error": "No id given" }`
  - Status: 404 Not Found
    - Body: `{ "error": "Annual leave not found" }`
  - Status: 500 Internal Server Error
    - Body: `{ "error": "Internal Server Error" }`
- **Example**:
  ```bash
  curl -X GET http://localhost:8080/api/v1/annual-current/123
  ```

### Get Annual Leaves by Staff ID

- **URL**: `/api/v1/annual-leaves/:id`
- **Method**: GET
- **Description**: Retrieves annual leave information for a specific staff member based on their ID.
- **Authorization**: Requires registered user privileges.
- **URL Parameters**:
  - `id` (number): The ID of the staff member for whom annual leave information is requested.
- **Response**:

  - Status: 200 OK
  - Body:
    ```json
    [
      {
        "id": 1,
        "firebase_id": "example_firebase_id",
        "starting_date": "2024-06-20T00:00:00.000Z",
        "end_date": "2024-06-25T00:00:00.000Z",
        "status": "pending",
        "user_id": 123
      }
    ]
    ```

- **Error Response**:
  - Status: 400 Bad Request
    - Body: `{ "error": "No id given" }`
  - Status: 404 Not Found
    - Body: `{ "error": "Annual leave not found" }`
- **Example**:
  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/annual-leaves/123
  ```
