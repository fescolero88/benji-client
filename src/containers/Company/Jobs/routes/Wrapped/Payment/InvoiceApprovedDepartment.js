import React, { useState, useEffect, useMemo } from 'react';
import {Col, Menu, Row} from 'antd';
import InvoiceApprovedDepartmentWrapper from './InvoiceApprovedDepartment.style';
import Checkbox from '@iso/components/uielements/checkbox';
import StatusTag from '@iso/components/utility/statusTag';
import CurrencyText from '@iso/components/utility/currencyText';

const { SubMenu } = Menu;

const InvoiceApprovedDepartment = ({ job, department, memos, opened = false }) => {
  const [open, setOpen] = useState(opened);
  const [invoicePreview, setInvoicePreview] = useState({visible: false, invoiceMemo: null});

  const departmentKey = useMemo(() => {
    return `department-${department.id}`;
  }, [department]);

  const onInvoiceView = (invoiceMemo) => {
    setInvoicePreview({visible: true, invoiceMemo: invoiceMemo});
  };

  const handleInvoicePreview = (type, data) => {
    if (type === 'close') {
      setInvoicePreview({visible: false, invoiceMemo: null});
    }
  };

  return (
    <InvoiceApprovedDepartmentWrapper>
      <div className="departmentListWrapper">
        <Menu mode="inline" selectable={false} className="departmentList" defaultOpenKeys={opened ? [departmentKey] : []}>
          <SubMenu
            key={departmentKey}
            className="departmentPositionList"
            onTitleClick={(key, e) => setOpen(!open)}
            title={
              <>
                <Checkbox
                  color="#19913d"
                  checked={true}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
                <span className="departmentName" title={department.title}>{department.title}</span>
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
                      checked={true}
                      onClick={(e) => {
                        e.stopPropagation();
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
                        <StatusTag className="success">Approved</StatusTag>
                      </Col>
                    </Row>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </InvoiceApprovedDepartmentWrapper>
  );
};

export default InvoiceApprovedDepartment;
