import React, { useState } from 'react';
import HomeBackground from '../assets/homeBackground.svg';
import smallLogo from '../assets/smallLogo.svg';
import styled from '@emotion/styled';
import colors from '../utils/colors';
import Calendar from '../components/Calendar';
import AddButton from '../components/AddButton';
import DetailCard from '../components/DetailCard';
import useModal from '../hooks/useModal';
import TaskLine from '../components/TaskLine';
import { useQuery } from 'react-query';
import { getAllTasks, getTask } from '../api/tasks';
import AddNewTaskCard from '../components/AddNewTaskCard';

const Main = styled.div`
  width: 100%;
  height: 100%;
  background: url(${HomeBackground}) no-repeat;
  background-size: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 12%;
`;

const Heading = styled.h1`
  font-size: 1.75rem;
  font-weight: 400;
  color: ${colors.primaryColor};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 10%;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(14, 5, 46, 0.2);
  backdrop-filter: blur(4px);
  z-index: 10;
`;

const TasksOverview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70%;
`;

function Home() {
  const { isShowing, toggleModal, toggleAddTask, addTask } = useModal();
  const { status, data: tasks, error } = useQuery('allTasks', getAllTasks);
  const [selectedTask, setSelectedTask] = useState({});

  async function handleOnTaskClick(id) {
    const task = await getTask(id);
    setSelectedTask(task);
    toggleModal();
  }

  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Main>
        <Header>
          <Heading>Have a nice day!</Heading>
          <img src={smallLogo} alt="small Logo" />
        </Header>
        <Calendar />
        {isShowing ? (
          <Background>
            <DetailCard task={selectedTask} toggleModal={toggleModal} />
          </Background>
        ) : null}
        {addTask ? (
          <Background>
            <AddNewTaskCard toggleAddTask={toggleAddTask} />
          </Background>
        ) : null}
        <TasksOverview>
          {tasks.map((task) => (
            <TaskLine
              heading={task.heading}
              category={task.category}
              startTime={task.startTime}
              endTime={task.endTime}
              completed={task.completed}
              id={task.id}
              key={task.id}
              toggleModal={toggleModal}
              onClick={() => handleOnTaskClick(task.id)}
            />
          ))}
        </TasksOverview>
        <Footer>
          <AddButton onClick={toggleAddTask} />
        </Footer>
      </Main>
    </>
  );
}

export default Home;
