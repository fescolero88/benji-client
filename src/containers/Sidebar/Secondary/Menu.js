import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Menu from '@iso/components/uielements/menu';
import IntlMessages from '@iso/components/utility/intlMessages';
const SubMenu = Menu.SubMenu;

const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(function SidebarMenu({
  singleOption,
  submenuStyle,
  submenuColor,
  ...rest
}) {
  let match = useRouteMatch();
  const url = stripTrailingSlash(match.url);

  const renderMenu = (option) => {
    const { key, label, customLabel, className, leftIcon, children, disabled, suffix, prefix } = option;

    if (children) {
      return (
        <SubMenu
          key={key}
          className={className}
          title={
            <span className="isoMenuHolder" style={submenuColor}>
              {prefix && <span className="menu-prefix">{prefix}</span>}
              <span className="menu-icon-svg">{leftIcon}</span>
              <span className="nav-text">
                {label ? <IntlMessages id={label} /> : customLabel}
              </span>
              {suffix && <span className="menu-suffix">{suffix}</span>}
            </span>
          }
          {...rest}
        >
          {children.map(child => {
            return renderMenu(child);
          })}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={key} disabled={disabled} {...rest}>
        <Link to={`${url}/${key}`}>
          <div className="isoMenuHolder" style={submenuColor}>
            {prefix && <span className="menu-prefix">{prefix}</span>}
            <span className="menu-icon-svg">{leftIcon}</span>
            <span className="nav-text"><IntlMessages id={label} /></span>
            {suffix && <span className="menu-suffix">{suffix}</span>}
          </div>
        </Link>
      </Menu.Item>
    );
  };

  return (
    renderMenu(singleOption)
  )
});
