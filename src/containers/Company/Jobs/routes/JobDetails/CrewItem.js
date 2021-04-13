import React, { useState, useMemo, forwardRef, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CrewItemWrapper from './CrewItem.style';
import Button from "@iso/components/uielements/button";
import { CloseOutlined, PlusCircleFilled } from "@ant-design/icons";
import Popover from "@iso/components/uielements/popover";
import useOnClickOutside from "@iso/lib/hooks/useOnClickOutside";
import AutoComplete from "@iso/components/shared/Autocomplete";
import MemoTypes from "@iso/enums/memo_types";
import MemoPriceTypes from "@iso/enums/memo_price_types";
import JobStatus from "@iso/enums/job_status";
import CurrencyText from '@iso/components/utility/currencyText';
import Icon from "@iso/components/icons/Icon";
import ChatIcon from "@iso/assets/images/chat.svg";
import EmptyAvatar from "@iso/assets/images/empty_avatar.jpg";
import AcceptedIcon from '@iso/assets/images/icon/benji-glass.svg';
import DraggableIcon from '@iso/assets/images/draggable.svg'
import MemoCrewTypes from "@iso/enums/memo_crew_types";
import MemoChoiceLevel from '@iso/enums/memo_choice_level';
import {
  setContractor,
  showDealMemo,
  showHoldMemo,
  createVirtualMemoRequest,
  updateVirtualMemoRequest,
  deleteVirtualMemoRequest,
  setCrewActivePosition,
} from "@iso/redux/producerJob/actions";
import _ from "lodash";

const CrewItem = (
  {
    crew,
    jobRole,
    choiceLevel,
    className,
    isEditable,
    noRoleUsers,
    onDelete,
    ...rest
  },
  ref
) => {
  const dispatch = useDispatch();
  const crewItemRef = useRef();

  const { job } = useSelector((state) => state.ProducerJob);

  const [showUserSelect, setShowUserSelect] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [currentACUser, setCurrentACUser] = useState("");

  useEffect(() => {
    if (crew && !crew.isMemo) {
      if (crew.benjiAccount) {
        setSelectedPerson({
          ...crew.benjiAccount,
          companyRelationship: crew.companyRelationship,
        });
      } else {
        setSelectedPerson({
          fullName: crew.fullName,
          companyRelationship: crew.companyRelationship,
        });
      }
    } else {
      setSelectedPerson(null);
    }
  }, [crew]);

  const isUnAnswered = useMemo(() => {
    if (!crew) return false;
    return job.status === JobStatus.ACTIVE && crew.memoType === MemoTypes.HOLD;
  }, [job, crew]);

  const crewPositionKey = useMemo(() => {
    const { id, jobRoleGroup } = jobRole;
    return `department-${jobRoleGroup}-role-${id}`;
  }, [jobRole]);

  const handleVirtualMemo = (user) => {
    if (!crew) {
      if (!user) return;

      const payload = {
        fullName: user.fullName,
        benjiAccount: user.id,
        jobRole: jobRole.id,
        choiceLevel: choiceLevel,
      };
      dispatch(createVirtualMemoRequest(job.id, payload));
    } else if (crew && !crew.isMemo) {
      if (user) {
        const payload = {
          fullName: user.fullName || "",
          benjiAccount: user.id || null,
        };
        dispatch(updateVirtualMemoRequest(crew.id, payload));
      } else {
        dispatch(deleteVirtualMemoRequest(crew.id));
      }
    }
  };

  const handleUserSelect = (person) => {
    setSelectedPerson(person);
    setShowUserSelect(false);
    handleVirtualMemo(person);
  };

  const handleStopEdit = () => {
    if (selectedPerson) {
      handleVirtualMemo({
        fullName: selectedPerson.fullName,
      });
    } else {
      handleVirtualMemo(null);
    }

    setShowUserSelect(false);
  };

  const handleStartEdit = () => {
    if (showUserSelect) return;

    if (selectedPerson) {
      setCurrentACUser(selectedPerson.fullName);
    } else {
      setCurrentACUser("");
    }
    setShowUserSelect(true);
    dispatch(setCrewActivePosition(crewPositionKey));
  };

  const editMemo = () => {
    dispatch(
      setContractor({
        ...crew,
        memoId: crew.id,
        jobRole,
        choiceLevel,
      })
    );

    if (job.status === JobStatus.ACTIVE) {
      dispatch(showDealMemo());
    } else {
      dispatch(showHoldMemo());
    }
  };

  const viewMemo = () => {
    dispatch(
      setContractor({
        ...crew,
        memoId: crew.id,
        jobRole,
        choiceLevel,
      })
    );

    if (job.status === JobStatus.ACTIVE) {
      dispatch(showDealMemo());
    } else {
      dispatch(showHoldMemo());
    }
  };

  const onRemoveCrew = () => {
    if (onDelete) onDelete(crew);
  };

  const handleNewUser = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      handleStopEdit();
    }

    const inputUser = e.target.value.trim();
    if (!inputUser) {
      setSelectedPerson(null);
      return;
    }

    const matchUsers = _.filter(noRoleUsers, (user) => {
      const userFullName = user.fullName.trim();
      return userFullName.toLowerCase().indexOf(inputUser.toLowerCase()) >= 0;
    });
    if (matchUsers.length > 0) return;
    setSelectedPerson({
      fullName: inputUser,
      companyRelationship: "NO RELATION",
    });
  };

  useOnClickOutside(crewItemRef, handleStopEdit);

  const createMemo = (e) => {
    e.stopPropagation();

    dispatch(
      setContractor({
        ...selectedPerson,
        memoId: "new",
        jobRole,
        choiceLevel,
      })
    );

    if (job.status === JobStatus.ACTIVE) {
      dispatch(showDealMemo());
    } else {
      dispatch(showHoldMemo());
    }
  };

  const shouldItemRender = (item, value) => {
    return item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1;
  };

  const renderItemInAutocomplete = (item, isHighlighted) => (
    <div
      key={`user_select_${item.id}`}
      className={`ant-select-item ant-select-item-option userDropdownItemWithAvatar ${
        isHighlighted ? "ant-select-item-option-active" : ""
      }`}
    >
      <div className="userAvatar">
        <img src={item.profilePhotoS3Url || EmptyAvatar} alt="User" />
      </div>
      <div className="userInfo">
        <h4>{item.fullName}</h4>
        <div className="userStatus">
          {item.isActive ? null : (
            <span className="ant-typography ant-typography-danger">
              (Not Activated)
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const renderCrewName = (crew) => {
    if (isUnAnswered) {
      return (
        <div className="crewNameWrapper unanswered">
          <CloseOutlined
            onClick={onRemoveCrew}
            style={{ marginRight: "5px" }}
          />
          <span>{crew.contractorName}</span>
        </div>
      );
    }

    if (crew.decline) {
      return (
        <div className="crewNameWrapper declined">
          <CloseOutlined
            onClick={onRemoveCrew}
            style={{ marginRight: "5px" }}
          />
          <span>{crew.contractorName}</span>
          {crew.optionalMessage && (
            <Popover title="Notes" content={crew.optionalMessage}>
              <span className="acceptMessage">
                <Icon image={ChatIcon} height={15} />
              </span>
            </Popover>
          )}
        </div>
      );
    }

    if (crew.acceptanceLevel) {
      return (
        <div className="crewNameWrapper">
          <div className={`acceptLevel level_${crew.acceptanceLevel}`}>
            {crew.acceptanceLevel}H
          </div>
          <span>{crew.contractorName}</span>
          {crew.optionalMessage && (
            <Popover title="Notes" content={crew.optionalMessage}>
              <span className="acceptMessage">
                <Icon image={ChatIcon} height={15} />
              </span>
            </Popover>
          )}
        </div>
      );
    }

    return <span>{crew.contractorName}</span>;
  };

  const calcCrewPrice = (crew) => {
    if (crew.priceType === MemoPriceTypes.HOURLY) {
      return (
        crew.workingDays * crew.workingRate + crew.kitFee
      );
    } else {
      return parseFloat(crew.projectRate);
    }
  };

  const renderCrewStatus = (crew) => {
    if (job.status === JobStatus.ACTIVE) {
      if (crew.memoType === MemoTypes.HOLD) {
        return (
          <span className="memoActionLink unanswered" onClick={viewMemo}>
            Unanswered Hold Memo
          </span>
        );
      } else {
        if (crew.accepted) {
          if (crew.memoStaff === MemoCrewTypes.EMPLOYEE) {
            return (
              <span className="memoActionLink" onClick={viewMemo}>
                Company Staff
              </span>
            );
          } else {
            return (
              <span className="memoActionLink" onClick={viewMemo}>
                <Icon src={AcceptedIcon} width={25} height={18} />
                <CurrencyText value={calcCrewPrice(crew)} className="crewPrice" />
              </span>
            );
          }
        } else if (crew.decline) {
          return (
            <span className="memoActionLink declinedDeal">Declined</span>
          );
        } else if (crew.booked) {
          return (
            <span className="memoActionLink sentDeal" onClick={editMemo}>
              Memo Sent
            </span>
          );
        } else {
          return (
            <span className="memoActionLink savedDeal" onClick={editMemo}>
              Saved Memo
            </span>
          );
        }
      }
    } else {
      if (crew.memoType === MemoTypes.HOLD) {
        if (crew.accepted) {
          if (crew.memoStaff === MemoCrewTypes.EMPLOYEE) {
            return (
              <span className="memoActionLink" onClick={viewMemo}>
                Company Staff
              </span>
            );
          } else {
            return (
              <span className="memoActionLink" onClick={viewMemo}>
                <CurrencyText value={calcCrewPrice(crew)} className="crewPrice" />
              </span>
            );
          }
        } else if (crew.decline) {
          return (<span className="memoActionLink declinedHold">Declined</span>);
        } else {
          return (
            <span className="memoActionLink sentHold" onClick={editMemo}>
              Memo Sent
            </span>
          );
        }
      }
    }
  };

  return (
    <CrewItemWrapper ref={ref} {...rest} className="ant-list-item crewItem">
      {crew && (<Icon image={DraggableIcon} width={10} height={16} className="draggableIndicator" />)}
      {crew && crew.isMemo && (
        <div className={`memoZone ${crew.decline ? 'declined' : ''}`}>
          <div className="crewInfo">{renderCrewName(crew)}</div>
          <div className="crewStatus">{renderCrewStatus(crew)}</div>
        </div>
      )}

      {(crew === null || !crew.isMemo) && (
        <div
          onClick={handleStartEdit}
          className={`clickAwayArea ${!isEditable ? "no-pointer-events" : ""}`}
        >
          {showUserSelect ? (
            <div className="editorWrapper" style={{ flex: "auto" }} ref={crewItemRef}>
              <AutoComplete
                inputProps={{
                  className: "ant-input",
                  onKeyUp: handleNewUser,
                  onFocus: (e) => e.preventDefault(),
                  autoFocus: true,
                }}
                shouldItemRender={shouldItemRender}
                items={noRoleUsers}
                wrapperStyle={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                  zIndex: 2,
                }}
                renderItem={renderItemInAutocomplete}
                getItemValue={(item) => item.fullName}
                renderMenu={(children) => (
                  <div className="isoAutocompleteDropdown">{children}</div>
                )}
                value={currentACUser}
                onSelect={handleUserSelect}
              />
              <Button type="link" className="addCrewBtn" onClick={handleStopEdit}>
                <PlusCircleFilled style={{fontSize: 20, color: job.status === JobStatus.ACTIVE ? '#51369a' : '#ffc06a'}} />
              </Button>
            </div>
          ) : selectedPerson ? (
            <div className="memoZone">
              <span>
                {selectedPerson.fullName}
              </span>
              <a className={`memoActionLink ${job.status === JobStatus.ACTIVE ? 'createDeal' : 'createHold'}`} onClick={createMemo}>
                Create Memo
              </a>
            </div>
          ) : isEditable ? (
            <div className="memoZone" onClick={handleStartEdit}>
              <span className="placeholder">Add</span>
            </div>
          ) : (
            <span className="placeholder">...</span>
          )}
        </div>
      )}
    </CrewItemWrapper>
  );
};

CrewItem.defaultProps = {
  isEditable: true,
};

export default forwardRef(CrewItem);
