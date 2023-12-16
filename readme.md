# My Express TypeScript App

This is a basic template for a Node.js Express application using TypeScript. It's designed to help you quickly set up a project and start building your application.

## Features

- Express server with TypeScript
- MongoDB integration with Mongoose
- User authentication using bcrypt and JSON Web Tokens (JWT)
- Express session handling with connect-mongo
- Dotenv for environment variable management
- Express-async-handler for handling asynchronous errors

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ArinPrajapati/my-express-typescript-app.git
   ```

2. Install dependencies:

   ```bash
   cd my-express-typescript-app
   npm install   # or yarn
   ```

3. Start the development server:

   ```bash
   npm run Start    # or yarn Start
   ```

   This command uses `nodemon` to watch for changes and automatically restarts the server.

4. Open your browser and visit [http://localhost:3000/api](http://localhost:3000/api). You should see a sample JSON response.

## Project Structure

- `src/controllers`: Contains controllers handling route logic.
- `src/routes`: Defines Express routes and links them to controllers.
- `src/index.ts`: Main application file, setting up Express server and middleware.
- `src/middleware/`: Folder for custom middleware modules.
- `src/models/`: Folder for data models.
- `src/config/`: Configuration files for the application.
- `src/utils/types.ts`: TypeScript types and interfaces used throughout the project.

## Scripts

- `npm start`: Builds TypeScript files and starts the server.
- `npm run dev`: Runs the server in development mode with automatic restarts.

## Contributing

Feel free to contribute and improve this template. Create a fork, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
