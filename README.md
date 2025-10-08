# Samaki Express EA Ltd

A web application for an aquaculture company providing fish farming products and services.

## Description

Samaki Express EA Ltd is a leading aquaculture company dedicated to transforming fish farming in Kenya and beyond. This web application serves as their online platform for showcasing products, team, and contact information, with user authentication features.

## Features

- User registration and login
- Product catalog display
- Team member profiles
- Contact form
- Responsive design
- Secure authentication with CSRF protection and rate limiting

## Technologies Used

- PHP
- MySQL
- HTML5
- CSS3
- JavaScript
- PDO for database interactions

## Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd Samakiexpress
   ```

2. Set up a local web server with PHP and MySQL (e.g., XAMPP, WAMP, or MAMP).

3. Create a database named `samaki_express` and import the `samaki_db.sql` file.

4. Update the database credentials in `config.php` if necessary.

5. Place the project files in your web server's document root (e.g., htdocs for XAMPP).

6. Access the application at `http://localhost/Samakiexpress` (adjust path as needed).

## Usage

- Visit the homepage to explore the company information, products, and team.
- Register a new account or log in to access additional features.
- Browse products and contact the company via the contact form.

## Database Schema

The database schema is provided in `samaki_db.sql`. It includes tables for users and potentially products.

## Contributing

Contributions are welcome. Please ensure to follow the existing code style and add tests for new features.

## License

This project is licensed under the MIT License.