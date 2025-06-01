# Todo Task Manager

## Overview
The Todo Task Manager is a full-stack application that allows users to manage their tasks efficiently. It features a .NET Core backend that serves a GraphQL API and a React frontend that provides a user-friendly interface.

## Project Structure
The project is organized into two main directories: `backend` and `frontend`.

### Backend
- **TodoApi.sln**: Solution file for the .NET Core backend application.
- **TodoApi**: Contains the main application code.
  - **Controllers**: Handles HTTP requests and responses.
  - **GraphQL**: Contains GraphQL queries, mutations, and schema definitions.
  - **Models**: Represents the data structure of todo items.
  - **Program.cs**: Entry point of the application.
  - **Startup.cs**: Configures services and the request pipeline.

### Frontend
- **src**: Contains the React application code.
  - **components**: React components for the user interface.
  - **graphql**: GraphQL queries and mutations for backend communication.
  - **App.tsx**: Main component that sets up routing and layout.
  - **index.tsx**: Entry point that renders the App component.
- **public**: Static assets for the React application.
- **package.json**: Configuration file for npm dependencies and scripts.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Restore the dependencies:
   ```
   dotnet restore
   ```
3. Run the application:
   ```
   dotnet run
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Docker
To run the application using Docker, use the following command in the root directory:
```
docker-compose up
```

## License
This project is licensed under the MIT License.