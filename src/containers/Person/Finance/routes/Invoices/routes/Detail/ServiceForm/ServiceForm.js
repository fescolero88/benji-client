import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InvoiceServiceFormWrapper from './ServiceForm.style';
import {Col, Row} from 'antd';
import NumberFormat from 'react-number-format';
import { Formik, Form, Field, FieldArray, getIn } from 'formik';
import Button from '@iso/components/uielements/button';
import Input from '@iso/components/uielements/input';
import InputField from '@iso/components/shared/InputField';
import Multiply from '@iso/components/icons/Multiply';
import {PlusCircleOutlined} from '@ant-design/icons';
import notify from '@iso/lib/helpers/notify';
import {showServerError} from '@iso/lib/helpers/utility';
import { updateContractorInvoiceServiceRequest } from '@iso/redux/contractorInvoice/actions';
import schema from './schema';
import _ from 'lodash';

const InvoiceServiceForm = ({invoice}) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { serviceUpdateAction } = useSelector(state => state.ContractorInvoice);
  const [action, setAction] = useState('');
  const formData = {services: invoice.lineItems};
  const initialService = {
    title: '',
    units: 0,
    numberOfDays: 0,
    rate: 0,
    totalAmount: 0,
    notes: ''
  };
  let boundArrayHelpers;

  useEffect(() => {
    if (!serviceUpdateAction.loading && !serviceUpdateAction.error && action === 'update') {
      notify('success', 'Services were added successfully');
    }

    if (serviceUpdateAction.error && action === 'update') {
      notify('error', showServerError(serviceUpdateAction.error));
    }

    if (!serviceUpdateAction.loading && action === 'update') {
      setAction('');
    }
  }, [serviceUpdateAction]);

  const bindArrayHelpers = (arrayHelpers) => {
    boundArrayHelpers = arrayHelpers
  };

  const handleServiceSubmit = (values) => {
    setAction('update');
    let payload = _.cloneDeep({lineItems: values.services});
    dispatch(updateContractorInvoiceServiceRequest(authUser.id, invoice.id, payload));
  };

  return (
    <InvoiceServiceFormWrapper>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={schema}
        onSubmit={handleServiceSubmit}
      >
        {({values, touched, errors, setFieldValue, isSubmitting}) => (
          <Form>
            <FieldArray
              name="services"
            >
              {(arrayHelpers) => {
                bindArrayHelpers(arrayHelpers)
                return (
                  values.services.map((service, index) => (
                    <Row gutter={[10, 10]} align="center" className="customServiceRow" key={`service-${index}`}>
                      <Col flex="3">
                        <div className="formGroup">
                          <label className="fieldLabel">Document Title</label>
                          <Field name={`services[${index}].title`} component={InputField} type="text" />
                        </div>
                      </Col>
                      <Col flex="60px">
                        <div className="formGroup">
                          <label className="fieldLabel">Units</label>
                          <Field name={`services[${index}].units`} component={InputField} type="text" />
                        </div>
                      </Col>
                      <Col flex="100px">
                        <div className="formGroup">
                          <label className="fieldLabel">No.of Days</label>
                          <Field name={`services[${index}].numberOfDays`} component={InputField} type="text" />
                        </div>
                      </Col>
                      <Col flex="120px">
                        <div className="formGroup">
                          <label className="fieldLabel">Rate</label>
                          <NumberFormat
                            value={service.rate || ''}
                            thousandSeparator={true}
                            prefix="$"
                            customInput={Input}
                            onValueChange={values => setFieldValue(`services[${index}].rate`, values.floatValue)}
                          />
                          {getIn(touched, `services[${index}].rate`) && getIn(errors, `services[${index}].rate`) && (
                            <div className="helper-text">{errors.services[index].rate}</div>
                          )}
                        </div>
                      </Col>
                      <Col flex="120px">
                        <div className="formGroup">
                          <label className="fieldLabel">Total Amount</label>
                          <NumberFormat
                            value={service.totalAmount || ''}
                            thousandSeparator={true}
                            prefix="$"
                            customInput={Input}
                            onValueChange={values => setFieldValue(`services[${index}].totalAmount`, values.floatValue)}
                          />
                          {getIn(touched, `services[${index}].totalAmount`) && getIn(errors, `services[${index}].totalAmount`) && (
                            <div className="helper-text">{errors.services[index].totalAmount}</div>
                          )}
                        </div>
                      </Col>
                      <Col flex="5">
                        <div className="formGroup">
                          <label className="fieldLabel">Notes</label>
                          <Field name={`services[${index}].notes`} component={InputField} type="text" />
                        </div>
                      </Col>
                      <Col flex="30px">
                        <label className="fieldLabel">&nbsp;</label>
                        {index > 0 && (
                          <Button type="link" onClick={() => arrayHelpers.remove(index)} style={{marginTop: '10px'}}>
                            <Multiply width={16} height={16} fill="#bdbdbd"/>
                          </Button>
                        )}
                      </Col>
                    </Row>
                  )
                ))}
              }
            </FieldArray>
            <div className="serverMessage">

            </div>
            {values.services.length > 0 &&
              <div className="serviceAction">
                <Button shape="round" type="primary" htmlType="submit" loading={serviceUpdateAction.loading}>Add</Button>
              </div>
            }
            <div className="serviceFormFooter">
              <Button type="link" onClick={() => boundArrayHelpers.push(initialService)}><PlusCircleOutlined /> Add line item</Button>
            </div>
          </Form>
        )}
      </Formik>
    </InvoiceServiceFormWrapper>
  );
};

export default InvoiceServiceForm;
