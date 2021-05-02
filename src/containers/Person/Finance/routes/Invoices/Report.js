import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FinanceReportWrapper, { WidgetBox } from './Report.style';
import NumberFormat from 'react-number-format';
import { Select } from 'antd';
import { fetchContractorFinanceStatsRequest } from '@iso/redux/contractorInvoice/actions';

const { Option } = Select;

const FinanceReport = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { stats } = useSelector(state => state.ContractorInvoice);
  const [statsPeriod, setStatsPeriod] = useState(1);

  useEffect(() => {
    const filter = {period: statsPeriod};
    dispatch(fetchContractorFinanceStatsRequest(authUser.id, filter));
  }, [statsPeriod]);

  return (
    <FinanceReportWrapper>
      <li>
        <WidgetBox className="totalPaidWidget">
          <div className="isoColorIndicator" style={{background: '#19913d'}}></div>
          <div className="isoWidgetText">
            <h3 className="isoWidgetPrice">
              <NumberFormat value={stats.totalPaid} displayType="text" thousandSeparator={true} prefix={'$'} />
            </h3>
            <div className="totalPaidWidgetLabelWrapper">
              <span className="isoWidgetLabel">Total Paid</span>
              <Select className="paidMonthDropdown" size="small" value={statsPeriod} onSelect={value => setStatsPeriod(value)}>
                <Option value={1}>1 month</Option>
                <Option value={3}>3 months</Option>
                <Option value={6}>6 months</Option>
                <Option value={9}>9 months</Option>
              </Select>
            </div>
          </div>
        </WidgetBox>
      </li>
      <li>
        <WidgetBox>
          <div className="isoColorIndicator" style={{background: '#ffc06a'}}></div>
          <div className="isoWidgetText">
            <h3 className="isoWidgetPrice">
              <NumberFormat value={stats.overdue} displayType="text" thousandSeparator={true} prefix={'$'} />
            </h3>
            <div className="isoWidgetLabel">Overdue</div>
          </div>
        </WidgetBox>
      </li>
      <li>
        <WidgetBox>
          <div className="isoColorIndicator" style={{background: '#808bff'}}></div>
          <div className="isoWidgetText">
            <h3 className="isoWidgetPrice">
              <NumberFormat value={stats.sent} displayType="text" thousandSeparator={true} prefix={'$'} />
            </h3>
            <div className="isoWidgetLabel">Sent</div>
          </div>
        </WidgetBox>
      </li>
      <li>
        <WidgetBox>
          <div className="isoColorIndicator" style={{background: '#bcbccb'}}></div>
          <div className="isoWidgetText">
            <h3 className="isoWidgetPrice">
              <NumberFormat value={stats.requested} displayType="text" thousandSeparator={true} prefix={'$'} />
            </h3>
            <div className="isoWidgetLabel">Requested</div>
          </div>
        </WidgetBox>
      </li>
      <li>
        <WidgetBox>
          <div className="isoColorIndicator" style={{background: '#ffa177'}}></div>
          <div className="isoWidgetText">
            <h3 className="isoWidgetPrice">
              <NumberFormat value={stats.inDispute} displayType="text" thousandSeparator={true} prefix={'$'} />
            </h3>
            <div className="isoWidgetLabel">In Dispute</div>
          </div>
        </WidgetBox>
      </li>
    </FinanceReportWrapper>
  );
};

export default FinanceReport;
