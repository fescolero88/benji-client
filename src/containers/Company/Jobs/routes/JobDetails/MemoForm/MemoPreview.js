import React, {useEffect, useRef, useState} from 'react';
import Button from '@iso/components/uielements/button';
import Logo from '@iso/assets/images/logo-blue.svg';
import MultiplyIcon from '@iso/components/icons/Multiply';
import
  StyledMemoPreviewModal, { ActionWrapper, MemoBodyWrapper }
from './MemoPreview.style';
import { Col, Row } from 'antd';
import Editor from '@iso/components/uielements/editor';
import CurrencyText from '@iso/components/utility/currencyText';
import useOnClickOutside from "@iso/lib/hooks/useOnClickOutside";
import {formatDateString, isSequenceDates} from '@iso/lib/helpers/utility';
import MemoTypes from '@iso/enums/memo_types';
import MemoCrewTypes from '@iso/enums/memo_crew_types';
import _ from 'lodash';

const MemoPreview = ({ visible, job, memo, setModalData }) => {
  const [action, setAction] = useState('');
  const [title, setTitle] = useState('');
  const [editableHeadline, setEditableHeadline] = useState(false);
  const [headline, setHeadline] = useState('');

  const editorRef = useRef();

  useEffect(() => {
    if (!memo) return;

    setHeadline(memo.headline);
    if (memo.isUnAnswered) {
      if (memo.memoStaff === MemoCrewTypes.EMPLOYEE) {
        setTitle('Company Staff Hold Memo (Unanswered)');
      } else {
        setTitle('Contractor Hold Memo (Unanswered)');
      }

      return
    }

    if (memo.memoType === MemoTypes.DEAL) {
      if (memo.memoStaff === MemoCrewTypes.EMPLOYEE) {
        setTitle('Company Staff Deal Memo');
      } else {
        setTitle('Contractor Deal Memo');
      }
    } else {
      if (memo.memoStaff === MemoCrewTypes.EMPLOYEE) {
        setTitle('Company Staff Hold Memo');
      } else {
        setTitle('Contractor Hold Memo');
      }
    }
  }, [memo]);

  const handleCancel = () => {
    setModalData('close');
  };

  const stringifyDates = (dates) => {
    if (isSequenceDates(dates)) {
      const minDate = _.min(dates);
      const maxDate = _.max(dates);

      return `${formatDateString(minDate, 'MMM Do, YYYY')} - ${formatDateString(maxDate, 'MMM Do, YYYY')}`;
    } else {
      const dateStrings = dates.map(date => formatDateString(date, 'MMM Do YYYY'));
      return dateStrings.join(', ');
    }
  };

  const superRoleUserName = (role, aliasRole) => {
    if (job[role] && job[role].id) {
      return job[role].fullName;
    }

    return job[aliasRole];
  };

  const onHeadlineEdit = () => {
    setEditableHeadline(true);
  };

  const handleStopEdit = () => {
    setEditableHeadline(false)
  };

  const onViewMemoClick = () => {
    setModalData('update', headline)
  };

  const onSendMemoClick = () => {
    setModalData('send', headline)
  };

  useOnClickOutside(editorRef, handleStopEdit);

  if (!memo) {
    return null;
  }

  return (
    <StyledMemoPreviewModal
      visible={visible}
      title={`${title} - Preview`}
      closeIcon={<MultiplyIcon width={14} height={14} />}
      width={950}
      footer={
        <ActionWrapper>
          <Button htmlType="button" shape="round" onClick={handleCancel}>
            Exit Preview
          </Button>

          <Button
            htmlType="submit"
            type="primary"
            shape="round"
            loading={action === 'save'}
            onClick={onSendMemoClick}
          >
            Send
          </Button>
        </ActionWrapper>
      }
      onCancel={handleCancel}
    >
      <MemoBodyWrapper>
        <div className="logoWrapper">
          <img src={Logo} height="56px" />
        </div>
        <div className="memoInfoWrapper">
          <h2 className="title">{title}</h2>
          <Row>
            <Col span={24}>
              {editableHeadline
                ? (
                  <div className="headlineEditorWrapper" ref={editorRef}>
                    <Editor
                      onChange={(html) => setHeadline(html)}
                      value={headline}
                      modules={{
                        toolbar: [
                          ['bold', 'italic', 'underline', 'strike'],
                          ['link', 'image']
                        ]
                      }}
                    />
                  </div>
                )
              : (
                <div className="headlineWrapper">
                  <div dangerouslySetInnerHTML={{__html: headline}} />
                  <Button type="link" className="emailEditBtn" onClick={onHeadlineEdit}>Edit</Button>
                </div>
              )}

              <Row className="memoDetail">
                <Col span={8}>Position:</Col>
                <Col span={16}>{memo.position}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Dates:</Col>
                <Col span={16}>{stringifyDates(memo.shootDates)}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>City:</Col>
                <Col span={16}>{memo.city}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>State:</Col>
                <Col span={16}>{memo.state}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Hours Per Day:</Col>
                <Col span={16}>{memo.dailyHours}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Working Days:</Col>
                <Col span={16}>{memo.workingDays}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Working Rate:</Col>
                <Col span={16}><CurrencyText value={memo.workingRate} /></Col>
              </Row>

              <div className="breakSection"></div>

              <Row className="memoDetail">
                <Col span={8}>Executive Producer:</Col>
                <Col span={16}>{superRoleUserName('execProducer', 'execProducerName')}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Director:</Col>
                <Col span={16}>{superRoleUserName('director', 'directorName')}</Col>
              </Row>
              <Row className="memoDetail">
                <Col span={8}>Director:</Col>
                <Col span={16}>{superRoleUserName('lineProducer', 'lineProducerName')}</Col>
              </Row>

              <div className="viewMemoBtnWrapper">
                <Button htmlType="submit" type="primary" shape="round" onClick={onViewMemoClick}>
                  View Memo
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </MemoBodyWrapper>
    </StyledMemoPreviewModal>
  );
};

export default MemoPreview;
