import React, {useState} from "react";
import { useHistory } from 'react-router';
import JobHeaderWrapper from "./JobHeader.style";
import InvoiceRequest from '../../../InvoiceRequest';
import basicStyle from "@iso/assets/styles/constants";
import {Row, Col, Menu, Dropdown} from "antd";
import Button from "@iso/components/uielements/button";
import Icon from '@iso/components/icons/Icon';
import MoreIcon from '@iso/assets/images/more.svg';
import BackIcon from '@iso/components/icons/Back';

const { rowStyle, colStyle, gutter } = basicStyle;

const JobHeader = ({job}) => {
  const history = useHistory();
  const [wrapModal, setWrapModal] = useState(false);

  const goBack = () => {
    history.push('../../jobs');
  };

  const onJobWrapPay = () => {
    setWrapModal(true);
  };

  const handleInvoiceModal = (type, data) => {
    if (type === 'close') {
      setWrapModal(false);
    }

    if (type === 'success') {
      history.push('../../jobs');
    }
  };

  const ActiveJobMoreActions = (
    <Menu>
      <Menu.Item>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Postpone Job
      </Menu.Item>
      <Menu.Item>
        Move This Job to Wrap/Pay
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
      <Menu.Item>
        Cancel This Job
      </Menu.Item>
      <Menu.Item>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <JobHeaderWrapper>
      {wrapModal &&
        <InvoiceRequest job={job} setModalData={handleInvoiceModal} />
      }

      <div className="header-top">
        <Row style={rowStyle} gutter={gutter}>
          <Col md={12} xs={24}>
            <div className="header-left">
              <div className="header-title">
                <div className="badge">Active</div>
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
              <Button type="default" className="wrapPayBtn" onClick={onJobWrapPay}>
                Wrap/Pay
              </Button>
              <div className="header-right-action">
                <Dropdown overlay={ActiveJobMoreActions} overlayClassName="jobMenu" placement="bottomRight" trigger="click">
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

export default JobHeader;
