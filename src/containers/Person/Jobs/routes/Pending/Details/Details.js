import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {Row, Col} from 'antd';
import {Field, Form, Formik} from 'formik';
import Button from '@iso/components/uielements/button';
import Radio, {RadioGroup} from '@iso/components/uielements/radio';
import { Textarea } from '@iso/components/uielements/input';
import AttachIcon from '@iso/components/icons/Attach';
import ContractorPendingJobDetailsWrapper from './Details.style';
import StyledCard from '../../JobDetails/Card';
import HoldMemoHelperText from '../../JobDetails/HoldMemoHelperText';
import ContractorJobMemo from '../../JobDetails/JobMemo';
import ContractorJobPayment from '../../JobDetails/JobPayment';
import ContractorJobAttachments from '../../JobDetails/JobAttachments';
import ContractorNetworkUsers from '../../JobDetails/NetworkUsers';
import ConfirmModal from '@iso/components/Modals/Confirm';
import SuccessModal from '@iso/components/Modals/Success';
import MemoTypes from '@iso/enums/memo_types';
import MemoCrewTypes from '@iso/enums/memo_crew_types';
import ContractorJobStatus from '@iso/enums/contractor_job_status';
import { uploadFile } from '@iso/lib/helpers/s3';
import { showServerError } from '@iso/lib/helpers/utility';
import notify from '@iso/lib/helpers/notify';
import { fetchContractorJobDetailRequest, acceptOrDeclineJobRequest, updateContractorJobRequest } from '@iso/redux/contractorJob/actions';
import { syncAuthUserRequest } from '@iso/redux/auth/actions';
import { fetchAccountJobsRequest } from '@iso/redux/accountBoard/actions';
import _ from 'lodash';

const PendingJobDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { job, acceptOrDecline: acceptOrDeclineRequest, update: updateRequest } = useSelector(state => state.ContractorJob);
  const { user: authUser } = useSelector(state => state.Auth);
  const [action, setAction] = useState('');
  const [visibleHelperText, setVisibleHelperText] = useState(true);
  const [confirmDecline, setConfirmDecline] = useState({visible: false});
  const [successAccept, setSuccessAccept] = useState({visible: false});
  const [formData, setFormData] = useState({});

  const filePicker = useRef(null);

  const jobTitle = useMemo(() => {
    return job.memoType === MemoTypes.HOLD ? 'Hold Memo' : 'Deal Memo'
  }, [job]);

  const canUpdate = useMemo(() => {
    return job.canHandleMemo && job.memoType === MemoTypes.HOLD && job.memoStaff !== MemoCrewTypes.EMPLOYEE
  }, [job]);

  useEffect(() => {
    if (canUpdate) {
      setFormData({
        acceptanceLevel: 1,
        optionalMessage: ''
      })
    }
  }, [job]);

  useEffect(() => {
    if (!acceptOrDeclineRequest.loading && !acceptOrDeclineRequest.error && action === 'accept') {
      dispatch(syncAuthUserRequest());
      dispatch(fetchAccountJobsRequest(authUser.id, ContractorJobStatus.PENDING));

      if (job.memoType === MemoTypes.DEAL) {
        setSuccessAccept({
          visible: true,
          width: 445,
          bodyStyle: {padding: 40},
          title: 'Congratulations',
          description: 'You have accepted the deal memo and are officially ' +
            'booked for this job. Please proceed to the Accepted ' +
            'menu in the dashboard for further information.',
          onClose: onSuccessAcceptClose
        })
      } else {
        setSuccessAccept({
          visible: true,
          width: 405,
          title: 'Congratulations',
          description: 'Your hold status was accepted!',
          onClose: onSuccessAcceptClose
        })
      }
    }

    if (acceptOrDeclineRequest.error && action === 'accept') {
      notify('error', showServerError(acceptOrDeclineRequest.error));
    }

    if (!acceptOrDeclineRequest.loading && action === 'accept') {
      setAction('');
    }
  }, [acceptOrDeclineRequest]);

  useEffect(() => {
    if (!acceptOrDeclineRequest.loading && !acceptOrDeclineRequest.error && action === 'decline') {
      dispatch(syncAuthUserRequest());
      dispatch(fetchAccountJobsRequest(authUser.id, ContractorJobStatus.PENDING));
      setConfirmDecline({visible: false});
    }

    if (acceptOrDeclineRequest.error && action === 'decline') {
      notify('error', showServerError(acceptOrDeclineRequest.error));
    }

    if (!acceptOrDeclineRequest.loading && action === 'decline') {
      setAction('');
      dispatch(fetchContractorJobDetailRequest(job.id));
    }
  }, [acceptOrDeclineRequest]);

  useEffect(() => {
    if (!updateRequest.loading && !updateRequest.error && action === 'update_attachment') {

    }

    if (updateRequest.error && action === 'update_attachment') {
      notify('error', showServerError(updateRequest.error));
    }

    if (!updateRequest.loading && action === 'update_attachment') {
      setAction('');
    }
  }, [updateRequest]);

  const openFilePicker = () => {
    filePicker.current.value = null;
    filePicker.current.click();
  };

  const handleAttachmentLoad = async (e) => {
    const files = e.target.files;
    let attachments = [];
    const queue = [];

    Array.from(files).map((file, index) => {
      const memoAttachmentDirName = process.env.REACT_APP_S3_BUCKET_MEMO_ATTACHMENT_DIRNAME;
      queue.push(uploadFile(file, memoAttachmentDirName)
        .then(document => {
          if (document.location) {
            attachments.push({
              name: file.name,
              size: file.size,
              type: file.type,
              path: document.location
            });
          }
        })
      );
    });
    setAction('update_attachment');
    await Promise.all(queue)
      .then(() => {
        const payload = _.cloneDeep({attachments: [...job.attachments, ...attachments]})
        dispatch(updateContractorJobRequest(job.id, payload))
      })
      .catch(err => {
        setAction('');
        notify('error', err.message)
      });
  };

  const handleAttachmentDelete = (attachment) => {
    const filtered = job.attachments.filter(a => a.id !== attachment.id);
    const payload = _.cloneDeep({attachments: filtered});
    dispatch(updateContractorJobRequest(job.id, payload));
  };

  const handleAccept = (values) => {
    setAction('accept');
    const payload = {...values, accepted: true, decline: false};
    dispatch(acceptOrDeclineJobRequest({id: job.id, payload}));
  };

  const handleDecline = () => {
    setAction('decline');
    const payload = {accepted: false, decline: true};
    dispatch(acceptOrDeclineJobRequest({id: job.id, payload}));
  };

  const onDeclineClick = () => {
    setConfirmDecline({
      visible: true,
      title: 'Are you sure?',
      description: 'Do you really want to Decline the job? This action cannot be undone.',
      onYes: handleDecline,
      onNo: onDeclineCancel
    })
  };

  const onSuccessAcceptClose = () => {
    setSuccessAccept({visible: false});
    dispatch(fetchContractorJobDetailRequest(job.id));
  };

  const onDeclineCancel = () => {
    setConfirmDecline({visible: false});
  };

  const onHelperTextClose = () => {
    setVisibleHelperText(false);
  };

  const HoldMemoButtons = (
    <>
      <Row gutter={15}>
        <Col md={11}>
          <Button
            block
            className="declineBtn"
            htmlType="button"
            shape="round"
            loading={action == 'decline'}
            onClick={onDeclineClick}
          >
            Decline
          </Button>
        </Col>
        <Col md={13}>
          <Button
            block
            className="acceptBtn hold"
            type="primary"
            htmlType="submit"
            shape="round"
            loading={action == 'accept'}
          >
            Hold
          </Button>
        </Col>
      </Row>
      <p>Click on Hold to hold the desired position</p>
    </>
  );

  const DealMemoButtons = (
    <>
      <Row gutter={15}>
        <Col md={11}>
          <Button
            block
            className="declineBtn"
            htmlType="button"
            shape="round"
            loading={action == 'decline'}
            onClick={onDeclineClick}
          >
            Decline
          </Button>
        </Col>
        <Col md={13}>
          <Button
            block
            className="acceptBtn deal"
            type="primary"
            htmlType="submit"
            shape="round"
            loading={action == 'accept'}
          >
            Accept
          </Button>
        </Col>
      </Row>
    </>
  );

  const { job: producerJob } = job;

  return (
    <ContractorPendingJobDetailsWrapper>
      <ConfirmModal
        visible={confirmDecline.visible}
        width={390}
        title={confirmDecline.title}
        description={confirmDecline.description}
        onYes={confirmDecline.onYes}
        onNo={confirmDecline.onNo}
        confirmLoading={action === 'decline'}
      />

      <SuccessModal
        visible={successAccept.visible}
        width={successAccept.width}
        bodyStyle={successAccept.bodyStyle}
        title={successAccept.title}
        description={successAccept.description}
        onClose={successAccept.onClose}
      />

      {visibleHelperText && canUpdate && (
        <HoldMemoHelperText onClose={onHelperTextClose} />
      )}
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
                  onSubmit={handleAccept}
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

                          {job.canHandleMemo && (
                            <div className="uploadBtnWrapper">
                              <Button
                                shape="round"
                                type="default"
                                icon={<AttachIcon width={11} height={20} />}
                                loading={action === 'update_attachment'}
                                onClick={openFilePicker}
                              >
                                <input ref={filePicker} type="file" onChange={handleAttachmentLoad} multiple />
                                Upload
                              </Button>
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

                          {job.canHandleMemo && (
                            <div className="actionBtnWrapper">
                              {job.memoType === MemoTypes.HOLD ? HoldMemoButtons : DealMemoButtons}
                            </div>
                          )}
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className="memoAttachmentWrapper cardWrapper">
                <StyledCard
                  title="Attachments"
                >
                  <ContractorJobAttachments attachments={job.attachments} onDelete={handleAttachmentDelete} />
                </StyledCard>
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
    </ContractorPendingJobDetailsWrapper>
  )
};

export default PendingJobDetails;