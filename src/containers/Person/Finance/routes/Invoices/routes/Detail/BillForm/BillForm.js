import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BillFormWrapper from './BillForm.style';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'antd';
import NumberFormat from 'react-number-format';
import Input from '@iso/components/uielements/input';
import InputField from '@iso/components/shared/InputField';
import LocationField from '@iso/components/LocationField';
import ZipCode from '@iso/components/shared/ZipCode';
import Modal from '@iso/components/Modal';
import Button from '@iso/components/uielements/button';
import { fetchLocationsRequest } from '@iso/redux/location/actions';
import { updateContractorInvoiceBillFromRequest, updateContractorInvoiceBillToRequest } from '@iso/redux/contractorInvoice/actions';
import validationSchema from './schema';

const BillForm = ({ visible, billing, type, setModalData }) => {
  const dispatch = useDispatch();
  const { locations } = useSelector(state => state.Location);
  const { billUpdateAction } = useSelector(state => state.ContractorInvoice);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    dispatch(fetchLocationsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (billing) {
      setFormData({
        name: billing.name || '',
        email: billing.email || '',
        phone: billing.phone || '',
        address: billing.address || '',
        city: billing.city || '',
        state: billing.state || '',
        zipCode: billing.zipCode || '',
      })
    }
  }, billing);

  useEffect(() => {
    if (!billUpdateAction.loading && !billUpdateAction.error && action === 'BILL') {
      setModalData('close');
    }

    if (!billUpdateAction.loading && action === 'BILL') {
      setAction('');
    }
  }, [billUpdateAction]);

  const handleCancel = () => {
    setModalData('close');
  };

  const handleSubmit = (values) => {
    const payload = {...values};
    setAction('BILL');
    if (type === 'BILL_FROM') {
      dispatch(updateContractorInvoiceBillFromRequest(payload.id, payload));
    } else {
      dispatch(updateContractorInvoiceBillToRequest(payload.id, payload));
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit Billing Info"
      width={800}
      footer={null}
      onCancel={handleCancel}
    >
      <BillFormWrapper>
        <Formik
          enableReinitialize
          initialValues={formData}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <label className="fieldLabel">Full Name</label>
                  <Field name="name" component={InputField} />
                </Col>
                <Col span={8}>
                  <label className="fieldLabel">Email</label>
                  <Field name="email" component={InputField} />
                </Col>
                <Col span={8}>
                  <label className="fieldLabel">Phone</label>
                  <NumberFormat
                    format="+1 (###) ###-####"
                    mask="_"
                    customInput={Input}
                    value={values.phone}
                    onValueChange={(phone) => setFieldValue('phone', phone.value)}
                    name="phone"
                  />
                  {touched.phone && errors.phone && (
                    <div className="helper-text lowercase">{errors.phone}</div>
                  )}
                </Col>
                <Col span={24}>
                  <label className="fieldLabel">Address</label>
                  <Field name="address" component={InputField} />
                </Col>
                <Col span={10}>
                  <label className="fieldLabel">City</label>
                  <Field name="city">
                    {() => (
                      <LocationField
                        value={values.city}
                        locations={locations.city}
                        onChange={(city) => setFieldValue('city', city)}
                        onSelect={(city) => {
                          setFieldValue('city', city);
                        }}
                      />
                    )}
                  </Field>
                  {touched.city && errors.city && (
                    <div className="helper-text lowercase">{errors.city}</div>
                  )}
                </Col>
                <Col span={10}>
                  <label className="fieldLabel">State</label>
                  <Field>
                    {() => (
                      <LocationField
                        value={values.state}
                        locations={locations.state}
                        onChange={(state) => setFieldValue('state', state)}
                        onSelect={(state) => {
                          setFieldValue('state', state);
                        }}
                      />
                    )}
                  </Field>
                  {touched.state && errors.state && (
                    <div className="helper-text lowercase">{errors.state}</div>
                  )}
                </Col>
                <Col span={4}>
                  <label className="fieldLabel">Zip</label>
                  <Field name="zipCode">
                    {() => (
                      <ZipCode
                        value={values.zipCode}
                        onChange={(zipCode) => setFieldValue('zipCode', zipCode)}
                      />
                    )}
                  </Field>
                  {touched.zipCode && errors.zipCode && (
                    <div className="helper-text lowercase">{errors.zipCode}</div>
                  )}
                </Col>
              </Row>
              <div className="actions">
                <Button shape="round" onClick={handleCancel} >Cancel</Button>
                <Button shape="round" type="primary" htmlType="submit">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </BillFormWrapper>
    </Modal>
  );
};

export default BillForm;
