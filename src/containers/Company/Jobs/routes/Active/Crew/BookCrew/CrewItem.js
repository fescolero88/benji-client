import { Col, Row } from 'antd';
import React from 'react';
import { Tag } from 'antd';
import CurrencyText from '@iso/components/utility/currencyText';

const BookCrewItem = ({ crew }) => {
  const statusColor = (status) => {
    switch (status) {
      case 'Confirm':
        return '#5c4da0';
      case 'Decline':
        return '#e25656';
      default:
        return '#ffc06a';
    }
  };

  return (
    crew && (
      <Row>
        <Col span={5}>{crew.name}</Col>
        <Col span={7}>{crew.date}</Col>
        <Col span={4}>{crew.dailyHours}</Col>
        <Col span={4} className="boldText">
          <CurrencyText value={crew.totalPay} />
        </Col>
        <Col span={4}>
          <Tag color={statusColor(crew.status)}>{crew.status}</Tag>
        </Col>
      </Row>
    )
  );
};

export default BookCrewItem;
