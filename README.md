# Books Review System

A robust RESTful API for managing books and their reviews, built with Node.js, Express, and MongoDB.

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
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create a new book
- `GET /api/books/:id` - Get a specific book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

#### Reviews
- `POST /api/reviews` - Create a new review
- `GET /api/books/:bookId/reviews` - Get all reviews for a book
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

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
npm test
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