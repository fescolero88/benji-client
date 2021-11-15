import { take, fork, cancel, cancelled } from 'redux-saga/effects';
export default function* takeLatestByKey(pattern, worker, keyFor) {
  const tasks = new Map();
  function* run(action, key) {
    try { yield* worker(action); }
    finally { if (!(yield cancelled())) tasks.delete(key); }
  }
  try {
    while (true) {
      const action = yield take(pattern);
      const key = keyFor(action);
      const previous = tasks.get(key);
      if (previous && previous.isRunning()) yield cancel(previous);
      const task = yield fork(run, action, key);
      if (task.isRunning()) tasks.set(key, task);
    }
  } finally { for (const task of tasks.values()) yield cancel(task); }
}
