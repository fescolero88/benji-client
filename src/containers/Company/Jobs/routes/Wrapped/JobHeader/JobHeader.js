import React from "react";
import { useHistory } from 'react-router';
import JobHeaderWrapper from "./JobHeader.style";
import basicStyle from "@iso/assets/styles/constants";
import {Row, Col, Menu, Dropdown} from "antd";
import Button from "@iso/components/uielements/button";
import StatusTag from '@iso/components/utility/statusTag';
import Icon from '@iso/components/icons/Icon';
import BackIcon from '@iso/components/icons/Back';
import MoreIcon from '@iso/assets/images/more.svg'
const { rowStyle, colStyle, gutter } = basicStyle;

const WrappedJobHeader = ({job}) => {
  const history = useHistory();
  const goBack = () => {
    history.push('../../jobs');
  };

  const WrappedJobMoreActions = (
    <Menu>
      <Menu.Item>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
    </Menu>
  );

  return (
    <JobHeaderWrapper>
      <div className="header-top">
        <Row style={rowStyle} gutter={gutter}>
          <Col md={12} xs={24}>
            <div className="header-left">
              <div className="header-title">
                <div>
                  <StatusTag className="badge">Wrap/Pay</StatusTag>
                </div>
                <h1>
                  <a onClick={goBack}>
                    <BackIcon />
                  </a>
                  {job.client}
                </h1>
                <p>{job.agency} | {job.title}</p>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="header-right">
              <div className="header-right-text">
                <strong>Job # </strong>
                <span>{job.jobNumber}</span>
              </div>
              <Button type="default" className="archiveBtn">
                Archive
              </Button>
              <div className="header-right-action">
                <Dropdown overlay={WrappedJobMoreActions} overlayClassName="jobMenu" placement="bottomRight" trigger="click">
                  <Button type="link"><Icon image={MoreIcon} width={5} height={20} /></Button>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </JobHeaderWrapper>
  );
};

export default WrappedJobHeader;
