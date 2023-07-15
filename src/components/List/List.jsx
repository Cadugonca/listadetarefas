// Importando as dependências necessárias
import React, { useState } from 'react';
import "./index.scss";

// Componente para troca de imagem
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

// Componente List/principal
const List = () => {
  // State para armazenar as tarefas
  const [tasks, setTasks] = useState([
    { id: 1, name: "Tarefa 1" },
    { id: 2, name: "Tarefa 2" },
    { id: 3, name: "Tarefa 3" },
  ]);

  // State para armazenar o nome da nova tarefa e o ID da tarefa em edição
  const [newTaskName, setNewTaskName] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  // Função para lidar com a mudança de valor do input
  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  // Função para lidar com o envio do formulário - aqui eu pedi ajuda para o Chat GPT, não consegui entender a lógica sozinho
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

  // Função para lidar com a edição de uma tarefa
  const handleEditTask = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setNewTaskName(task.name);
      setEditTaskId(taskId);
    }
  };

  // Função para lidar com a exclusão de uma tarefa
  const handleDeleteTask = (taskId) => {
    setEditTaskId(taskId);
  };

  // Função para confirmar a exclusão da tarefa
  const handleConfirmDelete = () => {
    const updatedTasks = tasks.filter((task) => task.id !== editTaskId);
    setTasks(updatedTasks);
    setEditTaskId(null);
  };

  // Função para cancelar a exclusão da tarefa
  const handleCancelDelete = () => {
    setEditTaskId(null);
  };


  // Vai aparecer na tela
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
                    <img className='icon' src="/cancel.png" alt="cancel" onClick={() => setEditTaskId(null)} />
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

      {editTaskId !== null && (
        <div className="confirmation-dialog">
          <h1>Tem certeza que deseja excluir a tarefa?</h1>

          <button id='sim' onClick={handleConfirmDelete}>Sim</button>
          <button id='nao' onClick={handleCancelDelete}>Não</button>
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
