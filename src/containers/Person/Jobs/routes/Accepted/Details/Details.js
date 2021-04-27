import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Field, Form, Formik} from 'formik';
import {Col, Row} from 'antd';
import ContractorAcceptedJobDetailsWrapper from './Details.style';
import Radio, {RadioGroup} from '@iso/components/uielements/radio';
import Button from '@iso/components/uielements/button';
import { Textarea } from '@iso/components/uielements/input';
import MemoTypes from '@iso/enums/memo_types';
import MemoCrewTypes from '@iso/enums/memo_crew_types';
import StyledCard from '../../JobDetails/Card';
import ContractorJobMemo from '../../JobDetails/JobMemo';
import ContractorJobPayment from '../../JobDetails/JobPayment';
import ContractorNetworkUsers from '../../JobDetails/NetworkUsers';
import ContractorJobAttachments from '../../JobDetails/JobAttachments';
import { updateContractorJobRequest } from '@iso/redux/contractorJob/actions';
import notify from '@iso/lib/helpers/notify';
import { showServerError } from '@iso/lib/helpers/utility';

const AcceptedJobDetail = () => {
  const dispatch = useDispatch();
  const { job, update: updateRequest } = useSelector(state => state.ContractorJob);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({});

  const jobTitle = useMemo(() => {
    return job.memoType === MemoTypes.HOLD ? 'Hold Memo' : 'Deal Memo'
  }, [job]);

  const canUpdate = useMemo(() => {
    return job.canHandleMemo && job.memoType === MemoTypes.HOLD && job.memoStaff !== MemoCrewTypes.EMPLOYEE;
  }, [job]);

  useEffect(() => {
    if (canUpdate) {
      setFormData({
        acceptanceLevel: job.acceptanceLevel,
        optionalMessage: job.optionalMessage
      })
    }
  }, [job]);

  useEffect(() => {
    if (!updateRequest.loading && !updateRequest.error && action === 'update') {
      notify('success', 'Memo updated successfully');
    }

    if (updateRequest.error && action === 'update') {
      notify('error', showServerError(updateRequest.error));
    }

    if (!updateRequest.loading && action === 'update') {
      setAction('');
    }
  }, [updateRequest]);

  const handleUpdate = (values) => {
    setAction('update');
    const payload = {...values};
    dispatch(updateContractorJobRequest(job.id, payload));
  };

  const { job: producerJob } = job;

  return (
    <ContractorAcceptedJobDetailsWrapper>
      <div className="jobMemoWrapper">
        <StyledCard
          title={jobTitle}
        >
          <Row gutter={30}>
            <Col span={17}>
              <div className="memoAcceptFormWrapper cardWrapper">
                <Formik
                  enableReinitialize
                  initialValues={formData}
                  onSubmit={handleUpdate}
                >
                  {({
                      values,
                      errors,
                      touched,
                      setFieldValue,
                    }) => (
                    <Form>
                      <Row>
                        <Col span={17} className="leftFields">
                          <ContractorJobMemo job={job} />

                          {canUpdate && (
                            <div className="formGroup optionalMessage">
                              <label>Optional Message</label>
                              <Field>
                                {() => (
                                  <Textarea
                                    autoSize={{
                                      minRows: 4,
                                      maxRows: 4,
                                    }}
                                    value={values.optionalMessage}
                                    onChange={(e) => {setFieldValue('optionalMessage', e.target.value)}}
                                  />
                                )}
                              </Field>
                            </div>
                          )}
                        </Col>

                        <Col span={7} className="rightFields">
                          {canUpdate && (
                            <div className="formGroup">
                              <RadioGroup
                                type="greenScale"
                                value={values.acceptanceLevel}
                                onChange={(e) => setFieldValue('acceptanceLevel', e.target.value)}
                              >
                                <Radio value={1}>
                                  1st Hold
                                </Radio>
                                <Radio value={2}>
                                  2nd Hold
                                </Radio>
                                <Radio value={3}>
                                  3rd Hold
                                </Radio>
                              </RadioGroup>
                            </div>
                          )}

                          <div className="paymentWrapper">
                            <ContractorJobPayment job={job} />
                          </div>

                          {canUpdate && (
                            <div className="actionBtnWrapper">
                              <Button
                                className="acceptBtn"
                                type="default"
                                htmlType="submit"
                                shape="round"
                                loading={action == 'update'}
                              >
                                Update
                              </Button>
                              <p>Click on Hold, to hold the desired position.</p>
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
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
      <div className="jobCallsheetWrapper">
        <StyledCard
          title="Accepted Callsheets"
        >

        </StyledCard>
      </div>
    </ContractorAcceptedJobDetailsWrapper>
  )
};

export default AcceptedJobDetail;