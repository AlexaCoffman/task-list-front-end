import React from 'react';
import { useEffect, useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';
import TaskForm from "./components/TaskForm";



const App = () => {
  const [taskData, setTaskData] = useState([]);
  const URL = 'https://task-list-api-c17.herokuapp.com/tasks';


  const fetchTasks = ()=> {
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
  };
  useEffect(fetchTasks, []);

  
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

  
  const deleteTask = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        const newTasks = [];
        for (const task of taskData) {
          if (task.id !== id) {
            newTasks.push(task);
          }
        }
        setTaskData(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const addTask = (taskInfo) => {
    axios
      .post(URL, taskInfo)
      .then((response) => {
        console.log(response);
        fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
        tasks={taskData}
        onUpdateTask={markComplete} 
        onDeleteTask={deleteTask}
        />
        <TaskForm addTaskCallback={addTask}/>
          </div>
      </main>
    </div>
  );
};


export default App;

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