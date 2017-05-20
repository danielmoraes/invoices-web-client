# Invoices Web Client

A React web client for [invoices](https://github.com/reinert/invoices).

## Requirements

* [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and
  [Docker](https://www.docker.com/).

## Quick start

Clone this repo and run `npm install` to install the required dependencies.

### Development mode

1. Run the fake backend server.

        cd fake-backend-server
        npm install
        npm start

2. Run the app in development mode (from the root directory).

        npm start

3. Open [http://localhost:3004](http://localhost:3004) to view it in the browser.

The page will reload if you make edits and the
[redux dev tools](https://github.com/zalmoxisus/redux-devtools-extension)
browser extension can be used to debug the redux state.

### Serving in production with NGINX and Docker

1. Make sure the [invoices backend server](https://github.com/reinert/invoices) is up and running.

2. Build the app for production.

        npm run build

    The build is minified and the assets include the hashes.

3. Create the docker image.

        docker build --tag invoices .

4. Run the app with it.

        docker run --name invoices -p 80:80 -v $(pwd)/public:/usr/share/nginx/html:ro -d invoices

5. Open [http://localhost](http://localhost) to view it in the browser.

## Tests

Run all tests.

    npm test

## License

MIT license. See the LICENSE file for details.
