# Books Review System

A robust RESTful API for managing books and their reviews, built with Node.js, Express, and MongoDB.

## 🌐 Live Demo

The API is deployed and available at: [https://books-review-system.onrender.com](https://books-review-system.onrender.com)

## 🎥 Video Presentation

[![Books Review System Demo]](https://drive.google.com/file/d/1rCKPSBnJPIZS5doqN5oPhz0spd_I4wC6/view?usp=sharing)

Watch our video presentation to see the Books Review System in action:
- API Overview and Features
- Authentication Flow
- Book Management Demo
- Review System Walkthrough
- API Documentation Tour

## 🚀 Features

- User authentication and authorization
- Book management (CRUD operations)
- Review system with ratings and comments
- RESTful API design
- Swagger API documentation
- MongoDB database integration
- JWT-based authentication

## 🛠️ Tech Stack

- **Backend Framework:** Node.js with Express
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **API Documentation:** Swagger/OpenAPI
- **Development:** Nodemon for hot-reloading

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imlnr/books-review-system.git
   cd books-review-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm run server
   ```

## 📚 API Documentation

The API documentation is available at `/api-docs` when the server is running.

### Available Endpoints

#### Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login user

#### Books
- `GET /allBooks` - Get all books
- `POST /books` - Create a new book
- `GET /books/:id` - Get a specific book
- `GET /books/search` - Search book by title or author

#### Reviews
- `POST /review` - Create a new review
- `PATCH /review/:id` - Update a review
- `DELETE /review/:id` - Delete a review

## 📊 Database Schema

### User Schema
```javascript
{
    name: String (required),
    email: String (required, unique),
    password: String (required),
    timestamps: true
}
```

### Book Schema
```javascript
{
    title: String (required),
    author: String (required),
    genre: String,
    publishedYear: Number,
    description: String,
    createdBy: ObjectId (ref: 'User'),
    timestamps: true
}
```

### Review Schema
```javascript
{
    book: ObjectId (ref: 'Book', required),
    user: ObjectId (ref: 'User', required),
    rating: Number (required, min: 1, max: 5),
    comment: String,
    timestamps: true
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## 🧪 Running Tests

```bash
npm run server
```

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Contact

For any queries or support, please open an issue in the GitHub repository.

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the powerful database
- All contributors who have helped shape this project
