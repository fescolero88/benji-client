import rootReducer from './root-reducer';
import { SIGNOUT } from './auth/constants';

test('logout removes the previous account data from every workspace', () => {
  const initial = rootReducer(undefined, { type: '@@INIT' });
  const loggedIn = {
    ...initial,
    Auth: { ...initial.Auth, token: { access: 'old-token' }, user: { id: 1 } },
    AccountBoard: { ...initial.AccountBoard, companyId: 42, callsheets: [{ id: 9 }] },
    CompanyNetwork: { ...initial.CompanyNetwork, users: [{ id: 3 }] },
  };
  const loggedOut = rootReducer(loggedIn, { type: SIGNOUT });
  expect(loggedOut.Auth.token.access).toBeFalsy();
  expect(loggedOut.Auth.user).toBeNull();
  expect(loggedOut.AccountBoard.companyId).toBeNull();
  expect(loggedOut.AccountBoard.callsheets).toEqual([]);
  expect(loggedOut.CompanyNetwork).toEqual(initial.CompanyNetwork);
});
