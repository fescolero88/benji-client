import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyOwnerWrapper from './CompanyOwner.style';
import { Row, Col } from 'antd';
import { Formik, Field, Form } from 'formik';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import InputField from '@iso/components/shared/InputField';
import {
  fetchCompanyDetailByEmailRequest,
  createWizardCompanyRequest,
  updateWizardCompanyRequest
} from '@iso/redux/accountWizard/actions';
import validationSchema from './schema';
import basicStyle from '@iso/assets/styles/constants'
import notify from '@iso/lib/helpers/notify';
import { showServerError } from '@iso/lib/helpers/utility';

const { rowStyle, gutter } = basicStyle;
const Option = SelectOption;

const CompanyOwner = ({onSuccess}) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector(state => state.Auth);
  const { company, wizard } = useSelector(state => state.AccountWizard);

  const [isOwner, setIsOwner] = useState(true);
  const [action, setAction] = useState('');
  const [formData, setFormData] = useState({
    type: 'Production Company',
    title: '',
    isOwner: true,
    ownerEmail: ''
  });

  const formikRef = useRef();

  useEffect(() => {
    if (company && company.id) {
      setFormData({
        ...formikRef.current.values,
        type: company.type,
        title: company.title,
      });
    }
  }, [company]);

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchCompanyDetailByEmailRequest(authUser.email));
    }
  }, [isOwner]);

  useEffect(() => {
    if (!wizard.loading && !wizard.error && action === 'save') {
      onSuccess();
    }

    if (wizard.error && action === 'save') {
      notify('error', showServerError(wizard.error));
    }

    if (!wizard.loading && action === 'save') {
      setAction('');
    }
  }, [wizard]);

  const handleCompanyOwnerEmailChange = (email) => {
    if (!email) return;
    dispatch(fetchCompanyDetailByEmailRequest(email));
  };

  const handleSubmit = (values) => {
    let payload = {...values, creatorEmail: authUser.email};
    if (values.isOwner) {
      payload.ownerEmail = authUser.email;
    }

    setAction('save');
    if (company && company.id) {
      dispatch(updateWizardCompanyRequest(company.id, payload));
    } else {
      dispatch(createWizardCompanyRequest(payload));
    }
  };

  return (
    <CompanyOwnerWrapper>
      <h1>Are you the company account owner?</h1>
      <div className="white-box">
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={formData}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({values, touched, errors, setFieldValue}) => (
            <Form>
              <div className="topFieldWrapper">
                <Row gutter={20} justify="start">
                  <Col flex={5}>
                    <RadioGroup
                      name="isOwner"
                      value={values.isOwner}
                      onChange={(e) => {
                        setFieldValue('isOwner', e.target.value);
                        setIsOwner(e.target.value);
                      }}
                    >
                      <Radio value={true}>Yes</Radio>
                    </RadioGroup>

                    <div className="formGroup">
                      <label className="fieldLabel">Email</label>
                      <Input value={authUser.email} disabled={true} />
                    </div>
                  </Col>
                  <Col flex="60px">
                    <div className="dividerWrapper">
                      <div className="divider vertical" />
                      <span>or</span>
                      <div className="divider vertical" />
                    </div>
                  </Col>
                  <Col flex={5}>
                    <RadioGroup
                      name="isOwner"
                      value={values.isOwner}
                      onChange={(e) => {
                        setFieldValue('isOwner', e.target.value);
                        setIsOwner(e.target.value);
                      }}
                    >
                      <Radio value={false} disabled={authUser.type}>No</Radio>
                    </RadioGroup>

                    <div className="formGroup">
                      <label className="fieldLabel">Company Account Owner Email</label>
                      <Field name="email">
                        {() => (
                          <Input
                            disabled={isOwner}
                            value={values.ownerEmail}
                            onChange={(e) => setFieldValue('ownerEmail', e.target.value)}
                            onBlur={(e) => handleCompanyOwnerEmailChange(e.target.value)}
                            onPressEnter={(e) => handleCompanyOwnerEmailChange(e.target.value)}
                          />
                        )}
                      </Field>
                      {touched.ownerEmail && errors.ownerEmail && (
                        <div className='helper-text lowercase'>{errors.ownerEmail}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="bottomFieldWrapper">
                <Row style={rowStyle} gutter={30} justify="start">
                  <Col md={12} xs={24}>
                    <div className="formGroup">
                      <label className="fieldLabel">Company Type</label>
                      <Field>
                        {() => (
                          <Select
                            showSearch
                            name='type'
                            style={{ width: '100%' }}
                            value={values.type}
                            onChange={(value) => {
                              setFieldValue('type', value);
                            }}
                          >
                            <Option value='Production Company'>
                              Production Company
                            </Option>
                          </Select>
                        )}
                      </Field>
                      {touched.type && errors.type && (
                        <div className='helper-text lowercase'>{errors.type}</div>
                      )}
                    </div>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className="formGroup">
                      <label className="fieldLabel">Company Name</label>
                      <Field component={InputField} name="title" type="text" />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="actionBtnWrapper">
                <Button
                  htmlType="submit"
                  type="primary"
                  shape="round"
                  className="wizardBtn"
                  loading={action === 'save'}
                >
                  Next
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CompanyOwnerWrapper>
  );
};

export default CompanyOwner;