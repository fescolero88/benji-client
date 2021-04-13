import React, {Fragment, useContext} from "react";
import { Card, Tooltip, Dropdown, Menu } from "antd";
import Button from "@iso/components/uielements/button";
import MoreIcon from '@iso/components/icons/More';
import { HrBar, CardBody, CardFooter } from "../Job.style";
import EmptyAvatar from '@iso/assets/images/user1.png';
import {
  JobMoreAction, JobClientName, JobTitle, JobStatusBar,
  JobDetail, JobDetailItem, JobAction, JobCrew
} from "./JobCard.style";
import { formatDateRange } from '@iso/lib/helpers/utility';
import JobBoardContext from '../../JobBoardContext';
import JobStatus from '@iso/enums/job_status';
import _ from 'lodash';

const JobCard = ({ job, column}) => {
  const {onEdit, onDelete, onOpen, onActivate, onWrap, onArchive} = useContext(JobBoardContext);

  const ActiveJobMoreActions = (
    <Menu>
      <Menu.Item onClick={() => onEdit(job)}>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
      <Menu.Item onClick={() => onDelete(job)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const InBidJobMoreActions = (
    <Menu>
      <Menu.Item onClick={() => onEdit(job)}>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
      <Menu.Item onClick={() => onDelete(job)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const WrappedJobMoreActions = (
    <Menu>
      <Menu.Item onClick={() => onEdit(job)}>
        Edit Job
      </Menu.Item>
      <Menu.Item>
        Archive This Job
      </Menu.Item>
      <Menu.Item onClick={() => onDelete(job)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
      bodyStyle={{ padding: 20 }}
      bordered={false}
    >
      <CardBody>
        <JobMoreAction>
          <Dropdown overlay={ActiveJobMoreActions} overlayClassName="jobMenu" placement="bottomRight" trigger="click">
            <Button type="link"><MoreIcon /></Button>
          </Dropdown>
        </JobMoreAction>
        <JobClientName>{job.client}</JobClientName>
        <JobTitle>{job.title}</JobTitle>
        <JobStatusBar color={column.color} />
        <JobDetail>
          <JobDetailItem>
            <h3>Job #</h3>
            <p>{job.jobNumber}</p>
          </JobDetailItem>
          <JobDetailItem>
            <h3>Agency</h3>
            <p>{job.agency}</p>
          </JobDetailItem>
          <JobDetailItem>
            <h3>Date</h3>
            <p>{formatDateRange(job.startDate, job.wrapDate)}</p>
          </JobDetailItem>
        </JobDetail>
      </CardBody>
      <HrBar />
      <CardFooter>
        <JobAction>
          <Button type="default" className="statusActionBtn" onClick={() => onOpen(job)}>
            Open
          </Button>

          {job.status === JobStatus.PENDING && (
            <Button type="default" className="statusActionBtn" onClick={() => onActivate(job)}>
              Activate
            </Button>
          )}

          {job.status === JobStatus.ACTIVE && (
            <Button type="default" className="statusActionBtn" onClick={() => onWrap(job)}>
              Wrap/Pay
            </Button>
          )}

          {job.status === JobStatus.WRAPPED && (
            <Button type="default" className="statusActionBtn" onClick={() => onArchive(job)}>
              Archive
            </Button>
          )}
        </JobAction>

        <JobCrew color={column.color}>
          Crew:
          <span style={{ display: "flex" }}>
            {job.crews && job.crews.length > 0 && _.take(job.crews, 9).map((c) => (
              <Fragment key={c.id}>
                <Tooltip title={c.fullName} placement="bottomRight">
                  <img
                    src={c.profilePhotoS3Url || EmptyAvatar}
                  />
                </Tooltip>
              </Fragment>
            ))}
            {job.crews && job.crews.length > 9 && (
              <a href="#" className="moreCrew">
                +{job.crews.length - 9}
              </a>
            )}
          </span>
        </JobCrew>
      </CardFooter>
    </Card>
  );
};
export default JobCard;
