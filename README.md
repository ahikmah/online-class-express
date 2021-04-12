# Online Class Rest API

This service is arranged into resources, such as users and course. This is part of __Online Class React__, which is an online based educational application. Each resource can be operated on by using different HTTP methods such as such as GET, POST, PATCH, and DELETE. You can see the ERD [here](https://my.vertabelo.com/public-model-view/9QuWiZPfHo80MJ9cFJVNhE9beHGjt9tQsgqbJAMRxep1GhTktgeLiag3n1u5jcdc?x=3879&y=3889&zoom=0.5954).

### Requirements

-   [Node JS](https://nodejs.org/en/)
-   [Express JS](https://expressjs.com/)
-   [My SQL](https://www.mysql.com/)
-   [Json Web Token](https://www.npmjs.com/package/jsonwebtoken)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Multer](https://www.npmjs.com/package/multer)


### Getting Started
-   Clone this repository
-   `npm install` to install all required dependencies
-   Set up Environment variables and then save in an .env file
```env
PORT=8000
DB_HOST="HOST"
DB_USER="YOUR_USER"
DB_PASSWORD="YOUR_PASSWORD"
DB_NAME="YOUR_DATABASE"

SECRET_KEY="YOUR_SECRET_KEY"
EXPIRE=20000
ISSUER="YOUR_ISSUER"
```
-   `npm start` to start the local server


### API Documentation
[Online Class API](https://documenter.getpostman.com/view/9963360/TzCTa5fc)
