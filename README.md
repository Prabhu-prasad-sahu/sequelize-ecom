
# Sequelize_Ecommerce

The E-commerce project is a web application built using the Express.js framework as the backend, PostgreSQL as the database, and various tools and technologies for authentication and testing. The main focus of the project is to create a fully functional E-commerce platform that allows users to browse products, add items to their cart, and complete orders securely.

# Key components of the project:
# Express.js Backend:
The project's backend is developed using Express.js, a popular Node.js framework. Express.js provides a robust foundation for handling HTTP requests, routing, and middleware.

# PostgreSQL Database:
To store and manage product data, user information, and order details, the project utilizes PostgreSQL, a powerful open-source relational database management system.

# Authentication with JWT:
User authentication is implemented using JSON Web Tokens (JWT). Upon successful login, users are provided with a JWT, which is used to authenticate and authorize their subsequent requests.

# Cookies:
To maintain user sessions and store authentication tokens securely, the project employs cookies. Cookies are used to persist the JWT on the client-side, providing a smoother user experience.

# Sequelize:
Sequelize is used as an Object-Relational Mapping (ORM) tool to interact with the PostgreSQL database. It simplifies database operations by allowing developers to work with JavaScript objects instead of raw SQL queries.

# Postman:
Postman is utilized for testing the various API endpoints. It helps in manually testing the API functionality and ensuring that all the routes and data flow are working as expected.

# Key features of the E-commerce project:
# User Registration and Login:
Users can register by providing necessary details, and existing users can log in using their credentials. Passwords are securely hashed before being stored in the database.

# Product Listings:
The platform displays a list of products available for purchase. Each product includes details like name, description, price, and images.

# Shopping Cart:
Logged-in users can add products to their shopping cart. The cart keeps track of selected items and their quantities.

# Order Placement:
Once users have added items to their cart, they can proceed to the checkout and place an order. Order details are recorded, and the cart is cleared after successful order placement.

# User Authentication and Authorization:
Protected routes are implemented to ensure that certain functionalities (e.g., placing orders) are only accessible to authenticated users with valid JWT tokens.

# User Profile:
Users can view and manage their profiles, including order history, personal information, and password changes.

# Testing with Postman:
The API endpoints are thoroughly tested using Postman to ensure their correctness and proper functioning.


By combining Express, PostgreSQL, Sequelize, JWT, and cookies, this e-commerce project ensures secure authentication and smooth interactions between the client and server. It provides a robust foundation for building a scalable and user-friendly e-commerce platform.
