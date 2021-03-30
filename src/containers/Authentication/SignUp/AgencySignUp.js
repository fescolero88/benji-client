import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';
import { InputField } from '@iso/components';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button'
import LocationField from '@iso/components/LocationField';
import ZipCode from '@iso/components/shared/ZipCode';
import IntlMessages from '@iso/components/utility/intlMessages';
import { agencyValidationSchema } from './schema';
import basicStyle from '@iso/assets/styles/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Empty_Avatar from '@iso/assets/images/avatar.png';
import { maxFileUploadSize } from '@iso/config/env';
import ImageUpload from '@iso/components/ImageUpload';
import { fetchLocationsRequest } from '@iso/redux/location/actions';

export default ({user}) => {
  let history = useHistory();
  let location = useLocation();
  const dispatch = useDispatch();
  const { rowStyle, colStyle, gutter } = basicStyle;
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  const [profileFile, setProfileFile] = useState(null);
  const { locations } = useSelector(state => state.Location);

  const signUpFields = {
    id: user?.id,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    companyTitle: '',
    companyRelationship: 'STAFF',
    password: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    email: user?.email || '',
    title: '',
    website: '',
    acceptTerms: false,
    profilePhotoS3Url: ''
  };

  useEffect(() => {
    dispatch(fetchLocationsRequest());
  }, [dispatch]);

  const handleSignUp = (values) => {
    console.log('Coming soon')
  };

  const onTogglePassword = (event) => {
    setIsRevealPassword(!isRevealPassword);
  };

  const onToggleConfirmPassword = (event) => {
    setIsRevealConfirmPassword(!isRevealConfirmPassword);
  };

  const SignUpForm = ({ values, touched, errors, setFieldValue, isValid }) => {
    return (
      <Form>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col span={24}>
            <ImageUpload defaultImage={Empty_Avatar} maxSize={maxFileUploadSize} />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Company Name</span>
            <Field
              component={InputField}
              name="companyTitle"
              type="text"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Job Title</span>
            <Field
              component={InputField}
              name="title"
              type="text"
            />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">First Name</span>
            <Field
              component={InputField}
              name="firstName"
              type="text"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Last Name</span>
            <Field
              component={InputField}
              name="lastName"
              type="text"
            />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Email</span>
            <Field
              component={InputField}
              name="email"
              type="text"
              onChange={(e) => setFieldValue('email', e.target.value.replace(/\s/g, ''))}
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Phone</span>
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
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24}>
            <span className="field-label">Website</span>
            <Field
              component={InputField}
              name="website"
              type="text"
            />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={19} sm={19} xs={24}>
            <span className="field-label required">Business Address</span>
            <Field
              component={InputField}
              name="street"
              type="text"
            />
          </Col>
          <Col md={5} sm={5} xs={24}>
            <span className="field-label required">Zip</span>
            <Field name="zipCode">
              {() => (
                <ZipCode value={values.zipCode} onChange={(zipCode) => setFieldValue('zipCode', zipCode)} />
              )}
            </Field>
            {touched.zipCode && errors.zipCode && (
              <div className="helper-text lowercase">{errors.zipCode}</div>
            )}
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">City</span>
            <Field
              name="city"
            >
              {() => (
                <LocationField
                  value={values.city}
                  locations={locations.city}
                  onChange={(city) => setFieldValue('city', city)}
                />
              )}
            </Field>
            {touched.city && errors.city && (
              <div className="helper-text lowercase">{errors.city}</div>
            )}
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">State</span>
            <Field>
              {() => (
                <LocationField
                  value={values.state}
                  locations={locations.state}
                  onChange={(state) => setFieldValue('state', state)}
                />
              )}
            </Field>
            {touched.state && errors.state && (
              <div className="helper-text lowercase">{errors.state}</div>
            )}
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Password</span>
            <Field
              component={InputField}
              name="password"
              type={ isRevealPassword? "text": "password" }
            />
            <span onClick={onTogglePassword}>
              <span>
                {isRevealPassword ?
                  <FontAwesomeIcon icon={faEye} className="eye-icon"/> :
                  <FontAwesomeIcon icon={faEyeSlash} className="eye-icon"/>
                }
              </span>
            </span>
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Confirm Password</span>
            <Field
              component={InputField}
              name="confirmPassword"
              type={ isRevealConfirmPassword? "text": "password" }
            />
            <span onClick={onToggleConfirmPassword}>
              <span>
                {isRevealConfirmPassword ?
                  <FontAwesomeIcon icon={faEye} className="eye-icon"/> :
                  <FontAwesomeIcon icon={faEyeSlash} className="eye-icon"/>
                }
              </span>
            </span>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <div className="form-group form-check">
              <Field type="checkbox" name="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
              <label htmlFor="acceptTerms" className="form-check-label">&nbsp;&nbsp;I agree to the Benji&nbsp;
                <Link to="/term-of-service" className="isoTosButton">
                  <IntlMessages id="page.termOfService" />
                </Link>
                &nbsp;and&nbsp;
                <Link to="/privacy-policy" className="isoPrivacyButton">
                  <IntlMessages id="page.privacyPolicy" />
                </Link>
              </label>
              <ErrorMessage name="acceptTerms" component="div" className="helper-text" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={24}>
            <Button type="submit" disabled={true}>
              <IntlMessages id="page.confirm" />
            </Button>
          </Col>
        </Row>
      </Form>
    )
  };

  return (
    <Row style={rowStyle} justify="center">
      <Col xxl={12} md={16} sm={24} xs={24}>
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoSignUpForm">
              <Formik
                initialValues={signUpFields}
                onSubmit={handleSignUp}
                validationSchema={agencyValidationSchema}
                component={SignUpForm}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
