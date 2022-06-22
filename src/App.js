
import React from 'react';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const App = () => {
  const [taskData, setTaskData] = useState([]);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';

  useEffect(() => {
    axios
    .get(URL)
    .then((response) => {
      const newTasks = response.data.map((task) => {
        return {
          id: task.id,
          title: task.title,
          description: task.description,
          isComplete: task.isComplete,
        };
      });
      setTaskData(newTasks);
    })
    .catch((err) => {
      console.log(err);
    });

  }, []);

  const markComplete = (id) => {
    //const [complete, setComplete] = useState(taskData.id.isComplete);
    //if (complete == false) {
    axios
    .patch(`${URL}/${id}/mark_complete`)
    .then(() => {
      const newTasks = [];
      for (const task of taskData) {
        const newTask = { ...task };
        if (newTask.id === id) {
          newTask.isComplete = !newTask.isComplete;
        }
        newTasks.push(newTask);
        }
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
    });
  };

  // const updateTaskData = (updatedTask) => {
  //   const updatedTasks = taskData.map((task) => {
  //     if (task.id === updatedTask.id) {
  //       return updatedTask;
  //     } else {
  //       return task;
  //     }
  //   });
  //   setTaskData(updatedTasks);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
        tasks={taskData}
        onUpdateTask={markComplete} />}</div>
      </main>
    </div>
  );
};

export default App;
