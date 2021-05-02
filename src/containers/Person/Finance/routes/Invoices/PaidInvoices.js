import React, {useEffect, useState} from 'react';
import StyledContractorInvoiceTable from './components/Table';
import { LocationSpan, TotalInvoice } from './Invoices.style';
import Button from '@iso/components/uielements/button';
import CurrencyText from '@iso/components/utility/currencyText';
import LocationIcon from '@iso/components/icons/Location';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const { Column } = StyledContractorInvoiceTable;

const PaidInvoices = ({invoices, onOpen}) => {
  const [tableRecords, setTableRecords] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  useEffect(() => {
    setTableRecords(invoices.map(invoice => ({...invoice, key: invoice.id})));
  }, [invoices]);

  const rowSelection = {
    selectedRowKeys: selectedInvoices.map(invoice => invoice.key),
    onSelect: (record, selected, selectedRows) => {
      setSelectedInvoices(selectedRows)
    },
    onSelectAll: (selected) => {
      if (selected) {
        setSelectedInvoices(tableRecords);
      } else {
        setSelectedInvoices([]);
      }
    }
  };

  const MoreActions = (
    <Menu>
      <Menu.Item>
        Open
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledContractorInvoiceTable
      rowSelection={rowSelection}
      dataSource={tableRecords}
      className="paidInvoiceTable"
    >
      <Column
        key="client"
        title="Client"
        render={(text, record) => record.job.client}
      />
      <Column
        key="jobName"
        title="Job Name"
        render={(text, record) => record.job.title}
      />
      <Column
        key="agency"
        title="Agency"
        render={(text, record) => record.job.agency}
      />
      <Column
        key="jobId"
        title="Job ID"
        render={(text, record) => record.job.jobNumber}
      />
      <Column
        key="location"
        title="Location"
        render={(text, record) => (
          <LocationSpan>
            <LocationIcon height="18" width="14" />
            {record.city}, {record.state}
          </LocationSpan>
        )}
      />
      <Column
        key="date"
        title="Date"
        render={(text, record) => record.dates}
      />
      <Column
        key="totalPay"
        title="Total Pay"
        render={(text, record) => (
          <TotalInvoice>
            <CurrencyText value={record.totalPrice} />
          </TotalInvoice>
        )}
      />
      <Column
        key="actions"
        title=""
        render={(text, record) => (
          <Dropdown overlay={MoreActions} overlayClassName="invoiceMenu" placement="bottomRight" trigger="click">
            <Button type="link"><MoreOutlined /></Button>
          </Dropdown>
        )}
      />
    </StyledContractorInvoiceTable>
  );
};

export default PaidInvoices;
