import React, {useMemo, useState} from 'react';
import { Row, Col, Menu } from 'antd';
import Checkbox from '@iso/components/uielements/checkbox';
import BookCrewList from './CrewList';
import { BookCrewHeader, BookCrewJobDepartmentWrapper } from './BookCrew.style';
const { SubMenu } = Menu;

const BookCrewDepartmentList = ({ department, crews, selectedCrews, onSelect, opened }) => {
  const [isOpened, setIsOpened] = useState(opened);
  const departmentKey = `book-crew-department-${department.replace(/\s/g, '')}`;
  const departmentCrews = useMemo(() => {
    return crews.map(c => c.id);
  }, [crews]);

  const onAllSelect = (selected) => {
    let newCrews = [];
    if (selected) {
      newCrews = [...selectedCrews, ...departmentCrews];
    } else {
      newCrews = selectedCrews.filter(p => !departmentCrews.includes(p))
    }

    onSelect(newCrews);
  };

  const onSingleSelect = (crew, selected) => {
    if (selected) {
      const newSelected = [...selectedCrews, crew.id]
      onSelect(newSelected);
    } else {
      const newSelected = selectedCrews.filter(c => c !== crew.id);
      onSelect(newSelected);
    }
  };

  return (
    <BookCrewJobDepartmentWrapper>
      <Row className="bookInfoItem">
        <span></span>
        <Col span={5} className="departmentList">
          <Menu
            mode="inline"
            inlineIndent={0}
            selectable={false}
            defaultOpenKeys={opened ? [departmentKey] : []}
            onOpenChange={(openKeys) => {
              if (openKeys.length) {
                setIsOpened(true);
              } else {
                setIsOpened(false);
              }
            }}
          >
            <SubMenu
              key={departmentKey}
              title={
                <Checkbox
                    checked={departmentCrews.every(dc => selectedCrews.includes(dc))}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAllSelect(e.target.checked);
                    }}
                  >
                  {department}
                </Checkbox>
              }
              className="departmentRoleList"
            >
              {crews &&
              crews.map((crew) => {
                return (
                  <Menu.Item
                    id={`book-crew-memo-${crew.id}`}
                    key={`book-crew-memo-${crew.id}`}
                  >
                    <span className="roleTitle">
                      <Checkbox
                        checked={selectedCrews.includes(crew.id)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSingleSelect(crew, e.target.checked);
                        }}
                      >
                        {crew.position}
                      </Checkbox>
                    </span>
                  </Menu.Item>
                );
                })}
            </SubMenu>
          </Menu>
        </Col>
        <Col span={19} className="roleChoice">
          {isOpened && (
            <BookCrewHeader>
              <Row>
                <Col span={5}>Crew</Col>
                <Col span={7}>Date</Col>
                <Col span={4}>Hours Per Day</Col>
                <Col span={4}>Total Rate</Col>
                <Col span={4}>Status</Col>
              </Row>
              <div className="crewList">
                {crews && crews.length > 0 && (
                  <BookCrewList crews={crews} />
                )}
              </div>
            </BookCrewHeader>
          )}
        </Col>
      </Row>
    </BookCrewJobDepartmentWrapper>
  );
};

export default BookCrewDepartmentList;
