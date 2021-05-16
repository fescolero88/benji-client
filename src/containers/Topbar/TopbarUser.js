import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@iso/components/uielements/popover';
import IntlMessages from '@iso/components/utility/intlMessages';
import userpic from '@iso/assets/images/user1.png';
import PowerOff from '@iso/components/icons/Power';
import * as authAction from '@iso/redux/auth/actions';
import TopbarDropdownWrapper from './TopbarDropdown.styles';
import { DownOutlined } from '@ant-design/icons';

const { signout } = authAction;

export default function TopbarUser({dropdown}) {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);

  function handleVisibleChange() {
    setVisibility(visible => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      {dropdown.map(item => (
        <Link className="isoDropdownLink" to={item.path || '#'} key={item.key}>
          <div className="isoDropdownLinkIcon">{item.icon}</div>
          <IntlMessages id={item.label} />
        </Link>
      ))}
      <div className="isoDropdownDivider"></div>
      <a
        className="isoDropdownLink isoDropdownLinkDanger"
        onClick={() => dispatch(signout())}
      >
        <div className="isoDropdownLinkIcon"><PowerOff fill="#eb5757" /></div>
        <IntlMessages id="topbar.logout" />
      </a>
    </TopbarDropdownWrapper>
  );

  return (
    <div className="isoImgWrapper">
      <Popover
        content={content}
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottomRight"
      >
        <div className="userName">{authUser.fullName} <DownOutlined /></div>
      </Popover>
      <img alt="user" src={ authUser.profilePhotoS3Url ? authUser.profilePhotoS3Url : userpic} />
    </div>
  );
}
