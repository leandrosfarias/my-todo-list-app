/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useContext } from "react";
import "./TodoLists.css";
import { useAuth } from "../../contexts/AuthContext";
import Modal from '../Modal/Modal';
import { GeneralContext, useGeneral } from "../../contexts/GeneralContext";

interface ITodoList {
  id: string;
  name: string;
  // onTodoListClick: (todoListId: string) => void
}

interface TodoListsProps {
  onTodoListClick: (todoListId: string) => void;
}


const TodoList: React.FC<TodoListsProps> = ({onTodoListClick}) => {
  // const [todoLists, setTodoLists] = useState<ITodoList[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoListName, setTodoListName] = useState('');
  const [todoListNameIsEmpty, setTodoListNameIsEmpty] = useState(false);
  const { token } = useAuth();
  const { todoLists, setTodoLists } = useContext(GeneralContext)!;

  const modalOpen = () => setModalOpen(true);
  const modalClose = () => {
    setTodoListNameIsEmpty(false);
    setModalOpen(false)
  };

  const fetchTodoLists = async () => {
    try {
      console.log('token quando for renderizar TodoLists => ', token)
      const response = await fetch("http://127.0.0.1:3000/api/user/todoLists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!.toString(),
        },
      });
      const data = await response.json();
      console.log('data fetchTodoLists => ', data)
      setTodoLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodoList = () => {
    console.log('Adicionar lista de tarefas');
    setModalOpen(true);
  }

  const handleSetTodoListName = (event: any) => {
    console.log('handleSetTodoListName', event.target.value)
    setTodoListName(event.target.value);
  }

  const handleSetTodoList = async () => {
    if (todoListName !== '') {
      setModalOpen(false);
      const result = await fetch("http://127.0.0.1:3000/api/user/todoList", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: token!.toString(),
        },
        body: JSON.stringify({ todoListName: todoListName })
      })
      console.log('result => ', result)
      return fetchTodoLists();
    }
    setTodoListNameIsEmpty(true);
  }

  useEffect(() => {
    fetchTodoLists();
  }, []);

  return (
    <div>
      <ul className="lists">
        {todoLists.map((list: ITodoList, index) => (
          <li key={index} onClick={() => {onTodoListClick(list.id)}} className="list-item">
            {list.name}
          </li>
        ))}
      </ul>
      <button onClick={handleAddTodoList} id="add-todoList-btn">+ Adicionar Lista de Tarefas</button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={modalClose}>
          <div id="form-lista-de-tarefas">
            <label id="label-input-todolist-name">Nome da lista de tarefas</label>
            <input type="text" onChange={handleSetTodoListName} className={todoListNameIsEmpty ? "input-warning" : "input"}/>
            {todoListNameIsEmpty && <p id="error-message">O nome da lista de tarefas não pode ser vazio!</p>}
            <button onClick={handleSetTodoList} id="add-todoList-button">Adicionar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TodoList;
