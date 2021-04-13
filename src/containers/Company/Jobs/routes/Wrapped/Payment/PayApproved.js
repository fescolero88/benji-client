import React, {memo, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import StyledModal, { PayApprovedContentWrapper } from './PayApproved.style';
import InvoiceApprovedDepartment from './InvoiceApprovedDepartment';
import ConfirmModal from '@iso/components/Modals/Confirm'
import { payApprovedInvoiceRequest } from '@iso/redux/jobInvoice/actions';
import { formatCurrency } from '@iso/lib/helpers/utility';
import _ from 'lodash';

const PayApproved = ({job, departments, memos, setModalData}) => {
  const dispatch = useDispatch();
  const { payApproved } = useSelector(state => state.JobInvoice);
  const [action, setAction] = useState('');
  const [visiblePayConfirm, setVisiblePayConfirm] = useState(false);

  useEffect(() => {
    if (!payApproved.loading && !payApproved.error && action === 'pay_approved') {
      setVisiblePayConfirm(false);
    }

    if (!payApproved.loading && action === 'pay_approved') {
      setAction('');
    }
  }, [payApproved]);

  const totalPayPrice = useMemo(() => {
    return memos.reduce((sum, memo) => sum + memo.invoice.totalPrice, 0)
  }, [memos]);

  const memosByPosition = useMemo(() => {
    return _.groupBy(memos, 'jobRole');
  }, [memos]);

  const handleCancel = () => {
    setModalData('close');
  };

  const onPayClick = () => {
    setVisiblePayConfirm(true);
  };

  const handlePayCancel = () => {
    setVisiblePayConfirm(false);
  };

  const handlePayApproved = () => {
    setAction('pay_approved');
    const positions = memos.map(memo => memo.jobRole);
    const payload = {jobRoles: positions};
    dispatch(payApprovedInvoiceRequest(job.id, payload))
  };

  const ModalHeader = () => {
    return (
      <>
        <h3 className="title">Pay All Approved</h3>
        <div className="invoiceTotals">
          <div className="totalCrew">
            <label>Total Crew:</label>
            <Input value={`${memos.length}`} />
          </div>
          <div className="totalAmount">
            <label>Total Amount:</label>
            <Input value={formatCurrency('$', totalPayPrice)} />
          </div>
        </div>
      </>
    )
  };

  const ModalFooter = () => {
    return (
      <>
        <Button shape="round" onClick={handleCancel}>Cancel</Button>
        <Button shape="round" className="payApprovedBtn" onClick={onPayClick} loading={payApproved.loading}>Pay Approved</Button>
      </>
    );
  };

  return (
    <StyledModal
      visible={true}
      title={<ModalHeader />}
      width={1200}
      onCancel={handleCancel}
      footer={<ModalFooter />}
    >
      <PayApprovedContentWrapper>
        <div className="payDepartmentList">
          {departments.map((department, index) =>
            <InvoiceApprovedDepartment
              key={`approved-invoice-department-${department.id}`}
              job={job}
              department={department}
              memos={memosByPosition}
              opened={true}
            />
          )}
        </div>
        <ConfirmModal
          key="pay-approved-invoice-confirm"
          visible={visiblePayConfirm}
          container={false}
          title="Confirm Payment"
          description={`Are you sure you want to pay the total amount of $${totalPayPrice} for ${memos.length} approved invoices?`}
          confirmLoading={payApproved.loading}
          onYes={handlePayApproved}
          onNo={handlePayCancel}
        />
      </PayApprovedContentWrapper>
    </StyledModal>
  )
};

export default PayApproved;
