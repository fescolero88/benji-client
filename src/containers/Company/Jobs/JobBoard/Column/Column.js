import React from "react";
import { Draggable } from "react-beautiful-dnd";
import JobList from "../Job/JobList/JobList";
import Title from "../Title/Title";
import { Container, Header, CreateButtonWrapper } from "./Column.style";

const Column = ({
  title,
  column,
  jobs,
  index,
  isScrollable,
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
          </Header>

          <JobList
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
