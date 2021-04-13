import React, { useState, useEffect, useMemo } from 'react';
import {Col, Menu, Row} from 'antd';
import InvoiceDepartmentWrapper from './InvoiceDepartment.style';
import Checkbox from '@iso/components/uielements/checkbox';
import InvoicePreview from './InvoicePreview';
import StatusTag from '@iso/components/utility/statusTag';
import Badge from '@iso/components/uielements/badge';
import CurrencyText from '@iso/components/utility/currencyText';
import InvoiceProducerStatus from '@iso/enums/invoice_producer_status';
import _ from 'lodash';

const { SubMenu } = Menu;
const InvoiceProducerStatusColor = {
  [InvoiceProducerStatus.REQUESTED]: '#bcbccb',
  [InvoiceProducerStatus.IN_DISPUTE]: '#ffa177',
  [InvoiceProducerStatus.APPROVED]: '#19913d',
  [InvoiceProducerStatus.RECEIVED]: '#808bff',
  [InvoiceProducerStatus.PAYMENT_SENT]: ''
};

const InvoiceDepartment = ({ job, department, memos, selectedPositions, onSelect, opened = false }) => {
  const [open, setOpen] = useState(opened);
  const [invoicePreview, setInvoicePreview] = useState({visible: false, invoiceMemo: null});

  const departmentKey = useMemo(() => {
    return `department-${department.id}`;
  }, [department]);

  const departmentPositions = useMemo(() => {
    return department.jobRoles.map(p => p.id);
  }, [department]);

  const approved = useMemo(() => {
    let a = [];
    departmentPositions.map(position => {
      const invoiceMemo = memos[position];

      if (invoiceMemo && invoiceMemo.length) {
        if (invoiceMemo[0].invoice.status === 'Approved') {
          a.push(invoiceMemo[0]);
        }
      }
    });

    return a;
  }, [memos]);

  const isApprovedPosition = (position) => {
    const invoiceMemo = memos[position.id];
    if (invoiceMemo && invoiceMemo.length) {
      return invoiceMemo[0].invoice.status === 'Approved' ? true : false;
    }

    return false;
  };

  const onInvoiceView = (invoiceMemo) => {
    if (!canViewInvoice(invoiceMemo.invoice)) return;
    setInvoicePreview({visible: true, invoiceMemo: invoiceMemo});
  };

  const handleInvoicePreview = (type, data) => {
    if (type === 'close') {
      setInvoicePreview({visible: false, invoiceMemo: null});
    }
  };

  const onPositionSelectAll = (selected) => {
    let newPositions = [];
    if (selected) {
      newPositions = [...selectedPositions, ...departmentPositions];
    } else {
      newPositions = selectedPositions.filter(p => !departmentPositions.includes(p))
    }

    onSelect(newPositions);
  };

  const onPositionSelect = (selected, position) => {
    let newPositions = [];
    if (selected) {
      newPositions = [...selectedPositions, position.id];
    } else {
      newPositions = selectedPositions.filter(p => p !== position.id);
    }

    onSelect(newPositions);
  };

  const renderInvoiceStatus = (invoice) => {
    switch (invoice.status) {
      case InvoiceProducerStatus.REQUESTED:
        return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.REQUESTED]}>Requested</StatusTag>;
      case InvoiceProducerStatus.PAYMENT_SENT:
        return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.PAYMENT_SENT]}>Payment Sent</StatusTag>;
      case InvoiceProducerStatus.APPROVED:
        return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.APPROVED]}>Approved</StatusTag>;
      case InvoiceProducerStatus.RECEIVED:
        return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.RECEIVED]}>Received</StatusTag>;
      case InvoiceProducerStatus.IN_DISPUTE:
        return <StatusTag color={InvoiceProducerStatusColor[InvoiceProducerStatus.IN_DISPUTE]}>In Dispute</StatusTag>;
      default:
        return null;
    }
  };

  const canViewInvoice = (invoice) => {
    return invoice && invoice.status !== InvoiceProducerStatus.REQUESTED;
  };

  return (
    <InvoiceDepartmentWrapper>
      <div className="departmentListWrapper">
        <Menu
          mode="inline"
          inlineIndent={0}
          selectable={false}
          className="departmentList"
          defaultOpenKeys={opened ? [departmentKey] : []}
        >
          <SubMenu
            key={departmentKey}
            className="departmentPositionList"
            onTitleClick={(key, e) => setOpen(!open)}
            title={
              <>
                <Checkbox
                  color="#19913d"
                  checked={departmentPositions.every(dp => selectedPositions.includes(dp))}
                  onClick={(e) => {
                    e.stopPropagation();
                    onPositionSelectAll(e.target.checked)
                  }}
                />
                <span className="departmentName" title={department.title}>{department.title}</span>
                <Badge count={approved.length} />
              </>
            }
          >
            {
              department.jobRoles.map((jobRole) => {
                return (
                  <Menu.Item
                    key={`department-${department.id}-role-${jobRole.id}`}
                  >
                    <Checkbox
                      color="#19913d"
                      disabled={isApprovedPosition(jobRole)}
                      checked={selectedPositions.includes(jobRole.id) || isApprovedPosition(jobRole)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onPositionSelect(e.target.checked, jobRole);
                      }}
                    />
                    <span className="positionName" title={jobRole.title}>{jobRole.title}</span>
                  </Menu.Item>
                )
            })}
          </SubMenu>
        </Menu>
      </div>
      <div className="crewListWrapper">
        <div className="crewList">
          <div className="crewListHead">
            <Row className="crewHeadRow">
              <Col flex="255px" className="crewHeadTitle">Crew</Col>
              <Col flex="160px" className="crewHeadTitle">Project Rate</Col>
              <Col flex="160px" className="crewHeadTitle">Invoice Amount</Col>
              <Col flex="160px" className="crewHeadTitle textCenter">Invoice Status</Col>
              <Col flex="160px" className="textCenter"></Col>
            </Row>
          </div>
          {open && (
            <div className="crewListBody ant-list ant-list-split">
              <ul className="ant-list-items">
                {department.jobRoles.map((jobRole) => {
                  const invoiceMemo = memos[jobRole.id] ? memos[jobRole.id][0] : null;
                  if (!invoiceMemo) return null;

                  return (
                    <Row className="crewBodyRow" key={`crew-invoice-memo-${invoiceMemo.id}`}>
                      <Col flex="255px" className="crewBodyData groupData first">{invoiceMemo.fullName}</Col>
                      <Col flex="160px" className="crewBodyData groupData">
                        <CurrencyText value={invoiceMemo.totalPrice}/>
                      </Col>
                      <Col flex="160px" className="crewBodyData groupData last boldText">
                        <CurrencyText value={invoiceMemo.invoice.totalPrice}/>
                      </Col>
                      <Col flex="160px" className="crewBodyData invoiceStatus">
                        {renderInvoiceStatus(invoiceMemo.invoice)}
                      </Col>
                      <Col flex="160px" className="crewBodyData textCenter">
                        <a type="link" onClick={() => onInvoiceView(invoiceMemo)}>View</a>
                      </Col>
                    </Row>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {invoicePreview.visible && <InvoicePreview job={job} invoiceMemo={invoicePreview.invoiceMemo} setModalData={handleInvoicePreview} />}
    </InvoiceDepartmentWrapper>
  );
};

export default InvoiceDepartment;
