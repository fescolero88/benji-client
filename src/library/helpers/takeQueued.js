import { buffers } from 'redux-saga';
import { actionChannel, take, call } from 'redux-saga/effects';
export default function* takeQueued(pattern, worker) {
  const channel = yield actionChannel(pattern, buffers.expanding());
  try {
    while (true) { const action = yield take(channel); yield call(worker, action); }
  } finally { channel.close(); }
}
