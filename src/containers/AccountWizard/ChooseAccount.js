import React, { useState } from "react";
import { RadioGroup, RadioButton } from '@iso/components/uielements/radio';
import { Row, Col } from 'antd';
import Button from '@iso/components/uielements/button';
import CompanyIcon from "@iso/assets/images/Company.svg";
import ProducerIcon from "@iso/assets/images/Producer.svg";
import CrewIcon from "@iso/assets/images/Crew.svg";
import CheckIcon from '@iso/components/icons/Check';
import AccountTypes from '@iso/enums/account_types';
import ChooseAccountStyleWrapper from "./ChooseAccount.styles";

const CompanyAccountRole = [
  'Hold Crew',
  'Book Crew',
  'Easy Invoicing',
  'Pay 1099 and or W2 Crew'
];

const ProducerAccountRole = [
  'Hold Crew',
  'Book Crew',
  'Easy Invoicing',
  'Create Payroll Reports'
];

const CrewAccountRole = [
  'Showcase your Skills & Get hired',
  'Get Paid FAST',
  'Your own Benji Digital Wallet',
  'Network with industry Pro\'s'
];

export default ({ accountType, onSelect, onNext }) => {
  const onAccountTypeChange = (e) => {
    const selectedAccountType = e.target.value;
    onSelect(selectedAccountType);
  };

  const onAccountTypeNext = (type) => {
    onSelect(type);
    onNext();
  };

  return (
    <ChooseAccountStyleWrapper>
      <h1>Choose The Right Account</h1>
      <RadioGroup
        onChange={onAccountTypeChange}
        value={accountType}
        className="account-options"
      >
        <Row justify="center" gutter={37}>
          <Col md={8}>
            <RadioButton value={AccountTypes.COMPANY} className="account-option">
              <div className="card">
                <div className="card-icon">
                  <img src={CompanyIcon} />
                </div>
                <div className="card-head">
                  <h2 className="card-title">Company Account</h2>
                </div>
                <div className="card-price">
                  <label>Pricing</label>
                  <div className="pricingAmount">
                    <span>.75%</span> of Payroll
                  </div>
                </div>
                <div className="card-content">
                  <ul>
                    {CompanyAccountRole.map((role, index) => (
                      <li key={`company-role-${index}`}>
                        <CheckIcon width={17} height={13} fill={accountType === AccountTypes.COMPANY ? '#ffffff' : '#51369a'} />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-action">
                  <Button type="primary" shape="round" onClick={() => onAccountTypeNext(AccountTypes.COMPANY)}>Select</Button>
                </div>
              </div>
            </RadioButton>
          </Col>

          <Col md={8}>
            <RadioButton value={AccountTypes.PRODUCER} className="account-option">
              <div className="card">
                <div className="card-icon">
                  <img src={ProducerIcon} />
                </div>
                <div className="card-head">
                  <h2 className="card-title">Producer Account</h2>
                </div>
                <div className="card-price">
                  <label>Pricing</label>
                  <div className="pricingAmount free">
                    <span>Free</span>
                  </div>
                </div>
                <div className="card-content">
                  <ul>
                    {ProducerAccountRole.map((role, index) => (
                      <li key={`company-role-${index}`}>
                        <CheckIcon width={17} height={13} fill={accountType === AccountTypes.PRODUCER ? '#ffffff' : '#51369a'} />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-action">
                  <Button type="primary" shape="round" onClick={() => onAccountTypeNext(AccountTypes.PRODUCER)}>Select</Button>
                </div>
              </div>
            </RadioButton>
          </Col>

          <Col md={8}>
            <RadioButton value={AccountTypes.CREW} className="account-option">
              <div className="card">
                <div className="card-icon">
                  <img src={CrewIcon} />
                </div>
                <div className="card-head">
                  <h2 className="card-title">Crew Account</h2>
                </div>
                <div className="card-price">
                  <label>Pricing</label>
                  <div className="pricingAmount free">
                    <span>Free</span>
                  </div>
                </div>
                <div className="card-content">
                  <ul>
                    {CrewAccountRole.map((role, index) => (
                      <li key={`company-role-${index}`}>
                        <CheckIcon width={17} height={13} fill={accountType === AccountTypes.CREW ? '#ffffff' : '#51369a'} />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-action">
                  <Button type="primary" shape="round" onClick={() => onAccountTypeNext(AccountTypes.CREW)}>Select</Button>
                </div>
              </div>
            </RadioButton>
          </Col>
        </Row>
      </RadioGroup>
    </ChooseAccountStyleWrapper>
  );
};
