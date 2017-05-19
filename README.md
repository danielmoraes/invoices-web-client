# Invoices Web Client

A React web client for [invoices](https://github.com/reinert/invoices).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3004](http://localhost:3004) to view it in the browser.

The page will reload if you make edits.

### `npm run dev`

Similar to `npm start`, but with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard) plugin.

### `npm run build`

Builds the app for production to the `public` folder.

The build is minified and the filenames include the hashes.

## Deployment with Nginx and Docker

After building the app for production, use:

```
docker build --tag invoices .
docker run --name invoices -p 80:80 -v $(pwd)/public:/usr/share/nginx/html:ro -d invoices
```
