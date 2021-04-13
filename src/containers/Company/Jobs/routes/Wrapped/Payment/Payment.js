import React, {useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WrappedJobPaymentWrapper from './Payment.style';
import WrappedJobDetail from './JobDetail';
import InvoiceDepartment from './InvoiceDepartment';
import PayApproved from './PayApproved';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import Checkbox from '@iso/components/uielements/checkbox';
import DownloadIcon from '@iso/components/icons/Download';
import {formatCurrency} from '@iso/lib/helpers/utility';
import notify from '@iso/lib/helpers/notify';
import { fetchJobInvoiceMemosRequest } from '@iso/redux/jobInvoice/actions';
import _ from 'lodash';

const WrappedJobPayment = () => {
  const dispatch = useDispatch();
  const { job } = useSelector(state => state.ProducerJob);
  const { invoiceDepartments, invoiceMemos } = useSelector(state => state.JobInvoice);
  const [payApproved, setPayApproved] = useState({visible: false, departments: null, memos: null});
  const [selectedPositions, setSelectedPositions] = useState([]);

  useEffect(() => {
    dispatch(fetchJobInvoiceMemosRequest(job.id));
  }, [job]);

  const invoiceMemosByPosition = useMemo(() => {
    return _.groupBy(invoiceMemos, 'jobRole');
  }, [invoiceMemos]);

  const allPositions = useMemo(() => {
    let all = [];
    invoiceDepartments.map(department => {
      const ids = department.jobRoles.map(jr => jr.id);
      all = [...all, ...ids];
    });

    return _.uniq(all);
  }, [invoiceDepartments]);

  useEffect(() => {
    setSelectedPositions(allPositions);
  }, [allPositions]);

  const approvedInvoices = useMemo(() => {
    return invoiceMemos.filter(memo => memo.invoice.status === 'Approved');
  }, [invoiceMemos]);

  const onPositionSelect = (positions) => {
    setSelectedPositions(positions)
  };

  const onPositionSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPositions(allPositions);
    } else {
      setSelectedPositions([]);
    }
  };

  const onPayApprovedClick = () => {
    const approvedPositions = approvedInvoices.map(iv => iv.jobRole);

    let approvedDepartments = []
    invoiceDepartments.map(department => {
      const newJobRoles = department.jobRoles.filter(jobRole => approvedPositions.includes(jobRole.id));
      if (newJobRoles.length) {
        approvedDepartments.push({...department, jobRoles: newJobRoles});
      }
    });

    if (!approvedInvoices.length) {
      notify('error', 'No approved invoice');
      return
    }

    setPayApproved({visible: true, departments: approvedDepartments, memos: approvedInvoices})
  };

  const handlePayApproved = (type, data) => {
    if (type === 'close') {
      setPayApproved({visible: false, departments: null, memos: null});
    }
  };

  return (
    <WrappedJobPaymentWrapper>
      <WrappedJobDetail job={job} />
      <div className="jobPaymentWrapper">
        <div className="paymentActionButtons">
          <div className="left">
            <Checkbox color="#19913d" checked={selectedPositions.length === allPositions.length} onChange={onPositionSelectAll} />
            <Button
              type="success"
              shape="round"
              onClick={onPayApprovedClick}
              className="payApprovedBtn"
            >
              Pay Approved
            </Button>
            <Button
              type="circle"
              icon={<DownloadIcon width={18} height={19} stroke="#19913d" />}
            />
          </div>
          <div className="right">
            <div className="crewActual">
              <label>Crew Actual</label>
              <Input
                value={formatCurrency('$', job.crewBudget)}
              />
            </div>

            <Button shape="round" className="jobDocumentBtn">Job Documents</Button>
          </div>
        </div>
        <div className="paymentTableWrapper">
          {invoiceDepartments.map((department) => (
            <InvoiceDepartment
              key={`invoice-memo-department-${department.id}`}
              job={job}
              department={department}
              selectedPositions={selectedPositions}
              memos={invoiceMemosByPosition}
              onSelect={onPositionSelect}
              opened={true}
            />
          ))}
        </div>
        {payApproved.visible && <PayApproved job={job} departments={payApproved.departments} memos={payApproved.memos} setModalData={handlePayApproved} />}
      </div>
    </WrappedJobPaymentWrapper>
  );
};

export default WrappedJobPayment;
