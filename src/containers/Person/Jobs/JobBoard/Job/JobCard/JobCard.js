import React, {Fragment, useContext} from "react";
import {Card, Tooltip, Dropdown} from "antd";
import Button from "@iso/components/uielements/button";
import MoreIcon from '@iso/components/icons/More';
import { HrBar, CardFooter, CardBody } from "../Job.style";
import StatusTag from '@iso/components/utility/statusTag';
import MemoTypes from '@iso/enums/memo_types';
import {
  JobMoreAction, JobClientName, JobTitle, JobStatusBar,
  JobDetail, JobDetailItem, JobAction, JobCrew
} from "./JobCard.style";
import { formatDateRange } from '@iso/lib/helpers/utility';
import ContractorJobBoardContext from '../../JobBoardContext';

const ContractorJobCard = ({ job: memo, column }) => {
  const { job } = memo;
  const { onOpen } = useContext(ContractorJobBoardContext);

  const JobMemoType = ({job}) => {
    if (memo.accepted || memo.decline) return null;

    if (memo.memoType === MemoTypes.DEAL) {
      return <StatusTag className="badge" color="#51369a">Deal Memo</StatusTag>
    } else {
      return <StatusTag className="badge" color="#ffc06a">Hold Memo</StatusTag>
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
      }}
      bodyStyle={{ padding: 20 }}
      headStyle={{ borderBottom: "none", fontSize: 14, color: "#788195" }}
      bordered={false}
    >
      <CardBody>
        <JobMoreAction>
          <Dropdown overlay={<div />} overlayClassName="jobMenu" placement="bottomRight" trigger="click">
            <Button type="link"><MoreIcon /></Button>
          </Dropdown>
        </JobMoreAction>
        <JobClientName>{job.client}</JobClientName>
        <JobTitle>{job.title}</JobTitle>
        <JobStatusBar color={column.color} />
        <JobDetail color={column.color}>
          <JobDetailItem>
            <h3>Job ID</h3>
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
          <Button type="default" className="statusActionBtn" onClick={() => onOpen(memo)}>
            Open
          </Button>
          <JobMemoType job={job} />
        </JobAction>
      </CardFooter>
    </Card>
  );
};
export default ContractorJobCard;
