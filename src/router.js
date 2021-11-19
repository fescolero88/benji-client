import React, { lazy, Suspense } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@iso/components/utility/loader';
const AccountWizard = lazy(() => import('@iso/containers/AccountWizard/AccountWizard'));
const AccountSuccess = lazy(() => import('@iso/containers/AccountWizard/AccountSuccess'));

const Dashboard = lazy(() => import('@iso/containers/Dashboard/Dashboard'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() =>
      import('@iso/containers/Authentication/SignIn/SignIn')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() =>
      import('@iso/containers/Authentication/SignUp/SignUp')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP_WELCOME,
    component: lazy(() =>
      import('@iso/containers/Authentication/SignUp/Welcome')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.FORGOT_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Authentication/ForgotPassword/ForgotPassword')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Authentication/ResetPassword/ResetPassword')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD_WELCOME,
    component: lazy(() =>
      import('@iso/containers/Authentication/ResetPassword/Welcome')
    ),
    exact: true,
  },
  {
    path: PUBLIC_ROUTE.EMAIL_VERIFY,
    component: lazy(() =>
      import('@iso/containers/Authentication/SignUp/EmailVerification')
    ),
  },
  {
    path: PUBLIC_ROUTE.ACCEPT_COMPANY_REQUEST,
    component: lazy(() =>
      import(
        '@iso/containers/Authentication/AcceptCompanyPermission/AcceptCompanyPermission'
      )
    ),
  },
  {
    path: PUBLIC_ROUTE.DECLINE_COMPANY_REQUEST,
    component: lazy(() =>
      import(
        '@iso/containers/Authentication/DeclineCompanyPermission/DeclineCompanyPermission'
      )
    ),
  },
  {
    path: PUBLIC_ROUTE.VIEW_MEMO,
    component: lazy(() =>
      import('@iso/containers/Authentication/ViewMemo/ViewMemo')
    ),
  },
  {
    path: PUBLIC_ROUTE.PAGE_403,
    component: lazy(() => import('@iso/containers/Authentication/403/403')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@iso/containers/Authentication/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@iso/containers/Authentication/500/500')),
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector((state) => state.Auth.token.access);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const Routes = () => {
  const isLoggedIn = useSelector((state) => state.Auth.token.access);
  const authUser = useSelector((state) => state.Auth.user);

  const params = new URLSearchParams(window.location.search);
  const email = params.get('email');

  if (email) {
    if (isLoggedIn && authUser && authUser.id) {
      if (email !== authUser.email) {
        window.location.href = '/403';
        return;
      }
    }

    params.delete('email');
    window.location.search = params;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}

            <PrivateRoute path="/account-wizard" exact>
              <AccountWizard />
            </PrivateRoute>

            <PrivateRoute path="/account/:accountType/success" exact>
              <AccountSuccess />
            </PrivateRoute>

            <PrivateRoute path="/">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Routes;
