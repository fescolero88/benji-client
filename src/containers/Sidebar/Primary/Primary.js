import React, {useMemo, useState} from 'react';
import {useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {Col, Layout, Row} from 'antd';
import Menu from '@iso/components/uielements/menu';
import PrimarySidebarWrapper, { CompanyPlusMenuWrapper, AddCompanyModalWrapper } from './Primary.styles';
import Button from '@iso/components/uielements/button';
import Icon from '@iso/components/icons/Icon';
import Popover from '@iso/components/uielements/popover';
import CreateCompanyModal from './CreateCompany';
import UserEmptyPhoto from '@iso/assets/images/icon/benji-glass.svg';
import { PlusOutlined } from '@ant-design/icons';
import { setWorkspaceCompany } from '@iso/redux/accountBoard/actions';
import { syncAuthUserRequest } from '@iso/redux/auth/actions';

const { Sider } = Layout;

export default function ({ person, companies }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { companyId } = useSelector(state => state.AccountBoard);
  const [visibleCreateCompanyModal, setVisibleCreateCompanyModal] = useState(false);

  const onNewCompanyClick = () => {
    setVisibleCreateCompanyModal(true);
  };

  const handleCompanyCreate = (type) => {
    if (type === 'close') {
      setVisibleCreateCompanyModal(false);
    }

    if (type === 'success') {
      dispatch(syncAuthUserRequest());
      setVisibleCreateCompanyModal(false);
    }
  };

  const handleCompanySelect = ({key}) => {
    dispatch(setWorkspaceCompany(key));

    if (key === 'null') {
      history.push(`/dashboard`)
    } else {
      history.push(`/companies/${key}/dashboard`)
    }
  };

  const CompanyPlusMenu = (
    <CompanyPlusMenuWrapper className="isoCompanyPlusDropdown">
      <a className="isoDropdownLink">Sign in to another company</a>
      <a className="isoDropdownLink" onClick={onNewCompanyClick}>Create new company</a>
      <a className="isoDropdownLink">Find companies</a>
    </CompanyPlusMenuWrapper>
  );

  return (
    <PrimarySidebarWrapper>
      <Sider
        trigger={null}
        width={58}
        className="isoPrimarySidebar"
      >
        <CreateCompanyModal visible={visibleCreateCompanyModal} setModalData={handleCompanyCreate} />
        <Menu
          className="isoCompanyMenu"
          mode="inline"
          inlineIndent={0}
          selectedKeys={[companyId || 'null']}
          onSelect={handleCompanySelect}
        >
          <Menu.Item key={null}>
            <div className="isoPersonalPhotoWrapper">
              <Icon src={UserEmptyPhoto } width={35} height={35} title="Personal" />
            </div>
          </Menu.Item>
          {companies.map(company => (
            <Menu.Item key={company.id}>
              <div className="isoCompanyLogoWrapper">
                {company.profilePhotoS3Url && (
                  <Icon src={company.profilePhotoS3Url} width={35} height={35} title={company.title} />
                )}

                {!company.profilePhotoS3Url && (
                  <div className="companyTitle" title={company.title}>{company.title.slice(0, 2).toUpperCase()}</div>
                )}
              </div>
            </Menu.Item>
          ))}
        </Menu>
        <div className="addCompanyBtnWrapper">
          <Popover trigger="click" placement="rightTop" content={CompanyPlusMenu}>
            <Button type="link" className="companyAddBtn"><PlusOutlined /></Button>
          </Popover>
        </div>
      </Sider>
    </PrimarySidebarWrapper>
  );
}
