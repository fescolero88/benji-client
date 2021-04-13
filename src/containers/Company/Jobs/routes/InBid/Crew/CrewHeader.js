import React, { useEffect, useMemo, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Empty, Menu} from 'antd';
import DatePicker from '@iso/components/uielements/datePicker';
import DayPicker from '@iso/components/shared/DayPicker';
import CalendarIcon from '@iso/components/icons/Calendar';
import Input from '@iso/components/uielements/input';
import Button from '@iso/components/uielements/button';
import CrewHeaderWrapper from './CrewHeader.style';
import JobStatus from '@iso/enums/job_status';
import SaveTemplate from '../../JobDetails/SaveTemplate';
import { stringToDate, formatDateString } from '@iso/lib/helpers/utility';
import { dateFormat, displayDateFormat } from '@iso/config/datetime.config';
import { SaveFilled } from '@ant-design/icons';
import { updateJobDetailsRequest, fetchCrewTemplateListRequest, loadCrewTemplateRequest } from '@iso/redux/producerJob/actions';
import ChooseTemplate, { ChooseTemplateOption } from '../../JobDetails/ChooseTemplate';
import ChooseDepartment, {
  ChooseDepartmentDropdownWrapper,
} from '../../JobDetails/ChooseDepartment';
import CrewSearchAutocomplete from '../../JobDetails/CrewSearchAutocomplete';
import LoadTemplateConfirm from '../../JobDetails/LoadTemplateConfirm';
import Checkbox from '../../JobDetails/CrewCheckbox';
import notify from '@iso/lib/helpers/notify';
import Spin from '@iso/components/uielements/spin';
import request from '@iso/lib/helpers/httpClient';
import { showServerError } from '@iso/lib/helpers/utility';
import _ from 'lodash';

const CrewHeader = ({ job, departments, onRefresh, refreshLoading, onDepartmentSelect }) => {
  const dispatch = useDispatch();
  const { crewTemplates, loadTemplate } = useSelector(state => state.ProducerJob);
  const [templateLoadConfirm, setTemplateLoadConfirm] = useState({visible: false, templateId: null, departments: []});
  const [visibleSaveTemplate, setVisibleSaveTemplate] = useState(false);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    dispatch(fetchCrewTemplateListRequest(job.id));
  }, [job]);

  useEffect(() => {
    if (!refreshLoading && refreshLoader) {
      setRefreshLoader(false);
    }
  }, [refreshLoading]);

  useEffect(() => {
    if (!loadTemplate.loading && !loadTemplate.error && action === 'load_template') {
      notify('success', 'Template loaded successfully')
    }

    if (loadTemplate.error && action === 'load_template') {
      notify('error', showServerError(loadTemplate.error));
    }

    if (!loadTemplate.loading && action === 'load_template') {
      setAction('');
    }
  }, [loadTemplate]);

  const jobShootDates = useMemo(() => {
    let dates = [];
    if (job && job.shootDates) {
      dates = job.shootDates.map((date) => stringToDate(date).toDate());
    }

    return dates;
  }, [job]);

  const handleStartWrapDateChange = (name, date) => {
    const payload = {
      [name]: formatDateString(date, dateFormat)
    };
    dispatch(updateJobDetailsRequest(job.id, payload));
  };

  const handleRefresh = () => {
    if (onRefresh) {
      setRefreshLoader(true);
      onRefresh();
    }
  };

  const handleShootDatesChange = (dates) => {
    const dateStrings = dates.map((date) => formatDateString(date, dateFormat));
    const payload = {
      shootDates: dateStrings,
    };
    dispatch(updateJobDetailsRequest(job.id, payload));
  };

  const onTemplateSave = () => {
    setVisibleSaveTemplate(true);
  };

  const handleTemplateSave = (type) => {
    if (type === 'close') {
      setVisibleSaveTemplate(false)
    }
  };

  const handleCrewTemplateFetch = async (templateId) => {
    try {
      let conflicts = await request(`/job/${job.id}/can_load_template/${templateId}/`, 'GET', null, true);
      if (conflicts.missing_job_roles && conflicts.missing_job_roles.length) {
        setTemplateLoadConfirm({visible: true, templateId: templateId, departments: conflicts.missing_job_roles});
      } else {
        handleCrewTemplateLoad(templateId);
      }
    } catch (e) {
      notify('error', 'Failed to load template');
    }

  };

  const handleCrewTemplateLoad = (templateId, payload) => {
    setAction('load_template');
    dispatch(loadCrewTemplateRequest(job.id, templateId, payload));
  };

  const handleTemplateLoadCancel = () => {
    setTemplateLoadConfirm({visible: false, departments: []});
  };

  const handleLoadTemplateConfirm = (type, data) => {
    if (type === 'close') {
      handleTemplateLoadCancel();
    }

    if (type === 'confirm') {
      handleCrewTemplateLoad(templateLoadConfirm.templateId, {missingJobRoles: data});
      setTemplateLoadConfirm({visible: false, departments: []});
    }
  };

  return (
    <CrewHeaderWrapper>
      <LoadTemplateConfirm
        visible={templateLoadConfirm.visible}
        departments={templateLoadConfirm.departments}
        setModalData={handleLoadTemplateConfirm}
      />

      <div className="jobContent">
        <Row gutter={[20, 25]} className="headerTop mb-25">
          <Col flex="300px">
            <label className="fieldLabel">Project Start Date</label>
            <DatePicker
              className="fieldControl w-180"
              defaultValue={stringToDate(job.startDate)}
              onChange={(date) => handleStartWrapDateChange('startDate', date)}
              suffixIcon={
                <CalendarIcon width={20} height={18} fill="#bcbccb" />
              }
              format={displayDateFormat}
              allowClear={false}
            />
          </Col>

          <Col flex="300px">
            <label className="fieldLabel">Expected Wrap Date</label>
            <DatePicker
              className="fieldControl w-180"
              defaultValue={stringToDate(job.wrapDate)}
              onChange={(date) => handleStartWrapDateChange('wrapDate', date)}
              suffixIcon={
                <CalendarIcon width={20} height={18} fill="#bcbccb" />
              }
              format={displayDateFormat}
              allowClear={false}
            />
          </Col>

          <Col flex={6}>
            <label className="fieldLabel">Shoot Date(s)</label>
            <DayPicker
              className="fieldControl w-180"
              placeholder="Select date"
              month={stringToDate(job.startDate, "YYYY-MM").toDate()}
              suffixIcon={
                <CalendarIcon width={20} height={18} fill="#bcbccb" />
              }
              values={jobShootDates}
              onChange={handleShootDatesChange}
            />
          </Col>
          <Col flex={4} className="customFieldControl">
            <label className="fieldLabel">Crew Actual</label>
            <Input
              className="fieldControl successField"
              value={job.crewBudget || ""}
              prefix="$"
              disabled
            />
          </Col>
          <Col flex={5}>
            <label className="fieldLabel">&nbsp;</label>
            <CrewSearchAutocomplete />
          </Col>
        </Row>
        <Row gutter={20} className="headerBottom mb-25">
          <Col flex="300px">
            <ChooseDepartment
              className="departmentSelect"
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Choose Departments"
              dropdownRender={() => (
                <ChooseDepartmentDropdownWrapper>
                  <div className="departmentDropDownOptions">
                    {departments.map((department, index) => (
                      <div className="departmentDropDownItem" key={index}>
                        <Checkbox
                          color="#ffc06a"
                          value={department.id}
                          checked={department.selected}
                          onChange={(e) => onDepartmentSelect(department, e.target.checked)}
                        >
                          {department.jobRoleGroupType.title}
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </ChooseDepartmentDropdownWrapper>
                // </div>
              )}
            />
          </Col>
          <Col flex="300px">
            <Spin spinning={action === 'load_template'}>
              <ChooseTemplate
                showSearch
                style={{ width: '100%' }}
                placeholder="Choose a Template"
                optionFilterProp="children"
                onChange={handleCrewTemplateFetch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                className="templateSelect"
                suffixIcon={<SaveFilled />}
              >
                {crewTemplates.map((template) => (
                  <ChooseTemplateOption
                    key={template.id}
                    value={template.id}
                    label={template.name}
                  >
                    {template.name}
                  </ChooseTemplateOption>
                ))}
              </ChooseTemplate>
            </Spin>
          </Col>
          <Col span={1} className="saveTemplateBtn">
            <Button shape="circle" icon={<SaveFilled />} size="large" onClick={onTemplateSave} />
          </Col>
        </Row>

        <SaveTemplate visible={visibleSaveTemplate} templates={crewTemplates} setModalData={handleTemplateSave} />
      </div>
    </CrewHeaderWrapper>
  );
};

export default CrewHeader;
