import React from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onUpdateTask, onDeleteTask }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  // const onCompleteButtonClick = () => {
  //   console.log('Button has been clicked!');
  //   const updatedTask = {
  //     id: id,
  //     title: title,
  //     isComplete: !isComplete,
  //   };
  //   onUpdateTask(updatedTask);
  // };
  const onCompleteButtonClick = ()=>{
    onUpdateTask(id);
  };
  const deleteTask = () => {
    onDeleteTask(id);
  };

  return (
    <li className="tasks__item" key={id}>
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onCompleteButtonClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button"  onClick={deleteTask}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isComplete: PropTypes.bool,
  onUpdateTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired
};

export default Task;
