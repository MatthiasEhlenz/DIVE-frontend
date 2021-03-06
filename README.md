
# DIVE-frontend (dive-frontend)

> DIVE Frontend Codebase

## Installing packages
1. Run `yarn install`
2. If you receive a Sass compile error Run `yarn add node-sass`


## Running your project

The generated project includes a development server on port `3003`, which will rebuild the app whenever you change application code. To start the server, run:

```bash
$ yarn start
```

To run the server with the dev-tools enabled, run:

```bash
$ export API_URL=http://localhost:8081
$ export NODE_ENV=DEVELOPMENT
$ npm build
$ DEBUG=true npm start
```

To build for production, this command will output optimized production code:

```bash
$ yarn build
```
