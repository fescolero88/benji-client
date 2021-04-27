import React, {useMemo} from 'react';
import ContractorJobMemoWrapper from './JobMemo.style';
import JobsIcon from '@iso/components/icons/Jobs';
import UserGroupIcon from '@iso/components/icons/UserGroup';
import UserIcon from '@iso/components/icons/User';
import CalendarIcon from '@iso/components/icons/Calendar';
import LocationIcon from '@iso/components/icons/Location';
import NoteIcon from '@iso/components/icons/Note';
import ContractorJobStatusColor from '@iso/enums/contractor_job_status_color';
import ContractorJobStatus from '@iso/enums/contractor_job_status';

const ContractorJobMemo = ({ job }) => {
  const {job: producerJob} = job;

  const status = useMemo(() => {
    if (job.accepted) {
      return ContractorJobStatus.ACCEPTED
    } else if (job.decline) {
      return ContractorJobStatus.DECLINED
    } else if (job.completed) {
      return ContractorJobStatus.COMPLETED
    } else {
      return job.memoType
    }
  }, [job]);

  return (
    <ContractorJobMemoWrapper>
      <div className="memoInfos">
        <div className="infoLabel">
          <JobsIcon width={20} height={18} fill={ContractorJobStatusColor[status]} />
          <span>Job For:</span>
        </div>
        <div className="infoDetails">{job.fullName}</div>
      </div>
      <div className="memoInfos">
        <div className="infoLabel">
          <UserGroupIcon width={20} height={16} fill={ContractorJobStatusColor[status]} />
          <span>Department:</span>
        </div>
        <div className="infoDetails">{job.jobRoleGroup}</div>
      </div>
      <div className="memoInfos">
        <div className="infoLabel">
          <UserIcon width={20} height={16} fill={ContractorJobStatusColor[status]} />
          <span>Position:</span>
        </div>
        <div className="infoDetails">{job.jobRole}</div>
      </div>
      <div className="memoInfos">
        <div className="infoLabel">
          <CalendarIcon width={20} height={20} fill={ContractorJobStatusColor[status]} />
          <span>Dates:</span>
        </div>
        <div className="infoDetails">{job.dates}</div>
      </div>
      <div className="memoInfos">
        <div className="infoLabel">
          <LocationIcon width={20} height={20} fill={ContractorJobStatusColor[status]} />
          <span>City:</span>
        </div>
        <div className="infoDetails">{job.city}, {job.state}</div>
      </div>
      <div className="memoInfos">
        <div className="infoLabel">
          <NoteIcon width={18} height={20} fill={ContractorJobStatusColor[status]} />
          <span>Notes:</span>
        </div>
        <div className="infoDetails">{job.notes}</div>
      </div>
    </ContractorJobMemoWrapper>
  );
};

export default ContractorJobMemo;
