import React, { useEffect } from "react";
import AccountSuccessStyleWrapper from "../AccountSuccess.styles";
import { Row, Col } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import JobIcon from "@iso/assets/images/Job.svg";
import AddNetworkIcon from "@iso/assets/images/AddNetwork.svg";
import LampIcon from "@iso/assets/images/Lamp.svg";
import Logo from "@iso/assets/images/logo-white.svg";
import NextIcon from "@iso/assets/images/Next.svg";
import Button from '@iso/components/uielements/button';

export default function ({onSkip}) {
  const nextStepsList = [
    {
      imgSrc: JobIcon,
      title: "Create New Job",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    },
    {
      imgSrc: AddNetworkIcon,
      title: "Invite to Company Network",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    },
    {
      imgSrc: LampIcon,
      title: "Add Company Information",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    }
  ];

  return (
    <AccountSuccessStyleWrapper>
      <div className="success-step-container">
        <h1 className="title">Congratulations! Company Account Created.</h1>
        <h3 className="subTitle">Choose your next step.</h3>
        <Row className="steps" justify="center" gutter={37}>
          <Col md={8}>
            <div className="step-card">
              <div className="step-card-icon">
                <img src={JobIcon} />
              </div>
              <h2 className="step-card-title">Create New Job<br />&nbsp;</h2>
              <div className="step-card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              </div>
              <div className="step-card-action">
                <img src={NextIcon} />
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="step-card">
              <div className="step-card-icon">
                <img src={AddNetworkIcon} />
              </div>
              <h2 className="step-card-title">Invite to Company Network</h2>
              <div className="step-card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              </div>
              <div className="step-card-action">
                <img src={NextIcon} />
              </div>
            </div>
          </Col>
          <Col md={8}>
            <div className="step-card">
              <div className="step-card-icon">
                <img src={LampIcon} />
              </div>
              <h2 className="step-card-title">Add Company Information</h2>
              <div className="step-card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              </div>
              <div className="step-card-action">
                <img src={NextIcon} />
              </div>
            </div>
          </Col>
        </Row>
        <div className="skip-go">
          <Button onClick={onSkip}>
            <IntlMessages id="page.skipToDashboard" />
          </Button>
          <div className="footer-logo">
            <img src={Logo} />
          </div>
        </div>
      </div>
    </AccountSuccessStyleWrapper>
  );
}
