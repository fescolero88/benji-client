import React from "react";
import { useHistory } from 'react-router';
import ContractorJobDetailsHeaderWrapper from "./Header.style";
import { Dropdown } from 'antd';
import basicStyle from "@iso/assets/styles/constants";
import BackIcon from '@iso/components/icons/Back';
import Button from "@iso/components/uielements/button";
import Icon from '@iso/components/icons/Icon';
import StatusTag from '@iso/components/utility/statusTag';
import MoreIcon from '@iso/assets/images/more.svg';
import ContractorJobStatusColor from '@iso/enums/contractor_job_status_color';
import MemoTypes from '@iso/enums/memo_types';

const { rowStyle, colStyle, gutter } = basicStyle;

const ContractorJobDetailsHeader = ({job, actions}) => {
  const { job: producerJob } = job;
  const history = useHistory();
  const goBack = () => {
    history.push('../../jobs');
  };

  const JobStatus = ({job}) => {
    if (job.accepted) {
      return <StatusTag className="statusBadge" color={ContractorJobStatusColor.ACCEPTED}>Accepted</StatusTag>
    }

    if (job.decline) {
      return <StatusTag className="statusBadge" color={ContractorJobStatusColor.DECLINED}>Declined</StatusTag>
    }

    if (job.completed) {
      return <StatusTag className="statusBadge" color={ContractorJobStatusColor.DECLINED}>Declined</StatusTag>
    }

    if (job.memoType === MemoTypes.HOLD) {
      return <StatusTag className="statusBadge" color={ContractorJobStatusColor.PENDING}>Hold Memo</StatusTag>
    } else {
      return <StatusTag className="statusBadge" color={ContractorJobStatusColor.DEAL}>Deal Memo</StatusTag>
    }

    return null;
  };

  const JobAcceptanceLevel = ({job}) => {
    switch (job.acceptanceLevel) {
      case 1:
        return <StatusTag className="statusBadge" color="#27ae60">1st Hold</StatusTag>
      case 2:
        return <StatusTag className="statusBadge" color="#f2994a">2nd Hold</StatusTag>
      case 3:
        return <StatusTag className="statusBadge" color="#eb5757">3rd Hold</StatusTag>
      default:
        return null;
    }
  };

  return (
    <ContractorJobDetailsHeaderWrapper>
      <div className="header-top">
        <div className="header-left">
          <Button type="link" onClick={goBack} className="goBackBtn">
            <BackIcon width={12} height={20} />
          </Button>
          <div className="header-title">
            <JobStatus job={job} />
            <JobAcceptanceLevel job={job} />
            <h1>{producerJob.client}</h1>
            <p>{producerJob.agency} | {producerJob.title}</p>
          </div>
        </div>

        <div className="header-right">
          <div className="header-right-text">
            <strong>Job # </strong>
            <span>{producerJob.jobNumber}</span>
          </div>

          <div className="header-right-action">

          </div>
        </div>
      </div>
    </ContractorJobDetailsHeaderWrapper>
  );
};

export default ContractorJobDetailsHeader;
