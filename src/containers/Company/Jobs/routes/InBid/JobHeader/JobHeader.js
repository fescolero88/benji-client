import React, {useState} from "react";
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';
import JobHeaderWrapper from "./JobHeader.style";
import basicStyle from "@iso/assets/styles/constants";
import {Row, Col, Menu, Dropdown} from "antd";
import JobStatus from '@iso/enums/job_status';
import Button from "@iso/components/uielements/button";
import Icon from '@iso/components/icons/Icon';
import BackIcon from '@iso/components/icons/Back';
import MoreIcon from '@iso/assets/images/more.svg';
import { updateJobDetailsRequest, deleteJobRequest } from '@iso/redux/producerJob/actions';
const { rowStyle, colStyle, gutter } = basicStyle;

const JobHeader = ({job}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [action, setAction] = useState('');

  const goBack = () => {
    history.push('../../jobs');
  };

  const handleJobActivate = () => {
    setAction('activate');
    dispatch(updateJobDetailsRequest(job.id, {originalStatus: job.status, status: JobStatus.ACTIVE}));
  };

  const handleJobDelete = () => {
    setAction('delete');
    dispatch(deleteJobRequest(job.id));
  };

  const InBidJobMoreActions = (
    <Menu>
      <Menu.Item>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Move This Job to Active
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
      <Menu.Item>
        Delete
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
                <div className="badge">In bid</div>
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
              <Button type="default" className="activeJobBtn" onClick={handleJobActivate}>
                Activate Job
              </Button>
              <div className="header-right-action">
                <Dropdown overlay={InBidJobMoreActions} overlayClassName="jobMenu" placement="bottomRight" trigger="click">
                  <Button type="link"><Icon image={MoreIcon} /></Button>
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
