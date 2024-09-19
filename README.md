##

## Architecture

### Overview

This project was designed to leverage the flexibility of NextJS with Typescript while experimenting with a microservices-based architecture for the backend. 

### Frontend:

- The frontend is developed using NextJS


## Backend

### API Routing

The API routing in this project is handled by a dynamic route handler at /pages/api/[...routes].ts. This functions as a central dispatcher, routing requests based on the URL to their respective services.

It uses the route-matching function isInRoutes() to match the requested URL against pre-defined route patterns store in an object. If a match is found, it delegates the request to a specific service handler such as UserRequest, ProductRequest, etc.

### Request Handling

Each service request handler inherits from a base class RequestHandler, which encapsulates common functionality such as URL parsing, transction creation, and HTTP method handling (GET, POST, PUT, DELETE).

### Service Layer

The service layer is implemented using TypeORM to manage database interactions. For example, the UserService class extends from a base service class and provices methods to interact with the User entity. Database queries are abstracted awat by TypeORM, providing a clean and maintainable way to interact with the database.

