# Todo Task Manager

(Made with Microsoft CoPilot)

## Overview
The Todo Task Manager is a full-stack application that allows users to manage their tasks efficiently. It features a .NET Core backend that serves a GraphQL API and a React frontend that provides a user-friendly interface. The project uses Docker Compose for easy multi-container orchestration, including SQL Server as the database.

## Project Structure

- **backend/**: .NET Core Web API (GraphQL)
- **frontend/**: React application
- **docker-compose.yml**: Multi-service orchestration (db, backend, frontend, migrate)

## Setup Instructions

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (if running frontend locally outside Docker)
- [.NET SDK 8.0](https://dotnet.microsoft.com/download) (if running backend locally outside Docker)

---

### Running the Application with Docker Compose

1. **Build and start all services:**
   ```sh
   docker-compose down -v
   docker-compose up --build
   ```

2. **Apply database migrations (if needed):**
   ```sh
   docker-compose run --rm migrate
   ```
   This will ensure the SQL Server database is created and up-to-date.

3. **Access the applications:**
   - **Frontend:** [http://localhost:3000](http://localhost:3000)
   - **Backend GraphQL Playground:** [http://localhost:5000/graphql](http://localhost:5000/graphql)
   - **SQL Server:** localhost:1433 (user: `sa`, password: `Your_password123`)

---

### Useful Docker Compose Services

- **db**: SQL Server 2022 container
- **backend**: .NET Core GraphQL API (listens on port 8080 in the container, mapped to 5000 on the host)
- **frontend**: React app (mapped to port 3000)
- **migrate**: Utility service for running Entity Framework Core migrations

---

### Running Migrations

If you make changes to your Entity Framework models or add migrations, run:

```sh
docker-compose run --rm migrate
```

This uses the SDK image and runs migrations inside the Docker network, so the backend can reach the database.

---

### Troubleshooting

- **Database connection errors:**  
  Make sure the `db` service is running and healthy.  
  Use `docker-compose logs db` to check status.

- **Backend not reachable:**  
  Ensure the backend is mapped to port 5000 (`"5000:8080"`) and is running (`docker-compose ps`).

- **Frontend fetch errors:**  
  Confirm the backend is up and accessible at [http://localhost:5000/graphql](http://localhost:5000/graphql).

- **Migrations not running:**  
  Make sure your `migrate` service in `docker-compose.yml` has the correct `working_dir` and uses the full path to `dotnet-ef`.

---

### Example GraphQL Query

```graphql
query {
  allTasks {
    id
    title
    description
    isCompleted
    createdAt
  }
}
```

---

## License

This project is licensed under the MIT License.