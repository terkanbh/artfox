# ArtFox

This project is a web application for online art sales. It's purpose is to be run and tested locally.

## Key Features

- **CRUD Functionality**: On artworks, orders, and cart items.

- **JWT Authentication**: Implements JWT authentication to safeguard admin access.

- **Admin Functionality**: Navigate to /login in order to use. Navigating to /admin without authentication redirects to /login. The links are not exposed for security reasons.

- **Cookies**: Utilizes cookies to manage user carts.

- **Email**: Supports email communication via contact and order confirmation email. Note: Email credentials need to be setup in appSettings.json in order to enable this functionality.

- **EcontApi**: Integrates with the EcontApi to fetch delivery offices.

- **In-Memory Database**: Utilizes an in-memory database setup, streamlining project setup and testing processes.

- **No User Management**: Users place orders without the need for registration.

## Dependencies

1. **Node and npm**:
   - Node: `>= 20.11.1`
   - npm: `>= 10.2.4`
   
2. **React & Tooling**  
   - React / React-DOM: `^18.x`  
   - Vite: `^5.x` (development server & build tool)
   - @vitejs/plugin-react: `^4.x` (JSX/TSX transformation) 

3. **.NET SDK**:
   - .NET SDK: `>= 8.0.0`

## Getting started

1. ```git clone https://github.com/terkanbh/artfox``` in desired directory.
2. ```dotnet run``` in Web project.
3. ```npm install``` in Frontend project.
4. ```npm run dev``` in Frontend project.
