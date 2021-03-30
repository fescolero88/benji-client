import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import NumberFormat from 'react-number-format';
import Button from '@iso/components/uielements/button';
import * as authAction from '@iso/redux/auth/actions';
import appAction from '@iso/redux/app/actions';
import { InputField } from '@iso/components';
import Input from '@iso/components/uielements/input';
import DateInput from '@iso/components/DateInput';
import LocationField from '@iso/components/LocationField';
import ZipCode from '@iso/components/shared/ZipCode';
import IntlMessages from '@iso/components/utility/intlMessages';
import { accountValidationSchema } from './schema';
import basicStyle from '@iso/assets/styles/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { maxFileUploadSize } from '@iso/config/env'
import { uploadFile } from '@iso/lib/helpers/s3';
import { USER_SIGNUP, INVITE_SIGNUP } from '@iso/redux/auth/constants';
import ImageUpload from '@iso/components/ImageUpload/ImageUpload';
import Logo from '@iso/assets/images/logo.svg';
import ErrorComponent from '@iso/components/ErrorComponent';
import { fetchLocationsRequest } from '@iso/redux/location/actions';
import { formatDateString } from '@iso/lib/helpers/utility';

const { signupRequest } = authAction;
const { clearMenu } = appAction;

const buttonMargin = {
  marginLeft: '10px'
};

const { rowStyle, gutter } = basicStyle;

export default ({ user, onSuccess }) => {
  let history = useHistory();
  let location = useLocation();
  const formikRef = useRef();

  const dispatch = useDispatch();
  const { user: signUpUser, error: signUpError, loading: signUpLoading } = useSelector(state => state.Auth.signup);
  const { locations } = useSelector(state => state.Location);

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [isRevealConfirmPassword, setIsRevealConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [originProfileImage, setOriginProfileImage] = useState(null);
  const [isImageUploadFailed, setIsImageUploadFailed] = useState(false);
  const [s3Loader, setS3Loader] = useState(false);

  useEffect(() => {
    dispatch(fetchLocationsRequest());
  }, [location, dispatch]);

  useEffect(() => {
    if (signUpUser && !signUpLoading && !signUpError) {
      onSuccess(signUpUser);
    }
  }, [signUpUser, signUpLoading, signUpError]);

  const signUpFields = {
    id: user?.id,
    jobTitle: user?.jobTitle || '',
    nickname: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    birthday: '',
    phone: '',
    companyRelationship: 'CONTRACTOR',
    companyTitle: user?.companyTitle || '',
    password: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    companyName: user?.companyName || '',
    union: '',
    vimeo: '',
    website: '',
    acceptTerms: false,
    profilePhotoS3Url: ''
  };

  const handleProfileImage = (file) => {
    setProfileImage(file);
  };

  const handleOriginProfileImage = (file) => {
    setOriginProfileImage(file);
  };

  const handleSignUp = async (values) => {
    const signUpType = user?.id ? INVITE_SIGNUP : USER_SIGNUP;

    try {
      setS3Loader(true);
      setIsImageUploadFailed(false);

      if (profileImage instanceof File) {
        const dirName = process.env.REACT_APP_S3_BUCKET_PROFILE_DIRNAME;
        const s3File = await uploadFile(profileImage, dirName);

        if (s3File.location) {
          values["profilePhotoS3Url"] = s3File.location;
        }
      } else {
        values["profilePhotoS3Url"] = profileImage;
      }

      if (originProfileImage instanceof File) {
        const dirName = process.env.REACT_APP_S3_BUCKET_PROFILE_DIRNAME;
        const s3FileOrigin = await uploadFile(originProfileImage, dirName);

        if (s3FileOrigin.location) {
          values["originProfilePhotoS3Url"] = s3FileOrigin.location;
        }
      } else {
        values["originProfilePhotoS3Url"] = originProfileImage;
      }
      setS3Loader(false);
      const birthday = formatDateString(values.birthday, 'YYYY-MM-DD')
      dispatch(signupRequest({ formData: { ...values, birthday }, signUpType, history }));
      dispatch(clearMenu());
    } catch (e) {
      setIsImageUploadFailed(true);
      setS3Loader(false);
    }
  };

  const onTogglePassword = (event) => {
    setIsRevealPassword(!isRevealPassword);
  };

  const onToggleConfirmPassword = (event) => {
    setIsRevealConfirmPassword(!isRevealConfirmPassword);
  };

  const SignUpForm = ({ values, touched, errors, setFieldValue, isSubmitting }) => {
    return (
      <Form>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label required">Primary Job Role</span>
            <Field
              component={InputField}
              name="jobTitle"
              type="text"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label">Nickname</span>
            <Field
              component={InputField}
              name="nickname"
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
          <Col md={8} sm={12} xs={24}>
            <span className="field-label required">Email</span>
            <Field
              component={InputField}
              name="email"
              type="text"
              disabled={user.email}
              onChange={(e) => setFieldValue('email', e.target.value.replace(/\s/g, ''))}
            />
          </Col>
          <Col md={8} sm={12} xs={24}>
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
          <Col md={8} sm={12} xs={24}>
            <span className="field-label required">Date of Birth</span>
            <DateInput inputValue={values.birthday}
              onChangeDateInput={(date) => setFieldValue('birthday', date)} />
            {touched.birthday && errors.birthday && (
              <div className="helper-text lowercase">{errors.birthday}</div>
            )}
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24}>
            <span className="field-label required">Home Address</span>
            <Field
              component={InputField}
              name="street"
              type="text"
            />
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
          <Col md={8} sm={8} xs={24}>
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
          <Col md={4} sm={4} xs={24}>
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
            <span className="field-label">Company Name</span>
            <Field
              component={InputField}
              name="companyName"
              type="text"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label">Union Number</span>
            <Field
              component={InputField}
              name="union"
              type="text"
            />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24}>
            <span className="field-label">Vimeo</span>
            <Field
              component={InputField}
              name="vimeo"
              type="text"
            />
          </Col>
          <Col md={12} sm={12} xs={24}>
            <span className="field-label">Website</span>
            <Field
              component={InputField}
              name="website"
              type="text"
            />
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} className="password-input-wrapper">
            <span className="field-label required">Password</span>
            <Field
              component={InputField}
              name="password"
              type={isRevealPassword ? "text" : "password"}
            />
            <span onClick={onTogglePassword}>
              <span>
                {isRevealPassword ?
                  <FontAwesomeIcon icon={faEye} className="eye-icon" /> :
                  <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
                }
              </span>
            </span>
          </Col>
          <Col md={12} sm={12} xs={24} className="password-input-wrapper">
            <span className="field-label required">Confirm Password</span>
            <Field
              component={InputField}
              name="confirmPassword"
              type={isRevealConfirmPassword ? "text" : "password"}
            />
            <span onClick={onToggleConfirmPassword}>
              <span>
                {isRevealConfirmPassword ?
                  <FontAwesomeIcon icon={faEye} className="eye-icon" /> :
                  <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" />
                }
              </span>
            </span>
          </Col>
        </Row>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={12} sm={12} xs={24} className="password-placeholder">
            Use 8 or more characters with a mix of letters, numbers & symbols
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
          <Col span={24}>
            {(!signUpLoading && signUpError) && <ErrorComponent error={signUpError} />}
            <Button htmlType="submit" type="primary" loading={s3Loader || signUpLoading}>Confirm</Button>
            <Link to="/login">
              <Button htmlType="button" style={buttonMargin}>Cancel</Button>
            </Link>
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
            <div className="logoWrapper">
              <img src={Logo} className="logo" />
            </div>
            <h2 className="signUpTitle">Create your Benji Account</h2>

            <div className="isoSignUpForm">
              <Row style={rowStyle} gutter={gutter} justify="start">
                <Col span={24}>
                  <ImageUpload
                    image={profileImage}
                    originImage={originProfileImage}
                    maxSize={maxFileUploadSize}
                    onChange={handleProfileImage}
                    onOriginChange={handleOriginProfileImage}
                    shape="rounded"
                  />
                  {isImageUploadFailed && (
                    <div className="helper-text lowercase">Uploading Image Failed</div>
                  )}
                </Col>
              </Row>
              <Formik
                innerRef={formikRef}
                enableReinitialize
                initialValues={signUpFields}
                onSubmit={handleSignUp}
                validationSchema={accountValidationSchema}
                component={SignUpForm}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
