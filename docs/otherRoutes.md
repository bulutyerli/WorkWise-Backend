# API Endpoints

## Other Routes

### Get All Categories

- **URL**: `/api/v1/categories`
- - **Method**: GET
- - **Description**: Retrieves all categories including offices, roles, departments, shifts, and managers.
- - **Authorization**: Requires registered user privileges.
- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
    {
      "data": {
        "offices": [
          {
            "id": 1,
            "name": "Office 1"
          }
        ],
        "roles": [
          {
            "id": 1,
            "name": "Role 1"
          }
        ],
        "departments": [
          {
            "id": 1,
            "name": "Department 1"
          }
        ],
        "shifts": [
          {
            "id": 1,
            "name": "A"
          }
        ],
        "managers": [
          {
            id: 1;
            name: "Bulut";
            surname: "Yerli";
            role_name: "CEO";
            shift: string | null;
            office: "New York";
          }
        ]
      }
    }
    ```

- **Error Response**:
  - Status: 500 Internal Server Error
  - Body: { "error": "Internal Server Error" }
- **Example**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/categories"
  ```

### Get User Role

- **URL**: `/api/v1/user-role`
- - **Method**: GET
- - **Description**: Retrieves the role information of a user based on their Firebase ID.
- - **Authorization**: Requires registered user privileges.
- **Query Parameters**:
  - - `firebaseId` (string): The Firebase ID of the user
- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
    {
      "isAdmin": true,
      "isManager": true,
      "userId": 123
    }
    ```

- **Error Response**:

  - Status: 400 Bad Request

  - Body: { "error": "Firebase ID is required" }

  - Status: 404 Not Found
  - Body: { "error": "User not found" }

- **Example**:

  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" "http://localhost:8080/api/v1/user-role?firebaseId=example_firebase_id"
  ```

### Get Hierarchy

- **URL**: `/api/v1/hierarchy`
- - **Method**: GET
- - **Description**: Retrieves the hierarchy data.
- - **Authorization**: Requires registered user privileges.
- **Query Parameters**:
  - - `firebaseId` (string): The Firebase ID of the user
- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
    {
      "data": [
        {
          "id": 12,
          "name": "John",
          "surname": "Doe",
          "role_name": "CEO",
          "shift": "B",
          "office": "New York",
          "parentId": null | id,
          "department": "Logistics"
        }
      ]
    }
    ```

- **Error Response**:

  - Status: 404 Not Found
  - Body: { "error": "Could not get the hierarchy data" }

- **Example**:

  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" "http://localhost:8080/api/v1/hierarchy"
  ```
