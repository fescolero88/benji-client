import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import InvoiceMemoWrapper, { InvoiceMemoSectionTitle } from './InvoiceMemo.style';
import MemoPreview from '../routes/JobDetails/MemoForm/MemoPreview';
import MemoAttachments from './MemoAttachments';
import Modal from '@iso/components/Modal';
import { Formik, Form, Field } from 'formik';
import {Collapse, Col, Row} from 'antd';
import Input, { InputGroup, Textarea } from '@iso/components/uielements/input';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Button from '@iso/components/uielements/button';
import NumberFormat from "react-number-format";
import Radio, { RadioGroup } from '@iso/components/uielements/radio';
import LocationField from '@iso/components/LocationField';
import { PaperClipOutlined, InfoCircleFilled } from '@ant-design/icons';
import MemoPriceTypes from '@iso/enums/memo_price_types';
import MemoCrewTypes from '@iso/enums/memo_crew_types';
import { hourlyMemoValidationSchema, fixedMemoValidationSchema } from './schema';
import { updateInvoiceMemoRequest } from '@iso/redux/jobInvoice/actions'
import { fetchLocationsRequest } from '@iso/redux/location/actions';
import { uploadFile } from '@iso/lib/helpers/s3';
import notify from '@iso/lib/helpers/notify';
import _ from 'lodash';

const { Panel } = Collapse;
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

const InvoiceMemo = ({job, memo, setModalData}) => {
  const dispatch = useDispatch();
  const { locations } = useSelector(state => state.Location);
  const { updateInvoiceMemo } = useSelector(state => state.JobInvoice);
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    priceType: MemoPriceTypes.HOURLY,
    dailyHours: 0,
    workingDays: 0,
    workingRate: 0,
    travelDays: 0,
    travelRate: 0,
    kitFee: 0,
    projectRate: 0,
    notes: ''
  });
  const [validationSchema, setValidationSchema] = useState(null);
  const [priceType, setPriceType] = useState('');
  const [headline, setHeadline] = useState('');
  const [action, setAction] = useState('');
  const [memoPreview, setMemoPreview] = useState({visible: false, memo: null});
  const [innerAttachments, setInnerAttachments] = useState([]);

  const filePicker = useRef(null);
  const formikRef = useRef(null);

  useEffect(() => {
    dispatch(fetchLocationsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (memo.invoiceMemo) {
      setFormData(memo.invoiceMemo);
      setPriceType(memo.invoiceMemo.priceType);
      setInnerAttachments(memo.attachments);
      setHeadline(memo.headline);
    }
  }, [memo]);

  useEffect(() => {
    if (!updateInvoiceMemo.loading && !updateInvoiceMemo.error && action === 'update_invoice_memo') {
      setModalData('close');
    }

    if (!updateInvoiceMemo.loading && action === 'update_invoice_memo') {
      setAction('');
    }
  }, [updateInvoiceMemo]);

  useEffect(() => {
    if (priceType === MemoPriceTypes.HOURLY) {
      setValidationSchema(hourlyMemoValidationSchema);
    } else {
      setValidationSchema(fixedMemoValidationSchema);
    }
  }, [priceType]);

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

  const onMemoPreviewClick = () => {
    setMemoPreview({
      visible: true,
      memo: {
        ...memo,
        ...formikRef.current.values,
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

  const handleCancel = () => {
    setModalData('close');
  };

  const handleSubmit = async (values) => {
    setAction('update_invoice_memo');
    const attachments = [...innerAttachments];
    if (attachments && attachments.length > 0) {
      const queue = [];
      attachments.map((attachment, index) => {
        if (attachment instanceof File) {
          const memoAttachmentDirName = process.env.REACT_APP_S3_BUCKET_MEMO_ATTACHMENT_DIRNAME;
          queue.push(uploadFile(attachment, memoAttachmentDirName)
            .then(document => {
              if (document.location) {
                attachments[index] = {
                  name: attachment.name,
                  size: attachment.size,
                  type: attachment.type,
                  path: document.location
                };
              }
            })
          );
        }
      });

      await Promise.all(queue)
        .then(() => console.log('upload success'))
        .catch(err => notify('error', err.message));
    }
    const payload = _.cloneDeep({...values, attachments: attachments, headline: headline});
    dispatch(updateInvoiceMemoRequest(values.id, payload))
  };

  return (
    <Modal
      visible={true}
      width={950}
      title="Contractor Deal Memo"
      bodyStyle={{padding: 0}}
      footer={null}
      onCancel={handleCancel}
    >
      <InvoiceMemoWrapper>
        <div className="jobMemoWrapper">
          <Collapse ghost defaultActiveKey={['job-memo']} expandIconPosition="right" className="jobMemoCollapse">
            <Panel
              header={<InvoiceMemoSectionTitle>Deal Memo</InvoiceMemoSectionTitle>}
              key="job-memo"
            >
              <div className="topField">
                <div className="formGroup">
                  <RadioGroup
                    disabled
                    value={memo.memoStaff}
                  >
                    <Radio value={MemoCrewTypes.CONTRACTOR_W2}>Contractor W2</Radio>
                    <Radio value={MemoCrewTypes.CONTRACTOR_W9}>Contractor W9</Radio>
                    <Radio value={MemoCrewTypes.EMPLOYEE}>Employee</Radio>
                    <Radio value={MemoCrewTypes.AGENCY}>Agency</Radio>
                  </RadioGroup>
                </div>
                <Row gutter={[20, 20]}>
                  <Col span={12}>
                    <label className="fieldLabel">Full Name</label>
                    <Input
                      value={memo.fullName}
                      disabled={true}
                    />
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">Email</label>
                    <Input
                      value={memo.email}
                      disabled={true}
                    />
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">Position</label>
                    <Input
                      value={memo.position}
                      disabled={true}
                    />
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">Dates</label>
                    <Input
                      value={`${memo.shootDates.length} days | ${memo.dates}`}
                      disabled={true}
                    />
                  </Col>
                  <Col span={12}>
                    <label className="fieldLabel">City</label>
                    <Input
                      value={memo.city}
                      disabled={true}
                    />
                  </Col>
                  <Col span={6}>
                    <label className="fieldLabel">State</label>
                    <Input
                      value={memo.state}
                      disabled={true}
                    />
                  </Col>
                  <Col span={6}>
                    <label className="fieldLabel">Pay Terms</label>
                    <Input
                      disabled
                      addonBefore="NET"
                      value={memo.payTerms || ''}
                    />
                  </Col>
                </Row>
              </div>
              <div className="divider" />
              <div className="bottomField">
                <Row gutter={[20, 20]}>
                  <Col span={6}>
                    <RadioGroup
                      className="priceTypeOption"
                      value={memo.priceType}
                      disabled={true}
                    >
                      <Radio value={MemoPriceTypes.HOURLY} disabled={true}>
                        <span className="radioLabel">Day Rate</span>
                      </Radio>
                    </RadioGroup>
                    <InputGroup compact>
                      <DaySelector
                        style={{width: '40%'}}
                        disabled={true}
                        value={memo.workingDays || null}
                      />
                      <NumberFormat
                        style={{width: '60%'}}
                        disabled={true}
                        value={memo.workingRate || ''}
                        thousandSeparator={true}
                        prefix="$"
                        customInput={Input}
                      />
                    </InputGroup>
                  </Col>
                  <Col span={6}>
                    <label className="fieldLabel">Hours Per Day</label>
                    <Input
                      type="number"
                      value={memo.dailyHours || ''}
                      disabled={true}
                    />
                  </Col>
                  <Col span={6}>
                    <label className="fieldLabel">Kit Fee</label>
                    <NumberFormat
                      disabled={true}
                      value={memo.kitFee || ''}
                      thousandSeparator={true}
                      prefix="$"
                      customInput={Input}
                    />
                  </Col>
                  <Col span={6}>
                    <RadioGroup
                      className="priceTypeOption"
                      name="priceType"
                      value={memo.priceType}
                    >
                      <Radio value={MemoPriceTypes.FIXED} disabled={true}>
                        <span className="radioLabel">Project Rate</span>
                      </Radio>
                    </RadioGroup>
                    <NumberFormat
                      disabled={true}
                      value={memo.projectRate || ''}
                      thousandSeparator={true}
                      prefix="$"
                      customInput={Input}
                    />
                  </Col>
                </Row>
              </div>
            </Panel>
          </Collapse>
        </div>

        <div className="invoiceMemoWrapper">
          <InvoiceMemoSectionTitle className="title">Edit Deal Memo</InvoiceMemoSectionTitle>
          <Formik
            enableReinitialize
            innerRef={formikRef}
            initialValues={formData}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({values, setFieldValue, touched, errors}) => (
              <Form>
                <Row gutter={[20, 20]}>
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
                    <label className="fieldLabel">Hours Per Day</label>
                    <Field name="dailyHours">
                      {() => (
                        <Input
                          disabled={values.priceType === MemoPriceTypes.FIXED}
                          type="number"
                          value={values.dailyHours || ''}
                          onChange={(e) => setFieldValue('dailyHours', e.target.value)}
                        />
                      )}
                    </Field>
                    {(values.priceType === MemoPriceTypes.HOURLY) && touched.dailyHours && errors.dailyHours && (
                      <div className="helper-text lowercase">{errors.dailyHours}</div>
                    )}
                  </Col>
                  <Col span={6} className="hourlyFieldWrapper">
                    <RadioGroup
                      className="priceTypeOption"
                      name="priceType"
                      value={values.priceType}
                      onChange={(e) => {
                        setFieldValue('priceType', e.target.value);
                        setPriceType(e.target.value);
                      }}
                    >
                      <Radio value={MemoPriceTypes.HOURLY}>
                        <span className="radioLabel">Day Rate</span>
                      </Radio>
                    </RadioGroup>
                    <InputGroup compact style={{marginBottom: 0}}>
                      <DaySelector
                        style={{width: '40%'}}
                        disabled={values.priceType === MemoPriceTypes.FIXED}
                        value={values.workingDays || null}
                        onSelect={(value) => setFieldValue('workingDays', value)}
                      />
                      <NumberFormat
                        disabled={values.priceType === MemoPriceTypes.FIXED}
                        style={{width: '60%'}}
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
                  <Col span={6}>
                    <label className="fieldLabel">Kit Fee - <i>Optional</i></label>
                    <NumberFormat
                      disabled={values.priceType === MemoPriceTypes.FIXED}
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
                      <Radio value={MemoPriceTypes.FIXED}>
                        <span className="radioLabel">Project Rate</span>
                      </Radio>
                    </RadioGroup>
                    <NumberFormat
                      disabled={values.priceType === MemoPriceTypes.HOURLY}
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
                </Row>
                <div className="divider" />
                <div className="actions">
                  <div className="leftButtons">
                    <Button shape="circle" type="secondary" icon={<PaperClipOutlined />} onClick={openFilePicker}>
                      <input ref={filePicker} type="file" onChange={(e) => onAttachmentLoad(e.target.files)} multiple />
                    </Button>
                    <Button shape="round" onClick={onMemoPreviewClick}>Preview</Button>
                  </div>
                  <div className="rightButtons">
                    <Button shape="round" onClick={handleCancel}>Cancel</Button>
                    <Button shape="round" type="primary" htmlType="submit">Save</Button>
                  </div>
                </div>
                {innerAttachments.length > 0 && (<MemoAttachments attachments={innerAttachments} onDelete={onAttachmentDelete} />)}
              </Form>
            )}
          </Formik>
        </div>
        <MemoPreview visible={memoPreview.visible} job={job} memo={memoPreview.memo} setModalData={handleMemoPreview} />
      </InvoiceMemoWrapper>
    </Modal>
  );
};

export default InvoiceMemo;
