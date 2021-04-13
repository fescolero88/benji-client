import React, {useEffect, useMemo, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CheckSquareFilled } from "@ant-design/icons";
import Badge from '@iso/components/uielements/badge';
import Button from "@iso/components/uielements/button";
import Loader from '@iso/components/utility/loader';
import ConfirmModal from '@iso/components/Modals/Confirm';
import InvoiceRequest from './InvoiceRequest';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import JobBoardLayout, {
  ParentContainer,
  Container,
  JobHeader,
  JobHeaderAction,
} from "./JobBoard.style";
import Column from "./JobBoard/Column/Column";
import JobStatus from '@iso/enums/job_status';
import { fetchCompanyJobsRequest } from '@iso/redux/producerJob/actions';
import { updateJobDetailsRequest, deleteJobRequest } from '@iso/redux/producerJob/actions';
import JobCreateOrUpdate from './JobBoard/Job/JobCreateOrUpdate/JobCreateOrUpdate';
import JobBoardContext from './JobBoard/JobBoardContext';
import notify from '@iso/lib/helpers/notify';
import { showServerError } from '@iso/lib/helpers/utility';

export default function ({ containerHeight, withScrollableColumns = true }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { companyId, jobs, list, delete: deleteAction } = useSelector(state => state.ProducerJob);
  const [jobModal, setJobModal] = useState({visible: false, job: null});
  const [jobConfirm, setJobConfirm] = useState({visible: false, job: null});
  const [wrapModal, setWrapModal] = useState({visible: false, job: null});
  const [action, setAction] = useState('');
  const [columns, setColumns] = useState([
    {
      id: "column-1",
      addButtonText: "Create New In Bid Job",
      title: "In Bid",
      type: JobStatus.PENDING,
      color: "#ffc06a",
    },
    {
      id: "column-2",
      addButtonText: "Create New Active Job",
      title: "Active",
      type: JobStatus.ACTIVE,
      color: "#51369a",
    },
    {
      id: "column-3",
      addButtonText: "Add Wrap/Pay Jobs",
      title: "Wrap/Pay",
      type: JobStatus.WRAPPED,
      color: "#19913d",
    },
  ]);

  useEffect((() => {
    dispatch(fetchCompanyJobsRequest({companyId}));
  }), [companyId]);

  useEffect(() => {
    if (!deleteAction.loading && !deleteAction.error && action === 'delete') {
      setJobConfirm({visible: false, job: null});
      notify('success', 'Job deleted successfully');
    }

    if (deleteAction.error && action === 'delete') {
      notify('error', showServerError(deleteAction.error));
    }

    if (!deleteAction.loading && action === 'delete') {
      setAction('');
    }
  }, [deleteAction]);

  const jobsByStatus = useMemo(() => {
    const inbidJobs = jobs.filter(job => job.status === JobStatus.PENDING);
    const activeJobs = jobs.filter(job => job.status === JobStatus.ACTIVE);
    const wrappedJobs = jobs.filter(job => job.status === JobStatus.WRAPPED);

    return {
      [JobStatus.PENDING]: inbidJobs,
      [JobStatus.ACTIVE]: activeJobs,
      [JobStatus.WRAPPED]: wrappedJobs,
    }
  }, [jobs]);

  const onDragEnd = ({ source, destination, type, draggableId }) => {
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'COLUMN') {

    }

    if (type === 'JOB') {
      const jobId = draggableId.match(/\d+$/)[0];
      const moveFrom = columns.find(column => column.id === source.droppableId);
      const moveTo = columns.find(column => column.id === destination.droppableId);

      if (moveTo) {
        dispatch(updateJobDetailsRequest(jobId, {originalStatus: moveFrom.type, status: moveTo.type}));
      }
    }
  };

  const onJobCreate = (type) => {
    setJobModal({visible: true, job: {}, type: type});
  };

  const onJobEdit = (job) => {
    setJobModal({visible: true, job: job});
  };

  const onJobDelete = (job) => {
    setJobConfirm({visible: true, job: job})
  };

  const onJobDeleteCancel = () => {
    setJobConfirm({visible: false, job: null});
  };

  const handleJobDelete = () => {
    setAction('delete');
    dispatch(deleteJobRequest(jobConfirm.job.id));
  };

  const onJobOpen = (job) => {
    history.push(`./jobs/${job.id}`);
  };

  const handleJobActivate = (job) => {
    dispatch(updateJobDetailsRequest(job.id, {originalStatus: job.status, status: JobStatus.ACTIVE}));
  };

  const handleJobWrap = (job) => {
    setWrapModal({visible: true, job: job});
  };

  const handleInvoiceModal = (type, data) => {
    if (type === 'close') {
      setWrapModal({ visible: false, job: null });
    }

    if (type === 'success') {
      setWrapModal({ visible: false, job: null });
      dispatch(fetchCompanyJobsRequest({companyId}));
    }
  };

  const handleJobArchive = (job) => {

  };

  const handleJobModal = (type, data) => {
    if (type === 'close') {
      setJobModal({visible: false, job: null});
    }
  };

  if (list.loading) {
    return <Loader />
  }

  const board = (
    <JobBoardContext.Provider
      value={{
        onCreate: onJobCreate,
        onEdit: onJobEdit,
        onDelete: onJobDelete,
        onOpen: onJobOpen,
        onActivate: handleJobActivate,
        onWrap: handleJobWrap,
        onArchive: handleJobActivate
      }}
    >
      <JobHeader>
        <h1>Jobs <Badge count={jobs.length} /></h1>
        <JobHeaderAction>
          <Button type="default" className="archivedBtn">
            <CheckSquareFilled />
            Archived Jobs
          </Button>
        </JobHeaderAction>
      </JobHeader>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={Boolean(containerHeight)}
      >
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            <JobCreateOrUpdate
              visible={jobModal.visible}
              job={jobModal.job}
              type={jobModal.type}
              setModalData={handleJobModal}
            />

            <ConfirmModal
              visible={jobConfirm.visible}
              title="Are you sure you want to Delete this Job?"
              description="You will automatically release all holding crew and this job will be permanently deleted. This action cannot be undone."
              confirmLoading={action === 'delete'}
              onYes={handleJobDelete}
              onNo={onJobDeleteCancel}
            />

            {wrapModal.visible &&
              <InvoiceRequest job={wrapModal.job} setModalData={handleInvoiceModal} />
            }

            {columns &&
              columns.map((column, index) => {
                return (
                  <Column
                    key={column.id}
                    index={index}
                    title={column.title}
                    column={column}
                    jobs={jobsByStatus[column.type]}
                    isScrollable={withScrollableColumns}
                  />
                );
              })}
          </Container>
        )}
      </Droppable>
    </JobBoardContext.Provider>
  );

  return (
    <JobBoardLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
    </JobBoardLayout>
  );
}
