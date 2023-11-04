import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== '') {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <input
        type="text"
        placeholder="Adicionar Tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>
        {editIndex !== null ? 'Editar Tarefa' : 'Adicionar Tarefa'}
      </button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => editTask(index)}>Editar</button>
            <button onClick={() => deleteTask(index)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

