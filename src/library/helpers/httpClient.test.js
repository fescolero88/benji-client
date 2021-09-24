import { CANCEL } from 'redux-saga';
jest.mock('@iso/config/jwt.config', () => ({apiUrl:'https://api.example.com'}));
jest.mock('@iso/redux/store', () => ({store:{getState:()=>({Auth:{token:{access:'token'}}})}}));
import request from './httpClient';
afterEach(() => { jest.useRealTimers(); delete global.fetch; });
test('attaches auth and supports saga cancellation', async () => {
  let signal;
  global.fetch = jest.fn((url, options) => { signal=options.signal; return Promise.resolve({status:204,ok:true}); });
  const pending = request('/items/');
  pending[CANCEL]();
  expect(signal.aborted).toBe(true);
  expect(global.fetch.mock.calls[0][1].headers.Authorization).toBe('Bearer token');
  await pending;
});
test('aborts stalled requests after thirty seconds', () => {
  jest.useFakeTimers();
  global.fetch = jest.fn(() => new Promise(() => {}));
  request('/items/');
  jest.advanceTimersByTime(30000);
  expect(global.fetch.mock.calls[0][1].signal.aborted).toBe(true);
});
