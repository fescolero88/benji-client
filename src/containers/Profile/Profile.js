import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import ProfileLayoutWrapper from './Profile.style';

const ProfileLayout = ({children}) => {
  return (
    <LayoutContentWrapper>
      <ProfileLayoutWrapper>
        <Row justify="start">
          <Col span={24}>
            {children}
          </Col>
        </Row>
      </ProfileLayoutWrapper>
    </LayoutContentWrapper>
  );
}

export default ProfileLayout;
