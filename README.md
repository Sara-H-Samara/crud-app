# CRUD App

A full-stack User Management application built with **Angular**, **Spring Boot**, and **PostgreSQL**.

The application provides a REST API for managing users and an Angular frontend for interacting with the API.

## Technologies

### Backend

* Java 21
* Spring Boot
* Spring Web
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven

### Frontend

* Angular
* TypeScript
* HTML
* CSS
* Angular HttpClient

## Features

The application supports the complete CRUD operations:

* Create a user
* View all users
* View a user by ID
* Update a user
* Delete a user

Each user contains:

* ID
* Name
* Email

## Architecture

The application follows a layered architecture:

```text
Angular Frontend
       ↓
   HTTP / JSON
       ↓
Spring Boot REST API
       ↓
    Controller
       ↓
     Service
       ↓
    Repository
       ↓
  JPA / Hibernate
       ↓
   PostgreSQL
```

## Project Structure

```text
crud-app/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/crud_app/
│   │   │   │       ├── controller/
│   │   │   │       ├── entity/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── CrudAppApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   │
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
├── .gitignore
└── README.md
```

## REST API Endpoints

| Operation      | Method | Endpoint          |
| -------------- | ------ | ----------------- |
| Create user    | POST   | `/api/users`      |
| Get all users  | GET    | `/api/users`      |
| Get user by ID | GET    | `/api/users/{id}` |
| Update user    | PUT    | `/api/users/{id}` |
| Delete user    | DELETE | `/api/users/{id}` |

### Example Request

Create a user:

```http
POST /api/users
Content-Type: application/json
```

```json
{
  "name": "Sara",
  "email": "sara@gmail.com"
}
```

## Database

The backend uses **PostgreSQL** as the database.

Database configuration is stored in:

```text
backend/src/main/resources/application.properties
```

The database password is provided through the `DB_PASSWORD` environment variable and is not stored in the repository.

## Running the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

## Running the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
npm start
```

The frontend runs on:

```text
http://localhost:4200
```

## Application Flow

When a user interacts with the Angular application:

```text
User
 ↓
Angular UI
 ↓
Angular UserService
 ↓
HTTP Request
 ↓
Spring Boot Controller
 ↓
UserService
 ↓
UserRepository
 ↓
PostgreSQL
```

The response follows the same path back to the Angular frontend and is displayed to the user.

## Future Improvements

Possible improvements include:

* Form validation
* Better error handling
* Loading indicators
* User confirmation dialogs
* Pagination
* Search and filtering
* Authentication and authorization
* Deployment
