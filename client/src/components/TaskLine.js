import React, { useState } from 'react';
import styled from '@emotion/styled';
import Dot from '../assets/dot.svg';
import CategoryButton from './CategoryButton';
import colors from '../utils/colors';
import PropTypes from 'prop-types';
import { patchTask } from '../api/tasks';

const Task = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 15px 5px 20px;
`;

const Time = styled.p`
  font-size: 0.9rem;
  width: 40%;
  margin-left: 10px;
  color: ${colors.primaryColor};
`;

const Container = styled.div`
  width: 60%;
  font-size: 15px;
  outline: none;
  border: 3px solid ${colors.cardBorder};
  background-color: ${colors.secondaryColor};
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const TaskHeadingDetailsButton = styled.button`
  font-size: 0.9rem;
  font-weight: 400;
  margin: 2px 0px 2px 0px;
  outline: none;
  border: none;
  background-color: white;
  &:active {
    background-color: ${colors.cardBorder};
    color: ${colors.secondaryColor};
  }
`;

function TaskLine({
  startTime,
  endTime,
  heading,
  completed,
  category,
  onClick,
}) {
  const [isCompleted, setIsCompleted] = useState();

  function onHandleClick(completed) {
    setIsCompleted(completed);
    saveEditedTask();
  }

  async function saveEditedTask() {
    await patchTask({
      completed,
    });
  }

  return (
    <>
      <Task>
        <img src={Dot} alt="dot" />
        <Time>
          {startTime} - {endTime}
        </Time>
        <Container>
          <TaskHeadingDetailsButton onClick={onClick}>
            {heading}
          </TaskHeadingDetailsButton>
          <CategoryButton onClick={onHandleClick} active={isCompleted}>
            {category}
          </CategoryButton>
        </Container>
      </Task>
    </>
  );
}

TaskLine.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  heading: PropTypes.string,
  category: PropTypes.string,
  onClick: PropTypes.func,
  completed: PropTypes.bool,
};

export default TaskLine;
