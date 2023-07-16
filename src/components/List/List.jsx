import React, { useState } from 'react';
import "./index.scss";

const ImageToggle = () => {
  const [imageSrc, setImageSrc] = useState("/uncheck.svg");

  const handleClick = () => {
    if (imageSrc === "/uncheck.svg") {
      setImageSrc("/check.svg");
    } else {
      setImageSrc("/uncheck.svg");
    }
  };

  return (
    <img src={imageSrc} alt="check box" onClick={handleClick} />
  );
};

const List = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Tarefa 1" },
    { id: 2, name: "Tarefa 2" },
    { id: 3, name: "Tarefa 3" },
  ]);

  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newTaskName.trim() === "") {
      return;
    }

    if (editTaskId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editTaskId) {
          return { ...task, name: newTaskName };
        }
        return task;
      });

      setTasks(updatedTasks);
      setEditTaskId(null);
    } else {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName
      };
  
      setTasks([...tasks, newTask]);
    }

    setNewTaskName("");
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setNewTaskName(task.name);
      setEditTaskId(taskId);
    }
  };

  const handleDeleteTask = (taskId) => {
    setShowConfirmation(true);
    setEditTaskId(taskId);
  };

  const handleConfirmDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== editTaskId);
    setTasks(updatedTasks);
    setEditTaskId(null);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setEditTaskId(null);
    setShowConfirmation(false);
  };

  return (
    <div>
      <table className="tabela">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>
                {editTaskId === task.id ? (
                  <form onSubmit={handleFormSubmit}>
                    <input id='tar' type="text" value={newTaskName} onChange={handleInputChange} />
                  </form>
                ) : (
                  task.name
                )}
              </td>
              <td>
                <ImageToggle />
              </td>
              <td>
                {editTaskId === task.id ? (
                  <>
                    <img className='icon' src="/save.png" alt="save" onClick={handleFormSubmit} />
                    <img className='icon' src="/cancel.png" alt="cancel" onClick={handleCancelDelete} />
                  </>
                ) : (
                  <>
                    <img src="/edit.svg" alt="edit" onClick={() => handleEditTask(task.id)} />
                    <img src="/delete.svg" alt="delete" onClick={() => handleDeleteTask(task.id)} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <h1>Tem certeza que deseja excluir a tarefa?</h1>

          <button id='nao' onClick={handleCancelDelete}>Não</button>
          <button id='sim' onClick={handleConfirmDelete}>Sim</button>
        </div>
      )}

      <div className='addnew'>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={newTaskName} onChange={handleInputChange} placeholder="Nova Tarefa" />
          <button type="submit"><img src="/add.svg" alt="" /></button>
        </form>
      </div>
    </div>
  );
};

export default List;
