# CRUD App

A full-stack User Management application built with **Angular**, **Spring Boot**, and **PostgreSQL**.

The application provides a REST API for managing users and an Angular frontend for interacting with the API. The frontend also includes a small **Mini Shop** page that practices Angular components and data binding.

## Technologies

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven

### Frontend

- Angular
- TypeScript
- HTML
- CSS (shared design with CSS variables)
- Angular HttpClient
- Angular control flow (`@if`, `@else`, `@for`)
- Template-driven forms (`ngModel`)

## Features

### Users (CRUD)

The application supports the complete CRUD operations:

- Create a user
- View all users
- View a user by ID
- Update a user
- Delete a user

Each user contains:

- ID
- Name
- Email

### Mini Shop (frontend demo)

A small page that practices Angular fundamentals. It uses sample data and does not call the backend.

- Products load in `ngOnInit` with a simulated delay and a loading message
- Quantity buttons for each product (the quantity never goes below 0)
- Show / hide product details (toggle)
- Cart panel with a calculated total and a checkout message
- Login box with a show / hide password toggle
- Reviews added from a template reference variable

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
│   │   ├── app/
│   │   │   ├── features/
│   │   │   │   ├── users/
│   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── user-form/
│   │   │   │   │   │   ├── user-list/
│   │   │   │   │   │   └── users-page/
│   │   │   │   │   ├── models/
│   │   │   │   │   └── services/
│   │   │   │   └── shop/
│   │   │   │       ├── components/
│   │   │   │       │   └── shop-page/
│   │   │   │       └── models/
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   └── app.css
│   │   └── styles.css
│   ├── package.json
│   └── angular.json
│
├── .gitignore
└── README.md
```

### Frontend organization

- The frontend is organized **by feature**: each feature keeps its own components, models, and services.
- A page component (for example `users-page`) owns the data and uses smaller child components.
- `src/styles.css` contains the shared design (colors, radius, shadow, buttons, inputs, cards) as CSS variables, so all pages look the same.
- `app.html` switches between the Users page and the Mini Shop page.

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

- Form validation
- Better error handling
- Loading indicators in the users page
- User confirmation dialogs
- Pagination
- Search and filtering
- Authentication and authorization
- Splitting the shop into child components with `@Input` and `@Output`
- Deployment
