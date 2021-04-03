import React, {lazy, useMemo} from 'react';
import {useSelector} from 'react-redux';
import siteConfig from '@iso/config/site.config';
import SecondarySidebar from '../../Sidebar/Secondary';
import {Layout} from 'antd';
import Topbar from '../../Topbar/Topbar';
import topDropdown from './dropdown';
import DashboardRoutes from '../DashboardRoutes';
import { personalViewOptions } from './options';

const { Content, Footer } = Layout;

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('@iso/containers/Person/Dashboard')),
    exact: true,
  },
  {
    path: '/',
    component: lazy(() => import('@iso/containers/Person')),
  }
];

const Contractor = ({height, styles, ...rest}) => {
  const { jobs: accountJobs, callsheets: accountCallsheets, networkInvitations: accountInvitations } = useSelector(state => state.AccountBoard);

  const menus = useMemo(() => {
    const pending = accountJobs['PENDING'] || [];
    const callsheets = accountCallsheets.filter(callsheet => !callsheet.accepted) || [];
    return personalViewOptions(pending, callsheets, accountInvitations);
  }, [accountJobs, accountCallsheets, accountInvitations]);

  return (
    <div {...rest}>
      <Topbar userDropdown={topDropdown} />
      <Layout style={styles.layout}>
        <div className="isoSidebarWrapper">
          <SecondarySidebar menus={menus} />
        </div>
        <Layout
          className="isoContentMainLayout"
          id="isoContentMainLayout"
          style={{
            height: height,
          }}
        >
          <Content className="isomorphicContent" style={styles.content}>
            <DashboardRoutes routes={routes} />
          </Content>
          <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Contractor;