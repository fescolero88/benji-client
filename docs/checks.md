# Client checks

Run these checks locally before publishing a change:

1. Install dependencies with npm ci.
2. Run npm run test:ci.
3. Set REACT_APP_API_URL to an HTTPS API URL and run npm run build.

The build also scans generated JavaScript for configured AWS credentials.
Review build warnings and verify the changed screens against your backend.
This project does not include a GitHub Actions workflow.
