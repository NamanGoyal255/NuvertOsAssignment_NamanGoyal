## Backend - Express + Prisma + MySQL + JWT
This is the backend server for a full-stack application built using Express.js, Prisma ORM, MySQL, and JWT Authentication. It offers secure user authentication, CRUD operations, and RESTful API endpoints.
## Tech Stack
- Backend Framework: Node.js + Express.js
- Database: MySQL
- ORM: Prisma
- Authentication: JWT (JSON Web Tokens)
- Security: bcrypt for password hashing
- Config Management: dotenv
- API Testing: Postman 
## Setup Instructions
### 1. Install Dependencies
```npm install```
### 2. Create .env File
```DATABASE_URL="mysql://root:Naman@3246@localhost:3306/compounds"
SECRET_KEY="hdfuefbivwnrwknefi318y489tu849997582e474595_9bjv"
PORT=3000```
### 3. Prisma Setup
```npx prisma init
npx prisma migrate dev --name init
npx prisma generate```
### 4. Start the Server
```npm start```



