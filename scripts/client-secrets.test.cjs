const test = require('node:test');
const assert = require('node:assert/strict');
const { stripClientSecrets } = require('./client-secrets.cjs');

test('keeps AWS credentials out of the environment embedded by webpack', () => {
  const environment = {
    NODE_ENV: 'production',
    REACT_APP_API_URL: 'https://api.example.com',
    REACT_APP_S3_BUCKET_PROFILE_DIRNAME: 'profiles',
    REACT_APP_S3_BUCKET_ACCESS_KEY_ID: 'test-access-key',
    REACT_APP_S3_BUCKET_SECRET_ACCESS_KEY: 'test-secret',
  };
  const config = { plugins: [{ definitions: { 'process.env': environment } }, {}] };
  stripClientSecrets(config);
  assert.equal(environment.REACT_APP_S3_BUCKET_ACCESS_KEY_ID, undefined);
  assert.equal(environment.REACT_APP_S3_BUCKET_SECRET_ACCESS_KEY, undefined);
  assert.equal(environment.REACT_APP_API_URL, 'https://api.example.com');
  assert.equal(environment.REACT_APP_S3_BUCKET_PROFILE_DIRNAME, 'profiles');
});
