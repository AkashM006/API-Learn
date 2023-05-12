# API Learning

This project's goal is to learn on how to use best practices when designing an API, and documentation. This project's folder structure is also one of them. It's also documented well using the swagger tool for express.

## Running the project

If you wish to run this project. The first step is to install [Node js](https://nodejs.org/en/download).

Once that is over, you would need to install the node modules used in this project. In order to do that copy and paste the following command in terminal that is openend in the project's root folder:

`npm install`

After that create a `.env` file in the root folder. This file must contain the following since it is used in the code

- PORT ( which indicates on which port the server runs on )

Once that's out of the way, now you are ready to start the server. To start the server run the following command:

`npm run dev`

With this you can see in the console that the server is running on the port specified in the `.env` file.

## View documentation for the API

Being a project that is an API, this project is well documented using the swagger tool for express.

It also runs on the same port as the project itself. In order to view the docs, start the project and visit the [docs](http://localhost:3000/api/v1/docs/).

Everything regarding the routes are written in the corresponding routes file. For eg. explanation for todo routes is in the file `todoRoutes.js`.

Similarly everything regarding the models are written in with their corresponding names in the `Database` folder.

## Dependencies

In order to build this project the following dependencies were used:

- Express js: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- dotenv: Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- swagger-jsdoc: This library reads your [JSDoc](https://jsdoc.app/)-annotated source code and generates an [OpenAPI (Swagger) specification](https://swagger.io/specification/).
- swagger-ui-express: This module allows you to serve auto-generated [swagger-ui](https://swagger.io/tools/swagger-ui/) generated API docs from express, based on a `swagger.json` file. The result is living documentation for your API hosted from your API server via a route.
- apicache: A simple API response caching middleware for Express/Node using plain-english durations.
- uuid: A simple package the generates unique ids which is used in this project to create todos with different ids.
