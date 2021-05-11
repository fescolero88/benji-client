import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clone from 'clone';
import {Col, Layout, Row} from 'antd';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Menu from '@iso/components/uielements/menu';
import appActions from '@iso/redux/app/actions';
import Logo from '@iso/components/utility/logo';
import SecondarySidebarWrapper from './Secondary.styles';
import SidebarMenu from './Menu';
import { themeConfig } from "@iso/config/theme/theme.config";

const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

export default function ({ menus }) {
  const dispatch = useDispatch();
  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector(state => state.App);
  const customizedTheme = themeConfig.sidebar;
  const handleToggle = useCallback(() => dispatch(toggleCollapsed()), [dispatch]);
  const topMenus = useMemo(() => {
    return menus.slice(0, 6);
  }, [menus]);

  const bottomMenus = useMemo(() => {
    return menus.slice(6);
  }, [menus]);

  const handleClick = (e) => {
    dispatch(changeCurrent([e.key]));
    if (view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);
    }
  };

  const isCollapsed = clone(collapsed) && !clone(openDrawer);
  const mode = isCollapsed === true ? 'vertical' : 'inline';

  const onMouseEnter = event => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };

  const submenuStyle = {
    backgroundColor: customizedTheme.backgroundColor,
    color: customizedTheme.textColor,
  };
  const submenuColor = {
    color: customizedTheme.textColor,
  };

  return (
    <SecondarySidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={260}
        className="isoSecondarySidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Logo collapsed={isCollapsed} onToggle={handleToggle} />
        <Scrollbars style={{ height: height - 88 }}>
          <div className="menuWrapper">
            <Menu
              onClick={handleClick}
              className="isoDashboardMenu"
              inlineIndent={20}
              mode={mode}
              selectedKeys={current}
            >
              {topMenus.map(singleOption => (
                <SidebarMenu
                  key={singleOption.key}
                  submenuStyle={submenuStyle}
                  submenuColor={submenuColor}
                  singleOption={singleOption}
                />
              ))}
            </Menu>

            <Menu
              onClick={handleClick}
              className="isoDashboardMenu"
              inlineIndent={20}
              mode={mode}
              selectedKeys={current}
            >
              {bottomMenus.map(singleOption => (
                <SidebarMenu
                  key={singleOption.key}
                  submenuStyle={submenuStyle}
                  submenuColor={submenuColor}
                  singleOption={singleOption}
                />
              ))}
            </Menu>
          </div>
        </Scrollbars>
      </Sider>
    </SecondarySidebarWrapper>
  );
}
