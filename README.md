# Workwise Backend

Workwise Backend is the backend application for the Workwise project. It provides the necessary APIs and services to support the Workwise web and mobile applications.

## Table of Contents

- [Workwise Backend](#workwise-backend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)

## Features

- **Express.js Server**: Built with Express.js, a fast, unopinionated, minimalist web framework for Node.js.
- **Database Integration**: Seamlessly integrates with PostgreSQL database using `pg` and `pg-hstore` libraries.
- **Validation**: Uses `express-validator` for request validation, ensuring data integrity and security.
- **Authentication**: Implements Firebase Authentication for user authentication and authorization.
- **Query Building**: Utilizes `kysely` as a query builder for simple and efficient database interaction.
- **Error Handling**: Centralized error handling with Express middleware for consistent error responses.
- **Cross-Origin Resource Sharing (CORS)**: Configured with CORS middleware to enable secure cross-origin requests.
- **Environment Variables**: Uses `dotenv` for managing environment variables, ensuring easy configuration across different environments.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Firebase Admin SDK
- Kysely
- Express Validator
- Dotenv

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/workwise-backend.git
   cd workwise-backend
   ```
