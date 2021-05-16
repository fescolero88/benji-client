import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import TopbarNotification from './TopbarNotification';
import TopbarMail from './TopbarMail';
import TopbarSearch from './TopbarSearch';
import TopbarUser from './TopbarUser';
import TopbarWrapper from './Topbar.styles';
import { themeConfig } from '@iso/config/theme/theme.config';

const { Header } = Layout;

export default function Topbar({userDropdown}) {
  const [selectedItem, setSelectedItem] = React.useState('');
  const customizedTheme = themeConfig.topbar;
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const dispatch = useDispatch();

  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme.backgroundColor,
    position: 'fixed',
    width: '100%',
    height: 88,
  };

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <div className="isoSearch"><TopbarSearch /></div>
        </div>

        <ul className="isoRight">
          <li
            onClick={() => setSelectedItem('notification')}
            className="isoNotify"
          >
            <TopbarNotification />
          </li>
          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser dropdown={userDropdown} />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
