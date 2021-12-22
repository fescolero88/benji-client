import { runSaga, stdChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import takeLatestByKey from './takeLatestByKey';

test('replaces the same filter and preserves requests for other filters', async () => {
  const channel = stdChannel();
  const pending = [];
  function* worker(action) {
    const promise = new Promise(() => {});
    promise[CANCEL] = jest.fn();
    pending.push({ key: action.key, promise });
    yield call(() => promise);
  }
  const task = runSaga({ channel }, takeLatestByKey, 'FETCH', worker, action => action.key);
  channel.put({ type: 'FETCH', key: 'pending' });
  channel.put({ type: 'FETCH', key: 'accepted' });
  channel.put({ type: 'FETCH', key: 'pending' });
  expect(pending[0].promise[CANCEL]).toHaveBeenCalledTimes(1);
  expect(pending[1].promise[CANCEL]).not.toHaveBeenCalled();
  task.cancel();
  await task.toPromise();
  expect(pending[1].promise[CANCEL]).toHaveBeenCalledTimes(1);
  expect(pending[2].promise[CANCEL]).toHaveBeenCalledTimes(1);
});
