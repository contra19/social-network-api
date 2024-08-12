# Social Network API

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express.js](https://img.shields.io/badge/Express.js-v4.17.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.6-yellow)
![Mongoose](https://img.shields.io/badge/Mongoose-v5.12.3-red)
![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen)

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Models](#models)
  - [User](#user)
  - [Thought](#thought)
  - [Reaction](#reaction)
- [Demo Video](#demo-video)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Questions](#questions)

## Description

The Social Network API is a RESTful API built using Node.js, Express, and MongoDB. It allows users to create and manage accounts, post thoughts, react to other users' thoughts, and manage a list of friends. This API is designed to handle large amounts of unstructured data efficiently, leveraging the flexibility of a NoSQL database (MongoDB).

## Features

- Create, update, and delete user accounts
- Post thoughts and reactions
- Add and remove friends from a user's friend list
- Fully documented API routes for interaction
- Schema validation using Mongoose models

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/contra19/social-network-api.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd social-network-api
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up MongoDB:**

    Ensure you have MongoDB installed and running locally on your machine. If you're using MongoDB Atlas, update the connection string in the `server.js` file.

5. **Seed the database (optional):**

    If you want to seed the database with some initial data for testing, run the seed script:

    ```bash
    node seed.js
    ```

6. **Start the server:**

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:3001`.

## Usage

After starting the server, you can use tools like Insomnia or Postman to interact with the API. Below are some example requests you can make.

## API Endpoints

### Users

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:userId` - Get a single user by ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/:userId` - Update a user by ID
- **DELETE** `/api/users/:userId` - Delete a user by ID (and associated thoughts)
- **POST** `/api/users/:userId/friends/:friendId` - Add a friend
- **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend

### Thoughts

- **GET** `/api/thoughts` - Get all thoughts
- **GET** `/api/thoughts/:thoughtId` - Get a single thought by ID
- **POST** `/api/thoughts` - Create a new thought
- **PUT** `/api/thoughts/:thoughtId` - Update a thought by ID
- **DELETE** `/api/thoughts/:thoughtId` - Delete a thought by ID
- **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction by ID

## Models

### User

The `User` model includes the following fields:

- `username`: String, unique, required, trimmed
- `email`: String, required, unique, validated
- `thoughts`: Array of `_id` references to `Thought`
- `friends`: Array of `_id` references to `User`

Virtuals:
- `friendCount`: Returns the number of friends the user has.

### Thought

The `Thought` model includes the following fields:

- `thoughtText`: String, required, min length 1, max length 280
- `createdAt`: Date, default value to the current timestamp, formatted using a getter method
- `username`: String, required
- `reactions`: Array of `reactionSchema`

Virtuals:
- `reactionCount`: Returns the number of reactions.

### Reaction

The `Reaction` schema includes the following fields:

- `reactionId`: ObjectId, default value set to a new ObjectId
- `reactionBody`: String, required, max length 280
- `username`: String, required
- `createdAt`: Date, default value to the current timestamp, formatted using a getter method

## Demo Video

Watch the demo video to see the Social Network API in action: [Demo Video](https://drive.google.com/file/d/1Fx3M9lcmupXIWta33atWyiE3yt3L2bXd/view?usp=drive_link)

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling tool
- **Insomnia/Postman**: API testing tools

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

I would like to express my gratitude to the following resources and communities who have contributed to the development of this project:

- **[Node.js](https://nodejs.org/)** - For providing the runtime environment for server-side JavaScript.
- **[Express.js](https://expressjs.com/)** - For offering a flexible and minimal web application framework.
- **[MongoDB](https://www.mongodb.com/)** - For delivering a powerful and scalable NoSQL database solution.
- **[Mongoose](https://mongoosejs.com/)** - For simplifying data modeling and validation with MongoDB.
- **[OpenAI's ChatGPT](https://www.openai.com/)** - For assisting with the code development and documentation process.

Special thanks to everyone who has provided feedback and support throughout the development of this project.

## Questions

If you have any questions about the project, please contact me at [email](mailto:contra19@gmail.com) or look me up on GitHub at [contra19](https://github.com/contra19).

