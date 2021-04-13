import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';
import JobStatus from '@iso/enums/job_status';
import InBidJobRoutes from './InBid';
import ActiveJobRoutes from './Active';
import WrappedJobRoutes from './Wrapped';
import { fetchJobDetailsReqeust } from '@iso/redux/producerJob/actions'

const CompanyJobDetails = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const { job, detail: {error, loading} } = useSelector(state => state.ProducerJob);
  const [loader, setLoader] = useState(true);
  const [action, setAction] = useState('');

  useEffect(() => {
    setAction('details');
    dispatch(fetchJobDetailsReqeust({ id: jobId }));
  }, [jobId]);

  useEffect(() => {
    if (!loading && !error && action === 'details') {
      setLoader(false);
    }

    if (!loading && action === 'details') {
      setAction('');
    }
  }, [loading, error]);

  if (loader) {
    return <Loader />;
  }

  if (job.status === JobStatus.PENDING) {
    return <InBidJobRoutes />
  }

  if (job.status === JobStatus.ACTIVE) {
    return <ActiveJobRoutes />
  }

  if (job.status === JobStatus.WRAPPED) {
    return <WrappedJobRoutes />
  }

  return null;
};

export default CompanyJobDetails;
