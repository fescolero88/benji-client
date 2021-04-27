import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ContractorJobList from "../Job/JobList/JobList";
import Title from "../Title/Title";

import {
  Container,
  Header, MoreActionsWrapper
} from "./Column.style";

const Column = ({
  title,
  column,
  jobs,
  index,
  isScrollable,
  actions
}) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container
          color={column.color}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Header isDragging={snapshot.isDragging}>
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
            >
              {title}
            </Title>
            {actions && (
              <MoreActionsWrapper>
                {actions}
              </MoreActionsWrapper>
            )}
          </Header>

          <ContractorJobList
            listId={column.id}
            listType="JOB"
            column={column}
            jobs={jobs}
            internalScroll={isScrollable}
          />
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
