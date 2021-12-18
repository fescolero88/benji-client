# Remaining scaling work

## Data volume

Network list endpoints currently return arrays and the client expects them. Agree on cursor pagination with the backend before changing those payloads. Return bounded pages, stable sort order, and a next cursor. Add explicit load-more or page navigation, then virtualize lists if measurement shows rendering cost. Do not silently truncate existing arrays.

## Request load

Dashboard badge requests refresh once per minute while visible, rather than on every navigation. Account board requests cancel stale responses, with job status requests isolated by account and status. Measure request volume and freshness before adjusting the interval. Consider an aggregate badge endpoint.

## Writes and sessions

Job and company mutation watchers queue requests by action type to preserve responses. Different mutation types can still overlap. The backend should enforce optimistic concurrency and idempotency where needed. Logout clears account state and cancels application sagas; server-side token revocation remains backend work. Tokens remain persisted locally, so a cookie-based session migration requires server support.

## Capacity and release checks

Profile large representative accounts, record bundle size and route load times, and measure API latency and error rates. Load-test the backend against expected users and workflows. Verify signing, signup uploads, login, logout, job editing, and navigation against a staging backend before release. Test that environment URLs target the intended system.

Modernizing the React major version, upgrading UI dependencies, and fixing existing lint warnings remain separate work. Passing the client build is not a security audit of its dependency tree.
