# API Endpoints

## Staff Routes

### Get All Staff

- **URL**: `/api/v1/staff`
- - **Method**: GET
- - **Description**: Retrieves a list of all staff members.
- - **Authorization**: Requires registered user privileges.
- - **Example**:
  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/staff
  ```

### Create New Staff

- **URL**: `/api/v1/staff/:id`
- - **Method**: POST
- - **Description**: Adds new staff member.
- - **Authorization**: Requires registered admin privileges.
- **Request Body Parameters**:
  - `name`, `surname`, `phone`, `birthday`, `office`, `department`, `shift`, `role`, `manager_id`, `join_date`, `salary`, `email`, `password`
- **Response**:
  - Status: 201 Created
  - Body: `{ "success": true, "message": "Staff member created successfully" }`
- **Example**:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "John", "surname": "Doe", "phone": "123456789", "birthday": "1990-01-01", "office": 1, "department": 1, "shift": 1, "role": 1, "manager_id": 1, "join_date": "2022-01-01", "salary": 50000, "email": "john.doe@example.com", "password": "password123"}' http://localhost:8080/api/v1/staff
  ```

### Get Staff Member by ID

- **URL**: `/api/v1/staff/:id`
- **Method**: GET
- **Description**: Retrieves a staff member by ID.
- - **Authorization**: Requires registered user privileges.
- **Parameters**:
  - `id` (number): The ID of the staff member to retrieve.
- **Response**:
  - Status: 200 OK
  - Body: JSON object representing the staff member with the following fields:
    - `id` (number): The unique ID of the staff member.
    - `name` (string): The first name of the staff member.
    - `surname` (string): The last name of the staff member.
    - `birthday` (string): The birthday of the staff member (format: YYYY-MM-DD).
    - `phone` (string): The phone number of the staff member.
    - `salary` (number): The salary of the staff member.
    - `join_date` (string): The join date of the staff member (format: YYYY-MM-DD).
    - `department` (string): The name of the department where the staff member works.
    - `department_id` (number): The ID of the department where the staff member works.
    - `office` (string): The name of the office where the staff member works.
    - `office_id` (number): The ID of the office where the staff member works.
    - `role` (string): The name of the role of the staff member.
    - `role_id` (number): The ID of the role of the staff member.
    - `shift` (string): The name of the shift of the staff member.
    - `shift_id` (number): The ID of the shift of the staff member.
    - `manager_id` (number): The ID of the manager of the staff member.
    - `email` (string): The email address of the staff member.
- **Error Response**:
  - Status: 404 Not Found
  - Body: `{ "error": "Staff ID Not Found" }`
- **Example**:
  ```bash
  curl -X GET -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/staff/123
  ```

### Delete Staff Member

- **URL**: `/api/v1/staff/:id`
- **Method**: DELETE
- **Description**: Deletes a staff member by ID.
- **Authorization**: Admin privileges required.
- **Parameters**:
  - `id` (number): The ID of the staff member to be deleted.
- **Response**:
  - Status: 200 OK
  - Body: `{ "success": true, "message": "Staff member deleted successfully" }`
- **Error Response**:
  - Status: 404 Not Found
    - Body: `{ "error": "Staff ID Not Found" }`
  - Status: 500 Internal Server Error
    - Body: `{ "error": "Internal Server Error" }`
- **Example**:
  ```bash
  curl -X DELETE -H "Authorization: Bearer <firebase_id_token>" http://localhost:8080/api/v1/staff/123
  ```

### Update Staff Member

- **URL**: `/api/v1/staff/:id`
- **Method**: PUT
- **Description**: Updates a staff member by ID.
- **Authorization**: Admin privileges required.
- **Parameters**:
  - `id` (number): The ID of the staff member to be updated.
- **Request Body**:
  - `name` (string, optional): The updated first name of the staff member.
  - `surname` (string, optional): The updated last name of the staff member.
  - `phone` (string, optional): The updated phone number of the staff member.
  - `birthday` (string, optional): The updated birthday of the staff member (format: YYYY-MM-DD).
  - `office` (number, optional): The updated ID of the office where the staff member works.
  - `department` (number, optional): The updated ID of the department where the staff member works.
  - `shift` (number, optional): The updated ID of the shift of the staff member.
  - `role` (number, optional): The updated ID of the role of the staff member.
  - `manager_id` (number, optional): The updated ID of the manager of the staff member.
  - `join_date` (string, optional): The updated join date of the staff member (format: YYYY-MM-DD).
  - `salary` (number, optional): The updated salary of the staff member.
- **Response**:
  - Status: 200 OK
  - Body: `{ "success": true, "message": "Staff member updated successfully" }`
- **Error Response**:
  - Status: 404 Not Found
    - Body: `{ "error": "Staff ID Not Found" }`
  - Status: 500 Internal Server Error
    - Body: `{ "error": "Internal Server Error" }`
- **Example**:
  ```bash
  curl -X PUT -H "Authorization: Bearer <firebase_id_token>" -H "Content-Type: application/json" -d '{"name": "Updated Name", "salary": 60000}' http://localhost:8080/api/v1/staff/123
  ```

## Staff Dates

Retrieves information about staff members with upcoming birthdays and new joins.

- **URL**: `/api/v1/staff-dates`
- **Method**: GET
- **Description**: Retrieves upcoming birthdays in next 3 days and new joins of staff members.
- **Authorization**: Requires registered user privileges.

### Request Parameters

None

### Response

- **Status**: 200 OK
- **Body**:

```json
{
  "birthdays": [
    {
      "id": number,
      "birthday": string,
      "name": string,
      "surname": string,
      "role": string,
      "department": string,
      "office": string
    }
  ],
  "newJoins": [
    {
      "id": number,
      "join_date": string,
      "name": string,
      "surname": string,
      "role": string,
      "department": string,
      "office": string
    }
  ]
}
```
