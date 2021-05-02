import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import ContractorInvoicesWrapper from './Invoices.style';
import RadioSwitch from './components/Switch';
import { RadioButton } from '@iso/components/uielements/radio';
import Select,  { SelectOption } from '@iso/components/uielements/select';
import FinanceReport from './Report';
import UnpaidInvoices from './UnpaidInvoices';
import PaidInvoices from './PaidInvoices';
import Spin from '@iso/components/uielements/spin';
import { fetchContractorInvoicesRequest } from '@iso/redux/contractorInvoice/actions';

const Option = SelectOption;

const ContractorInvoices = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { invoices, list } = useSelector(state => state.ContractorInvoice);
  const { user: authUser } = useSelector(state => state.Auth);
  const [invoiceStatus, setInvoiceStatus] = useState('Unpaid');

  useEffect(() => {
    const filter = { status: invoiceStatus };
    dispatch(fetchContractorInvoicesRequest(authUser.id, filter));
  }, [invoiceStatus]);

  const handleOpen = (invoice) => {
    history.push(`./invoices/${invoice.id}/detail`);
  };

  return (
    <ContractorInvoicesWrapper>
      <h3 className="pageTitle">Finance</h3>
      <div className="financeReportWrapper">
        <FinanceReport />
      </div>

      <div className="invoiceListWrapper">
        <div className="actionWrapper">
          <RadioSwitch value={invoiceStatus}>
            <RadioButton value="Unpaid" onClick={() => setInvoiceStatus('Unpaid')}>Unpaid</RadioButton>
            <RadioButton value="Paid" onClick={() => setInvoiceStatus('Paid')}>Paid</RadioButton>
          </RadioSwitch>
          <Select className="sortBy" placeholder="Sort">
            <Option value="amount">Amount</Option>
            <Option value="createdAt">New</Option>
          </Select>
        </div>
        <div className="invoiceList">
          <Spin spinning={list.loading}>
            {invoiceStatus === 'Unpaid' ? <UnpaidInvoices invoices={invoices} onOpen={handleOpen} /> : <PaidInvoices invoices={invoices} onOpen={handleOpen} />}
          </Spin>
        </div>
      </div>
    </ContractorInvoicesWrapper>
  );
};

export default ContractorInvoices;
