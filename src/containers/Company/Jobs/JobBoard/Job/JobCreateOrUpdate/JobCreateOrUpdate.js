import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import Modal from '@iso/components/Modal';
import JobForm from './JobForm';
import EmptyAvatar from '@iso/assets/images/empty_avatar.jpg';
import { JobFormWrapper } from './JobCreateOrUpdate.style';
import { fetchProducersRequest } from '@iso/redux/user/actions';
import { createJobRequest, updateJobDetailsRequest } from '@iso/redux/producerJob/actions';
import validationSchema from './schema';
import { showServerError } from '@iso/lib/helpers/utility';
import notify from '@iso/lib/helpers/notify';

const initialValues = {
  agency: '',
  client: '',
  title: '',
  startDate: '',
  wrapDate: '',
  jobNumber: '',
  execProducer: '',
  director: '',
  lineProducer: ''
};

const JobCreateOrUpdate = ({ visible, job, type, setModalData }) => {
  const dispatch = useDispatch();
  const { producers } = useSelector((state) => state.User);
  const { companyId, create, update } = useSelector(state => state.ProducerJob);
  const [action, setAction] = useState('');

  const initials = {
    ...initialValues,
    ...job,
  };

  useEffect(() => {
    dispatch(fetchProducersRequest());
  }, [dispatch]);

  useEffect(() => {
    if (!create.loading && !create.error && action === 'job_create') {
      notify('success', 'Job created successfully');
      setModalData('close');
    }

    if (create.error && action === 'job_create') {
      notify('error', showServerError(create.error));
    }

    if (!create.loading && action === 'job_create') {
      setAction('');
    }
  }, [create]);

  useEffect(() => {
    if (!update.loading && !update.error && action === 'job_update') {
      notify('success', 'Job updated successfully');
      setModalData('close');
    }

    if (update.error && action === 'job_update') {
      notify('error', showServerError(update.error));
    }

    if (!update.loading && action === 'job_update') {
      setAction('');
    }
  }, [update]);

  const formatUserOptions = (producers, excluded = []) => {
    const availableProducers = producers.filter(user => !excluded.includes(user.id));

    return availableProducers.map((user) => ({
      isActive: user.isActive,
      avatar: user.profilePhotoS3Url || EmptyAvatar,
      value: user.id,
      label: user.fullName,
    }));
  };

  const userOptions = useMemo(() => {
    if (producers && producers.length) {
      return formatUserOptions(producers, []);
    } else {
      return [];
    }
  }, [producers]);

  const  handleCancel = () => {
    setModalData('close');
  };

  const handleSubmit = (values) => {
    let payload = {...values};

    if (job && job.id) {
      setAction('job_update');
      dispatch(updateJobDetailsRequest(job.id, payload));
    } else {
      payload.status = type;
      setAction('job_create');
      dispatch(createJobRequest(companyId, payload));
    }
  };

  return (
    <Modal
      visible={visible}
      title="Job Information"
      width={950}
      footer={null}
      wrapClassName="hCentered"
      onCancel={handleCancel}
    >
      <JobFormWrapper>
        <Formik
          enableReinitialize
          initialValues={initials}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          render={(formikProps) => (
            <JobForm {...formikProps} users={userOptions} onCancel={handleCancel} action={action} />
          )}
        />
      </JobFormWrapper>
    </Modal>
  );
};

export default JobCreateOrUpdate;
