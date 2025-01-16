**Blog Platform Back-End**

This project is the back-end for the Blog Platform, built using Node.js and Express. This README will guide you through the project setup, how to run it locally, and the structure of the API endpoints.


**Project Setup and Running Locally**

Prerequisites
Node.js (version 14 or higher)
npm (Node Package Manager)

Installation
1. Clone the repository:

   git clone https://github.com/hanrepo1/be-base-app.git

2. Navigate to the project directory:

   cd blog-platform-back

3. Install dependencies:

   npm install


Running the Application
1. Start the server:

   npm run dev

**API Endpoints**

- Register User

  - POST /api/auth/register

- Login

  - POST /api/auth/login

- User Profile

  - GET /api/user/:id

- Create Todo

  - POST /api/todo/

- Get Items

  - GET /api/todo/?page=&limit=
 
- Get Item Detail

  - POST : api/todo/:id
    
- Edit Item Detail

  - PUT : api/todo/:id
 
- Delete Item

  - DELETE : api/todo/:id


**Assumptions and Design Decisions**

Authentication: JWT (JSON Web Tokens) is used for user authentication to secure the API endpoints.

Error Handling: The API includes basic error handling to provide meaningful responses in case of failures.

Data Validation: Input data is validated to ensure that only valid data is processed.

Modular Structure: The code is organized in a modular fashion to enhance maintainability and scalability.
