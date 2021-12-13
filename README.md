# Benji client

React 16 and Redux client for company and contractor workspaces.

## Setup

Use Node 22.12.0 and npm 10.9.0. Run npm ci, copy .env.example to .env, and set REACT_APP_API_URL to your backend. Run npm start to start the development server on port 3000.

Run npm run test:ci for the automated checks and npm run build for the production bundle. Production API URLs must use HTTPS. Serve build/ through a static host that redirects application routes to index.html.

The dependency tree uses legacy peer dependency resolution because some existing components target older React versions. Further React and UI package upgrades need separate compatibility testing.

## Uploads

Uploads require the backend signing endpoint described in docs/uploads.md. AWS credentials must never appear in browser configuration. Rotate any keys included in earlier deployed bundles.

## Scaling

See docs/scaling.md for remaining backend and performance work. The frontend tests do not establish backend capacity or deployment readiness.
