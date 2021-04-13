import React, {useState, useEffect, useRef, useMemo, memo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Formik, Field, Form, useFormikContext, FieldArray} from 'formik';
import filesize from 'filesize.js';
import { PlusCircleOutlined, PaperClipOutlined } from '@ant-design/icons';
import MultiplyIcon from '@iso/components/icons/Multiply';
import MemoPreview from './MemoPreview';
import CalendarIcon from '@iso/components/icons/Calendar';
import Button from '@iso/components/uielements/button';
import InputField from '@iso/components/shared/InputField';
import Input, { InputGroup } from '@iso/components/uielements/input';
import NumberFormat from 'react-number-format';
import Select, { SelectOption } from '@iso/components/uielements/select'
import LocationField from '@iso/components/LocationField';
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import DayPicker from "@iso/components/shared/DayPicker";
import { Row, Col } from 'antd';
import { fetchLocationsRequest } from '@iso/redux/location/actions';
import {
  staffMemoValidationSchema, hourlyContractorMemoValidationSchema, fixedContractorMemoValidationSchema
} from './schema';
import { MemoFormWrapper, MemoFormButtonsWrapper, MemoAttachmentWrapper } from "./MemoForm.style";
import { stringToDate, formatDateString, showServerError } from '@iso/lib/helpers/utility';
import { dateFormat, displayDateFormat } from '@iso/config/datetime.config';
import MemoTypes from '@iso/enums/memo_types';
import MemoCrewTypes from '@iso/enums/memo_crew_types';
import MemoPriceTypes from '@iso/enums/memo_price_types';
import UserTypes from '@iso/enums/user_types';
import notify from '@iso/lib/helpers/notify';
import _ from 'lodash';

const Option = SelectOption;

const DaySelector = ({value, minDay = 1, maxDay = 60, onSelect, ...rest}) => {
  return (
    <Select value={value} onSelect={onSelect} placeholder="Days" {...rest}>
      {_.range(minDay, maxDay + 1).map(day => (
        <Option key={day} value={day}>{day}</Option>
      ))}
    </Select>
  )
};

const FormAttachment = ({attachments, onDelete}) => {
  return (
    <MemoAttachmentWrapper>
      {attachments.map((attachment, index) => (
        <div className="attachment" key={`attachment-${index}`}>
          <div className="nameAndSize">
            <a href={attachment.path} target="_blank" className="name" title={attachment.name}>
              {attachment.name}
            </a>
            <span>({filesize(attachment.size)})</span>
          </div>
          <Button type="link" icon={<MultiplyIcon width={14} height={14} />} onClick={() => onDelete(index)} />
        </div>
      ))}
    </MemoAttachmentWrapper>
  );
};

const initialMemo = {
  agencyFullName: '',
  agencyEmail: '',
  fullName: '',
  position: '',
  email: '',
  shootDates: [],
  city: '',
  state: '',
  memoStaff: MemoCrewTypes.CONTRACTOR_W2,
  priceType: MemoPriceTypes.HOURLY,
  payTerms: 0,
  dailyHours: 0,
  workingDays: 0,
  workingRate: 0,
  kitFee: 0,
  projectRate: 0,
  rates: [],
  attachments: [],
};

const defaultHeadline = (name) =>
  '<p>Hi&nbsp;<strong>' + name + '</strong>,</p>' +
  '<p><br></p>' +
  '<p>Congratulations!&nbsp;<strong>Paul Graf</strong>&nbsp;would like you to hold for this job. Please respond promptly as this memo will only be available for 48 hours.</p>'


const MemoForm = ({job, memoType, contractor, defaultValues, onSubmit, onCancel, onClose}) => {
  const dispatch = useDispatch();
  const { locations } = useSelector(state => state.Location);
  const { error: memoCreateError, loading: memoCreateLoading } = useSelector(state => state.ProducerJob.memoCreate);
  const { error: memoUpdateError, loading: memoUpdateLoading } = useSelector(state => state.ProducerJob.memoUpdate);

  const [action, setAction] = useState('');
  const [memoData, setMemoData] = useState(initialMemo);
  const [locked, setLocked] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [crewType, setCrewType] = useState(null);
  const [priceType, setPriceType] = useState(null);
  const [headline, setHeadline] = useState('');
  const [memoPreview, setMemoPreview] = useState({visible: false, memo: null});
  const [innerAttachments, setInnerAttachments] = useState([]);
  const [validationSchema, setValidationSchema] = useState(null);

  const filePicker = useRef(null);
  const formikRef = useRef(null);

  const isNew = useMemo(() => {
    return contractor.memoId === 'new';
  }, [contractor]);

  const isBooked = useMemo(() => {
    return contractor.booked;
  }, [contractor]);

  const isNoRelationship = useMemo(() => {
    return !contractor.companyRelationship || contractor.companyRelationship === 'NO RELATION';
  }, [contractor]);

  const isContractorRelationship = useMemo(() => {
    return UserTypes.CONTRACTOR.includes(contractor.companyRelationship);
  }, [contractor]);

  const unAnsweredMemo = useMemo(() => {
    return memoType === MemoTypes.DEAL && contractor.memoType === MemoTypes.HOLD;
  }, [contractor]);

  const canCancel = useMemo(() => {
    return !isNew && !unAnsweredMemo;
  }, [contractor]);

  const memoRequestLoading = useMemo(() => {
    return memoCreateLoading || memoUpdateLoading;
  }, [memoCreateLoading, memoUpdateLoading]);

  const memoRequestError = useMemo(() => {
    return memoCreateError || memoUpdateError;
  }, [memoCreateError, memoUpdateError]);

  useEffect(() => {
    dispatch(fetchLocationsRequest());
  }, [dispatch]);

  useEffect(() => {
    setLocked(false);
    let memoData = {...initialMemo};
    if (isNew) {
      memoData = {
        ...memoData,
        ...defaultValues,
        fullName: contractor.fullName,
        position: contractor.jobRole?.jobRoleType?.title,
        email: contractor.email
      };

      if (memoData.shootDates && memoData.shootDates.length) {
        memoData = {...memoData, workingDays: memoData.shootDates.length}
      }

      if (UserTypes.PRODUCER.includes(contractor.companyRelationship)) {
        memoData = {...memoData, memoStaff: MemoCrewTypes.EMPLOYEE};
      } else if (UserTypes.CONTRACTOR.includes(contractor.companyRelationship)) {
        memoData = {...memoData, memoStaff: MemoCrewTypes.CONTRACTOR_W2, priceType: MemoPriceTypes.HOURLY};
      }
    } else {
      memoData = {
        ...memoData,
        ...contractor,
        position: contractor.jobRole?.jobRoleType?.title,
      };

      if (contractor.accepted) {
        setLocked(true);
      }
    }

    setMemoData(memoData);
    setCrewType(memoData.memoStaff);
    setPriceType(memoData.priceType);
    setInnerAttachments(memoData.attachments || []);
    setHeadline(memoData.headline || defaultHeadline(memoData.fullName));
  }, [contractor]);

  useEffect(() => {
    if (isEmployeeMemo(crewType)) {
      setValidationSchema(staffMemoValidationSchema);
    } else {
      setValidationSchema(hourlyContractorMemoValidationSchema);

      if (priceType === MemoPriceTypes.HOURLY) {
        setValidationSchema(hourlyContractorMemoValidationSchema);
      } else if (priceType === MemoPriceTypes.FIXED){
        setValidationSchema(fixedContractorMemoValidationSchema);
      }
    }
  }, [crewType, priceType]);

  useEffect(() => {
    if (unAnsweredMemo) {
      setLocked(true);
      if (contractor.memoStaff === MemoCrewTypes.EMPLOYEE) {
        setFormTitle('Company Staff Hold Memo (Unanswered)');
      } else {
        setFormTitle('Contractor Hold Memo (Unanswered)');
      }

      return
    }

    if (memoType === MemoTypes.DEAL) {
      if (crewType === MemoCrewTypes.EMPLOYEE) {
        setFormTitle('Company Staff Deal Memo');
      } else {
        setFormTitle('Contractor Deal Memo');
      }
    } else {
      if (crewType === MemoCrewTypes.EMPLOYEE) {
        setFormTitle('Company Staff Hold Memo');
      } else {
        setFormTitle('Contractor Hold Memo');
      }
    }
  }, [contractor, memoType, crewType]);

  useEffect(() => {
    if (!memoRequestLoading && !memoRequestError && action === 'save') {
      setMemoData(initialMemo);
      setMemoPreview({visible: false, memo: null})
      onClose();
    }

    if (memoRequestError && action === 'save') {
      notify('error', showServerError(memoRequestError));
    }

    if (!memoRequestLoading && action === 'save') {
      setAction('');
    }
  }, [memoRequestLoading, memoRequestError]);

  const isEmployeeMemo = (crewType) => {
    return crewType === MemoCrewTypes.EMPLOYEE;
  };

  const handleSubmit = (values) => {
    setAction('save');
    values['memoType'] = memoType;
    values['attachments'] = [...innerAttachments];
    values['headline'] = headline;
    onSubmit(values);
  };

  const handleClose = () => {
    onClose();
    setMemoData(initialMemo);
  };

  const handleCancel = () => {
    onCancel(contractor);
  };

  const formatShootDates = (dateStrings = []) => {
    return dateStrings.map(date => stringToDate(date).toDate());
  };

  const onMemoPreviewClick = () => {
    setMemoPreview({
      visible: true,
      memo: {
        ...formikRef.current.values,
        memoType,
        isUnAnswered: unAnsweredMemo,
        headline: headline
      }
    });
  };

  const handleMemoPreview = (type, data) => {
    if (type === 'close') {
      setMemoPreview({visible: false, memo: null});
    }

    if (type === 'update') {
      setHeadline(data);
      setMemoPreview({visible: false, memo: null});
    }

    if (type === 'send') {
      setHeadline(data);
      setMemoPreview({visible: false, memo: null});
      formikRef.current.handleSubmit();
    }
  };

  const openFilePicker = () => {
    filePicker.current.click();
  };

  const onAttachmentLoad = (attachments) => {
    setInnerAttachments([...innerAttachments, ...Array.from(attachments)]);
  };

  const onAttachmentDelete = (index) => {
    const cloned = [...innerAttachments];
    cloned.splice(index, 1);
    setInnerAttachments(cloned);
  };

  const FormButtons = () => {
    const { dirty } = useFormikContext();

    return (
      <MemoFormButtonsWrapper>
        <Row gutter={30}>
          <Col span={12} style={{textAlign: 'left'}}>
            <Button shape="circle" type="secondary" icon={<PaperClipOutlined />} onClick={openFilePicker}>
              <input ref={filePicker} type="file" onChange={(e) => onAttachmentLoad(e.target.files)} multiple />
            </Button>
            <Button shape="round" onClick={onMemoPreviewClick}>Preview</Button>
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            {memoType === MemoTypes.HOLD && (
              <>
                {!isBooked && (
                  <Button
                    shape="round"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                )}
                {canCancel && (
                  <Button
                    type="danger"
                    shape="round"
                    disabled={action === 'save'}
                    onClick={handleCancel}
                  >
                    Cancel Memo
                  </Button>
                )}
                {!locked && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    disabled={!isNew && !dirty}
                    loading={action === 'save'}
                  >
                    {isNew ? 'Send' : 'Update/Resend'}
                  </Button>
                )}
              </>
            )}

            {memoType === MemoTypes.DEAL && (
              <>
                {isNew && (
                  <Button
                    shape="round"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                )}
                {canCancel && (
                  <Button
                    type="danger"
                    shape="round"
                    disabled={action === 'save'}
                    onClick={handleCancel}
                  >
                    Cancel Memo
                  </Button>
                )}
                {!locked && (
                  <Button
                    type="primary"
                    shape="round"
                    htmlType="submit"
                    disabled={!isNew && !dirty}
                    loading={action === 'save'}
                  >
                    {isNew ? 'Save' : isBooked ? 'Update/Resend' : 'Send to Book Crew Page'}
                  </Button>
                )}
              </>
            )}
          </Col>
        </Row>
      </MemoFormButtonsWrapper>
    )
  };

  const AgencyFields = () => {
    const { setFieldValue } = useFormikContext();

    return (
      <>
        <Col span={12}>
          <label className="fieldLabel">Agent Full Name</label>
          <Field
            component={InputField}
            name="agencyFullName"
            type="text"
          />
        </Col>
        <Col span={12}>
          <label className="fieldLabel">Email</label>
          <Field
            component={InputField}
            name="agencyEmail"
            type="text"
            onChange={(e) => setFieldValue('agencyEmail', e.target.value.replace(/\s/g, ''))}
          />
        </Col>
        <Col span={12}>
          <label className="fieldLabel">Talent Full Name</label>
          <Field
            component={InputField}
            name="fullName"
            type="text"
          />
        </Col>
        <Col span={12}>
          <label className="fieldLabel">Email</label>
          <Field
            component={InputField}
            name="email"
            type="text"
            onChange={(e) => setFieldValue('email', e.target.value.replace(/\s/g, ''))}
          />
        </Col>
      </>
    );
  }

  const NoAgencyFields = () => {
    const { setFieldValue } = useFormikContext();

    return (
      <>
        <Col span={12}>
          <label className="fieldLabel">Full Name</label>
          <Field
            component={InputField}
            name="fullName"
            type="text"
          />
        </Col>
        <Col span={12}>
          <label className="fieldLabel">Email</label>
          <Field
            component={InputField}
            name="email"
            type="text"
            onChange={(e) => setFieldValue('email', e.target.value.replace(/\s/g, ''))}
          />
        </Col>
      </>
    );
  };

  return (
    <MemoFormWrapper>
      <div className="MemoHeader">
        <h3 className="title">{formTitle}</h3>
        <Button type="link" onClick={handleClose}><MultiplyIcon width={16} height={16} /></Button>
      </div>
      <div className="MemoBody">
        <Formik
          enableReinitialize
          innerRef={formikRef}
          initialValues={memoData}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, touched, errors, setFieldValue }) => (
            <Form className="MemoForm">
              <div className="topField">
                <div className="formGroup">
                  {isNoRelationship && (
                    <RadioGroup
                      value={crewType}
                      onChange={(e) => {
                        setFieldValue('memoStaff', e.target.value);
                        setCrewType(e.target.value);
                      }}
                    >
                      <Radio value={MemoCrewTypes.CONTRACTOR_W2}>Contractor W2</Radio>
                      <Radio value={MemoCrewTypes.CONTRACTOR_W9}>Contractor W9</Radio>
                      <Radio value={MemoCrewTypes.EMPLOYEE}>Employee</Radio>
                      <Radio value={MemoCrewTypes.AGENCY}>Agency</Radio>
                    </RadioGroup>
                  )}

                  {isContractorRelationship && (
                    <RadioGroup
                      value={crewType}
                      onChange={(e) => {
                        setFieldValue('memoStaff', e.target.value);
                        setCrewType(e.target.value);
                      }}
                    >
                      <Radio value={MemoCrewTypes.CONTRACTOR_W2}>Contractor W2</Radio>
                      <Radio value={MemoCrewTypes.CONTRACTOR_W9}>Contractor W9</Radio>
                      <Radio value={MemoCrewTypes.EMPLOYEE} disabled={true}>Employee</Radio>
                      <Radio value={MemoCrewTypes.AGENCY}>Agency</Radio>
                    </RadioGroup>
                  )}
                </div>

                <Row gutter={[20, 20]}>
                  {crewType === MemoCrewTypes.AGENCY ? <AgencyFields /> : <NoAgencyFields />}

                  <Col span={12}>
                    <label className="fieldLabel">Position</label>
                    <Field
                      component={InputField}
                      name="position"
                      type="text"
                      disabled={true}
                    />
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">Dates</label>
                    <Field>
                      {() => (
                        <DayPicker
                          className="fieldControl w-180"
                          placeholder="Select date"
                          suffixIcon={<CalendarIcon width={20} height={18} fill="#bcbccb"/>}
                          showDaysCount={true}
                          values={formatShootDates(values.shootDates)}
                          onChange={(dates) => {
                            const dateStrings = dates.map(date => formatDateString(date, dateFormat));
                            setFieldValue('shootDates', dateStrings);
                            setFieldValue('workingDays', dates.length);
                          }}
                        />
                      )}
                    </Field>
                    {touched.shootDates && errors.shootDates && (
                      <div className="helper-text lowercase">{errors.shootDates}</div>
                    )}
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">City</label>
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
                  <Col span={6}>
                    <label className="fieldLabel">State</label>
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
                  <Col span={6}>
                    <label className="fieldLabel">Pay Terms</label>
                    <Field>
                      {() => (
                        <Input
                          addonBefore="NET"
                          value={values.payTerms || ''}
                          onChange={(e) => setFieldValue('payTerms', e.target.value)}
                          placeholder="Days"
                        />
                      )}
                    </Field>
                    {touched.payTerms && errors.payTerms && (
                      <div className="helper-text lowercase">{errors.payTerms}</div>
                    )}
                  </Col>
                </Row>
              </div>
              <div className="middleField">
                <Row gutter={[20, 20]} className={locked ? 'locked' : ''}>
                  <Col span={12} className="hourlyFieldWrapper">
                    <Row gutter={30}>
                      <Col span={14}>
                        <RadioGroup
                          className="priceTypeOption"
                          name="priceType"
                          value={values.priceType}
                          onChange={(e) => {
                            setFieldValue('priceType', e.target.value);
                            setPriceType(e.target.value);
                          }}
                        >
                          <Radio value={MemoPriceTypes.HOURLY} disabled={isEmployeeMemo(crewType)}>
                            <span className="radioLabel">Day Rate</span>
                          </Radio>
                        </RadioGroup>
                        <InputGroup compact>
                          <DaySelector
                            style={{width: '40%'}}
                            disabled={(values.priceType === MemoPriceTypes.FIXED) || isEmployeeMemo(crewType)}
                            value={values.workingDays || null}
                            onSelect={(value) => setFieldValue('workingDays', value)}
                          />
                          <NumberFormat
                            style={{width: '60%'}}
                            disabled={(values.priceType === MemoPriceTypes.FIXED) || isEmployeeMemo(crewType)}
                            value={values.workingRate || ''}
                            allowEmptyFormatting={true}
                            thousandSeparator={true}
                            prefix="$"
                            customInput={Input}
                            onValueChange={(price) => {
                              setFieldValue('workingRate', price.floatValue || 0)
                            }}
                          />
                        </InputGroup>
                        {(values.priceType === MemoPriceTypes.HOURLY) && touched.workingDays && errors.workingDays && (
                          <div className="helper-text lowercase">{errors.workingDays}</div>
                        )}
                        {(values.priceType === MemoPriceTypes.HOURLY) && touched.workingRate && errors.workingRate && (
                          <div className="helper-text lowercase">{errors.workingRate}</div>
                        )}
                      </Col>

                      <Col span={10}>
                        <label className="fieldLabel">Hours Per Day</label>
                        <Field name="dailyHours">
                          {() => (
                            <Input
                              type="number"
                              value={values.dailyHours || ''}
                              onChange={(e) => setFieldValue('dailyHours', e.target.value)}
                              disabled={(values.priceType === MemoPriceTypes.FIXED) || isEmployeeMemo(crewType)}
                            />
                          )}
                        </Field>
                        {(values.priceType === MemoPriceTypes.HOURLY) && touched.dailyHours && errors.dailyHours && (
                          <div className="helper-text lowercase">{errors.dailyHours}</div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6} className="fixedFieldWrapper">
                    <RadioGroup
                      className="priceTypeOption"
                      name="priceType"
                      value={values.priceType}
                      onChange={(e) => {
                        setFieldValue('priceType', e.target.value);
                        setPriceType(e.target.value);
                      }}
                    >
                      <Radio value={MemoPriceTypes.FIXED} disabled={isEmployeeMemo(crewType)}>
                        <span className="radioLabel">Project Rate</span>
                      </Radio>
                    </RadioGroup>
                    <NumberFormat
                      disabled={(values.priceType === MemoPriceTypes.HOURLY) || isEmployeeMemo(crewType)}
                      value={values.projectRate || ''}
                      thousandSeparator={true}
                      allowEmptyFormatting={true}
                      prefix="$"
                      customInput={Input}
                      onValueChange={(price) => {
                        setFieldValue('projectRate', price.floatValue || 0)
                      }}
                    />
                    {(values.priceType === MemoPriceTypes.FIXED) && touched.projectRate && errors.projectRate && (
                      <div className="helper-text lowercase">{errors.projectRate}</div>
                    )}
                  </Col>
                  <Col span={6}>
                    <label className="fieldLabel">Kit Fee - <i>Optional</i></label>
                    <NumberFormat
                      disabled={isEmployeeMemo(crewType)}
                      value={values.kitFee || ''}
                      thousandSeparator={true}
                      allowEmptyFormatting={true}
                      prefix="$"
                      customInput={Input}
                      onValueChange={(price) => {
                        setFieldValue('kitFee', price.floatValue || 0)
                      }}
                    />
                  </Col>
                </Row>
              </div>
              <div className="bottomField">
                <FieldArray
                  name="rates"
                >
                  {(arrayHelpers) => (
                    <>
                      {values.rates.length > 0 && (
                        <div className="rateList">
                          {values.rates.map((staff, index) => (
                            <Row gutter={30}>
                              <Col flex="auto">
                                <label className="fieldLabel">Rate Field Title</label>
                                <Field  name={`rates[${index}].title`} component={InputField} type="text" />
                              </Col>
                              <Col flex="190px">
                                <RadioGroup
                                  className="rateTypeOption"
                                  name={`rates[${index}].type`}
                                  onChange={(e) => {
                                  }}
                                >
                                  <Radio value="HOURLY">
                                    <span className="radioLabel">&nbsp;</span>
                                  </Radio>
                                </RadioGroup>
                                <InputGroup compact>
                                  <DaySelector
                                    style={{width: '40%'}}
                                  />
                                  <NumberFormat
                                    style={{width: '60%'}}
                                    allowEmptyFormatting={true}
                                    thousandSeparator={true}
                                    prefix="$"
                                    customInput={Input}
                                  />
                                </InputGroup>
                              </Col>
                              <Col flex="120px">
                                <RadioGroup
                                  className="rateTypeOption"
                                  name={`rates[${index}].type`}
                                  onChange={(e) => {
                                  }}
                                >
                                  <Radio value="FIXED">
                                    <span className="radioLabel">&nbsp;</span>
                                  </Radio>
                                </RadioGroup>
                                <NumberFormat
                                  thousandSeparator={true}
                                  allowEmptyFormatting={true}
                                  prefix="$"
                                  customInput={Input}
                                />
                              </Col>
                              <Col flex="270px">
                                <label className="fieldLabel">&nbsp;</label>
                                <Button type="primary" shape="round">Add</Button>
                                <Button type="danger" shape="round" onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      )}
                      <Button type="link" className="addRateFieldBtn" onClick={() => arrayHelpers.push({title: ''})}><PlusCircleOutlined /> Add Rate Field</Button>
                    </>
                  )}
                </FieldArray>
              </div>
              <FormButtons />
              {innerAttachments.length > 0 && (<FormAttachment attachments={innerAttachments} onDelete={onAttachmentDelete} />)}
            </Form>
          )}
        </Formik>
      </div>
      <MemoPreview visible={memoPreview.visible} job={job} memo={memoPreview.memo} setModalData={handleMemoPreview} />
    </MemoFormWrapper>
  );
};

export default MemoForm;
