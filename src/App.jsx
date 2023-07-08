import React, { useState } from 'react';
import './App.css';

function App() {
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = currentDate.toLocaleDateString(undefined, options);

  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setCompletedTasks(toDos.filter(task => task.status));
    } else {
      setCompletedTasks([]);
    }
  };

  const handleAddToDo = () => {
    if (toDo.trim() !== '') {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo('');
    } else {
      alert('Please enter a task!');
    }
  };

  const handleToggleStatus = (id) => {
    setToDos(toDos.map((task) => {
      if (task.id === id) {
        const updatedTask = { ...task, status: !task.status };
        if (updatedTask.status) {
          setCompletedTasks([...completedTasks, updatedTask]);
          return null; 
        }
      }
      return task;
    }).filter(Boolean));
  };
  

  const handleDeleteTask = (id) => {
    setToDos(toDos.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1 className="heading">My ToDo List</h1>
      <div className="subHeading">
        <h2 className="day">For {dayOfWeek}</h2>
        <br />
        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            id="myInput"
            className="small-box"
            placeholder="Add your new ToDo..."
          />
          <div className="add">
            <i onClick={handleAddToDo} className="fa fa-plus-square" aria-hidden="true"></i>
          </div>
        </div>

        <div className="todos">
          <h2 className="active">Active Tasks</h2>
          {toDos.map((task) => (
            <div className="todo" key={task.id}>
              <div className="left">

                <input
                  onChange={() => handleToggleStatus(task.id)}
                  type="checkbox"
                  id={`checkbox-${task.id}`}
                  name={`checkbox-${task.id}`}
                  className="checkbox"
                  checked={task.status}
                />
                <p>{task.text}</p>
                <i onClick={() => handleDeleteTask(task.id)} className="fa fa-times"></i>
              </div>
            </div>
          ))}
        </div>

        <div className="completed">
          <h2 className="subsubheading">Completed Tasks</h2>
          <i onClick={handleOpen} className={`fa ${open ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
          {open && (
            <div>
              {completedTasks.map((task) => (
                <div className="completedtodo" key={task.id}>
                  <div className="left">
                    <p>{task.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
