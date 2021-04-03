import React, {lazy, useEffect, useMemo, useState} from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import siteConfig from '@iso/config/site.config';
import PrimarySidebar from '../../Sidebar/Primary';
import SecondarySidebar from '../../Sidebar/Secondary';
import Topbar from '../../Topbar/Topbar';
import { producerCompanyViewOptions, personalViewOptions} from './options';
import topDropdown from './dropdown';
import DashboardRoutes from '../DashboardRoutes';
const { Content, Footer } = Layout;

const routes = [
  {
    path: '/dashboard',
    component: lazy(() => import('@iso/containers/Company/Dashboard')),
    exact: true,
  },
  {
    path: '/invitation',
    component: lazy(() => import('@iso/containers/Company/Invitation')),
  },
  {
    path: '/companies/:companyId',
    component: lazy(() => import('@iso/containers/Company')),
  },
  {
    path: '/',
    component: lazy(() => import('@iso/containers/Person')),
  },
];

const Producer = ({height, styles, ...rest}) => {
  const { user: authUser } = useSelector(state => state.Auth);
  const { companyId, jobs: accountJobs, callsheets: accountCallsheets, networkInvitations: accountInvitations } = useSelector(state => state.AccountBoard);
  const [sidebarMenus, setSidebarMenus] = useState([]);

  const personalViewMenus = useMemo(() => {
    const pending = accountJobs['PENDING'] || [];
    const callsheets = accountCallsheets.filter(callsheet => !callsheet.accepted) || [];
    return personalViewOptions(pending, callsheets, accountInvitations);
  }, [accountJobs, accountCallsheets, accountInvitations]);

  useEffect(() => {
    if (companyId === 'null' || companyId === null) {
      setSidebarMenus(personalViewMenus);
    } else {
      setSidebarMenus(producerCompanyViewOptions(companyId));
    }
  }, [personalViewMenus, companyId])

  return (
    <div {...rest}>
      <Topbar userDropdown={topDropdown(authUser)} />
      <Layout style={styles.layout}>
        <div className="isoSidebarWrapper">
          <PrimarySidebar person={authUser} companies={authUser.companies} />
          <SecondarySidebar menus={sidebarMenus} />
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

export default Producer;