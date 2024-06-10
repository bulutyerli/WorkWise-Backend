# API Endpoints

## Income Routes

### Get Income By ID

- **URL**: `/api/v1/income/:id`
- - **Method**: GET
- - **Description**: Gets income data by ID.
- - **Authorization**: Requires registered user privileges.
- **Request URL Parameters**:
  - `id`: 123
- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
        {
      "success": true,
      "data": {
        "id": number,
        "user_id": number,
        "created_at": "YYYY-MM-DDTHH:mm:ss.SSS Z",
        "description": string,
        "amount": number,
        "date": "YYYY-MM-DDTHH:mm:ss.SSS Z",
        "category": number
        }
      }
    ```

- **Example**:
  ```bash
  curl -X GET "http://localhost:8080/api/v1/income/123"
  ```

### Get All Income

- **URL**: `/api/v1/income`
- - **Method**: GET
- - **Description**: Retrieves a paginated list of all income with optional filtering and sorting capabilities.
- - **Authorization**: Requires registered user privileges.
- **Request Parameters**:

  - `page` (optional, number): The current page number. Defaults to 1.
  - `limit` (optional, number): The number of income to retrieve per page. Defaults to 15.
  - `category` (optional, number): Filter income by a specific category ID.
  - `order` (optional, string): The field to sort by (requires direction parameter). Options include "description", "amount", or "date".
  - `Direction` (optional, string): The sorting direction (requires order parameter). Options include "asc" or "desc".

- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
        {
        "success": true,
        "totalPages": number, // Total number of pages available
        "categories": array, // Array of all income categories
        "hasMore": boolean, // Flag indicating if there are more pages
        "data": array // Array of income objects
      }
    ```
    - **data**: Array of income objects containing the following properties:

  * `id`: number (Income ID)
  * `description`: string (Income description)
  * `amount`: number (Income amount)
  * `date`: string (Income date)
  * `category`: string (Income category name)
  * `category_id`: number (Income category ID)

- **Example**:

```bash
curl -X GET "http://localhost:8080/api/v1/income?page=2&limit=10"
```

### Get All Income Total

- **URL**: `/api/v1/income-total`
- - **Method**: GET
- - **Description**: Retrieves the total amount spent for each year.
- - **Authorization**: Requires registered user privileges.

- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
         {
        "success": true,
        "data": [
          {
            "year": number,
            "amount": number
          },
          {
            "year": number,
            "amount": number
          },
          // ... (other years)
        ]
      }
    ```

- **Example**:

```bash
curl -X GET "http://localhost:8080/api/v1/income-total"
```

### Get Income By Category

- **URL**: `/api/v1/income-category`
- - **Method**: GET
- - **Description**: Retrieves a list of income belonging to a specific category.
- - **Authorization**: Requires registered user privileges.
- **Request Parameters**:

  - `category` (optional, number): The category ID to filter by. Defaults to "1" if not provided.

- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
        {
        "success": true,
        "data": {
          "valuesData": array,
          "categoryData": object
        }
      }
    ```

  - - **valuesData**: Array of income objects containing the following properties:
      - `id`: number (Income ID) (may be null)
      - `category`: string (Income category name) (may be null)
      - `year`: unknown (Year of the income) (data type might be unexpected)
      - `amount`: number (Income amount)

  - - **categoryData**: Object containing information about the filtered category:

      - `id`: number (Category ID)
      - `category`: string (Category name)

- **Example**:

```bash
curl -X GET "http://localhost:8080/api/v1/income-category?category=5"
```

### Get income By Year

- **URL**: `/api/v1/income-year`
- - **Method**: GET
- - **Description**: Retrieves a list of income incurred in a particular year.
- - **Authorization**: Requires registered user privileges.
- **Request Parameters**:

  - `year` (optional, string): The year to filter by. Defaults to "2023" if not provided.

- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
    {
      "success": true,
      "data": {
        "id": 12,
        "category": 1,
        "year": 2023,
        "amount": 20000
      }
    }
    ```

- **Example**:

```bash
curl -X GET "http://localhost:8080/api/v1/income-year?year=2024"
```

### Get income By Month

- **URL**: `/api/v1/income-month`
- - **Method**: GET
- - **Description**: Retrieves a breakdown of income by month within a specified year and category.
- - **Authorization**: Requires registered user privileges.
- **Request Parameters**:

  - `year` (optional, string): The year to filter by. Defaults to "2023" if not provided.
  - `category` (optional, number): The category ID to filter by. Defaults to 1 if not provided.

- **Response**:

  - Status: 200 OK
  - Body:
  - ```json
    {
      "success": true,
      "data": [
        {
          "amount": 1000.0,
          "id": 3,
          "category": "Category Name",
          "year": 2024,
          "month": 6
        }
      ]
    }
    ```

- **Example**:

```bash
curl -X GET "http://localhost:8080/api/v1/income-month?year=2024&category=2"
```
