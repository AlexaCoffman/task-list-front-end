import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onUpdateTask }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const onCompleteButtonClick = () => {
    console.log('Button has been clicked!');
    const updatedTask = {
      id: id,
      title: title,
      isComplete: !isComplete,
    };
    onUpdateTask(updatedTask);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onCompleteButtonClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default Task;
