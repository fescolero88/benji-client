import { runSaga, stdChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import takeQueued from './takeQueued';
test('processes rapid mutations in order without losing a response', async () => {
  const channel=stdChannel(), seen=[];
  let release;
  const blocked=new Promise(resolve=>{release=resolve;});
  function* worker(action) { if(action.id===1) yield call(()=>blocked); seen.push(action.id); }
  const task=runSaga({channel},takeQueued,'SAVE',worker);
  channel.put({type:'SAVE',id:1}); channel.put({type:'SAVE',id:2});
  expect(seen).toEqual([]);
  release(); await Promise.resolve(); await Promise.resolve();
  expect(seen).toEqual([1,2]); task.cancel(); await task.toPromise();
});
