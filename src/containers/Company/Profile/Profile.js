import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { Formik, Field, Form } from 'formik';
import NumberFormat from "react-number-format";
import { uploadFile } from '@iso/lib/helpers/s3';
import Button from '@iso/components/uielements/button';
import { InputField } from '@iso/components';
import ZipCode from '@iso/components/shared/ZipCode';
import LocationField from '@iso/components/LocationField';
import basicStyle from '@iso/assets/styles/constants';
import { maxFileUploadSize } from '@iso/config/env';
import Input from '@iso/components/uielements/input';
import ImageUpload from '@iso/components/ImageUpload/ImageUpload';
import ProfileWrapper from '@iso/containers/Profile';
import ErrorComponent from '@iso/components/ErrorComponent';
import SuccessText from '@iso/components/utility/successText';
import schema from './schema';
import { fetchCompanyProfileRequest, updateCompanyProfileRequest } from '@iso/redux/company/actions';
import { fetchLocationsRequest } from '@iso/redux/location/actions';
import { syncAuthUserRequest } from '@iso/redux/auth/actions';
import Loader from '@iso/components/utility/loader';
import _ from 'lodash';

const { rowStyle, colStyle, gutter } = basicStyle;

export default () => {
  const dispatch = useDispatch();
  const { error: updateProfileError, loading: updateProfileLoading } = useSelector(state => state.Company.updateProfile)
  const { companyId } = useSelector(state => state.ProducerJob);
  const { profile, fetchProfile } = useSelector(state => state.Company);
  const { locations } = useSelector(state => state.Location);

  const [uploadErrorMsg, setUploadErrorMsg] = useState('');
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [originProfileImage, setOriginProfileImage] = useState(null);
  const [companyProfile, setCompanyProfile] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const formikRef = useRef();

  useEffect(() => {
    dispatch(fetchCompanyProfileRequest(companyId));
    dispatch(fetchLocationsRequest());
  }, [companyId]);

  useEffect(() => {
    if (profile && profile.id) {
      setCompanyProfile(profile);
      setProfileImage(profile.profilePhotoS3Url);
      setOriginProfileImage(profile.originProfilePhotoS3Url);
    }
  }, [profile]);

  useEffect(() => {
    if (!updateProfileLoading && !updateProfileError && loader) {
      setSuccessMsg('Company profile saved successfully');
      dispatch(syncAuthUserRequest());
    }

    if (!updateProfileLoading && loader) {
      setLoader(false);
    }
  }, [updateProfileError, updateProfileLoading]);

  const handleProfileImage = (file) => {
    setProfileImage(file);
  };

  const handleOriginProfileImage = (file) => {
    setOriginProfileImage(file);
  };

  const handleUpdateProfile = async (values) => {
    const payload = _.cloneDeep(values);
    setUploadErrorMsg('');
    setSuccessMsg('');
    setLoader(true);

    if (profileImage instanceof File) {
      const profileS3DirName = process.env.REACT_APP_S3_BUCKET_PROFILE_DIRNAME;
      const s3File = await uploadFile(profileImage, profileS3DirName);

      if (s3File.error || !s3File.location) {
        setUploadErrorMsg('Image upload failed');
        setLoader(false);
        return;
      } else {
        payload["profilePhotoS3Url"] = s3File.location;
      }
    } else {
      payload["profilePhotoS3Url"] = profileImage;
    }

    if (originProfileImage instanceof File) {
      const profileS3DirName = process.env.REACT_APP_S3_BUCKET_PROFILE_DIRNAME;
      const s3Fileorigin = await uploadFile(originProfileImage, profileS3DirName);

      if (s3Fileorigin.error || !s3Fileorigin.location) {
        setUploadErrorMsg('Image upload failed');
        setLoader(false);
        return;
      } else {
        payload["originProfilePhotoS3Url"] = s3Fileorigin.location;
      }
    } else {
      payload["originProfilePhotoS3Url"] = originProfileImage;
    }

    await dispatch(updateCompanyProfileRequest(companyId, payload));
  };

  if (fetchProfile.loading) {
    return <Loader />;
  }

  return (
    <ProfileWrapper>
      <Row className="section">
        <Col md={16} xs={24}>
          <h3 className="sectionTitle">Company Profile Settings</h3>
          <div className="sectionField">
            <ImageUpload 
              image={profileImage}
              originImage={originProfileImage}
              maxSize={maxFileUploadSize}
              onChange={handleProfileImage}
              onOriginChange={handleOriginProfileImage}
            />
            {uploadErrorMsg && (
              <div className="helper-text lowercase">{uploadErrorMsg}</div>
            )}
          </div>
        </Col>
      </Row>
      <Row className="section">
        <Col md={16} xs={24}>
          <h3 className="sectionTitle">Information</h3>
          <div className="sectionField">
            <Formik
              enableReinitialize
              innerRef={formikRef}
              initialValues={companyProfile}
              validationSchema={schema}
              onSubmit={handleUpdateProfile}
            >
              { ({values, touched, errors, setFieldValue, isSubmitting}) => (
                <Form>
                  <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">Company Name</span>
                      <Field
                        component={InputField}
                        name="title"
                        type="text"
                      />
                    </Col>
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">Job Title</span>
                      <Field
                        component={InputField}
                        name="owner.jobTitle"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">First Name</span>
                      <Field
                        component={InputField}
                        name="owner.firstName"
                        type="text"
                      />
                    </Col>
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">Last Name</span>
                      <Field
                        component={InputField}
                        name="owner.lastName"
                        type="text"
                      />
                    </Col>
                  </Row>

                  <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">Company Email</span>
                      <Field
                        component={InputField}
                        name="email"
                        type="text"
                        onChange={(e) => setFieldValue('email', e.target.value.replace(/\s/g, ''))}
                      />
                    </Col>
                    <Col md={12} sm={12} xs={24}>
                      <span className="fieldLabel required">Company Phone</span>
                      <Field name="phone">
                        {() => (
                          <NumberFormat
                            customInput={Input}
                            format="+1 (###) ###-####"
                            mask="_"
                            value={values.phone}
                            onValueChange={(phone) => setFieldValue('phone', phone.value)}
                          />
                        )}
                      </Field>
                      {touched.phone && errors.phone && (
                        <div className="helper-text lowercase">{errors.phone}</div>
                      )}
                    </Col>
                  </Row>

                  <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={19} sm={19} xs={24}>
                      <span className="fieldLabel required">Address</span>
                      <Field
                        component={InputField}
                        name="street"
                        type="text"
                      />
                    </Col>
                    <Col md={5} sm={5} xs={24}>
                      <span className="fieldLabel required">Zip</span>
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
                      <span className="fieldLabel required">City</span>
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
                      <span className="fieldLabel required">State</span>
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
                      <span className="fieldLabel required">Website</span>
                      <Field
                        component={InputField}
                        name="website"
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} sm={12} xs={24}>
                      {!loader && updateProfileError && <ErrorComponent error={updateProfileError} />}
                      {successMsg && <SuccessText text={successMsg} />}
                      <Button htmlType="submit" type="primary" loading={loader}>Save</Button>
                      <Button style={{marginLeft: '10px'}}>Cancel</Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </ProfileWrapper>
  );
}
