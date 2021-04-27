import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Row} from 'antd';
import ContractorDeclinedJobDetailsWrapper   from './Details.style';
import StyledCard from '../../JobDetails/Card';
import ContractorJobMemo from '../../JobDetails/JobMemo';
import ContractorJobPayment from '../../JobDetails/JobPayment';
import ContractorNetworkUsers from '../../JobDetails/NetworkUsers';
import ContractorJobAttachments from '../../JobDetails/JobAttachments';

const DeclinedJobDetail = () => {
  const dispatch = useDispatch();
  const { job } = useSelector(state => state.ContractorJob);

  const {job: producerJob} = job;
  return (
    <ContractorDeclinedJobDetailsWrapper>
      <div className="jobMemoWrapper">
        <StyledCard
          title="Declined Job Information"
        >
          <Row gutter={30}>
            <Col span={17}>
              <div className="memoAcceptFormWrapper cardWrapper">
                <Row>
                  <Col span={17} className="leftFields">
                    <ContractorJobMemo job={job} />
                  </Col>

                  <Col span={7} className="rightFields">
                    <div className="paymentWrapper">
                      <ContractorJobPayment job={job} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col span={7}>
              <div className="networkUserWrapper">
                <StyledCard
                  title="Crew on This Job"
                >
                  <ContractorNetworkUsers users={job.productionCrews} />
                </StyledCard>
              </div>
            </Col>
          </Row>
        </StyledCard>
      </div>
      <div className="jobAttachmentWrapper">
        <StyledCard
          title="Attachments"
        >
          <ContractorJobAttachments attachments={job.attachments} />
        </StyledCard>
      </div>
    </ContractorDeclinedJobDetailsWrapper>
  )
};

export default DeclinedJobDetail;