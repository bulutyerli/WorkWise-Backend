# Work Wise Backend

This is the backend component of the Work Wise web application, designed to facilitate the functionality of the application's server-side operations.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL

## Installation

1. **Clone the repository:**

   ```
   git clone <repository_url>
   ```

2. **Navigate to the project directory:**

   ```
   cd WorkWise-Backend
   ```

3. **Install dependencies:**

   ```
   npm install
   ```

4. **Set up PostgreSQL database:**

   - Create a PostgreSQL database.
   - Update the database configuration in the `.env` file.
   - Run database migrations and seeders.

## Configuration

The following environment variables need to be configured:

- `PORT`: Port on which the server will run.
- `DB_HOST`: Hostname of the PostgreSQL database.
- `DB_USER`: Username for connecting to the PostgreSQL database.
- `DB_PASSWORD`: Password for connecting to the PostgreSQL database.
- `DB_PORT`: Port of the PostgreSQL database.
- Other necessary environment variables.

Create a `.env` file in the root directory and define these variables.

Example `.env` file:

PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_PORT=5432

## License

This project is licensed under the [MIT License](LICENSE).
