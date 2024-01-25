import React, { useState, useEffect } from "react";
import "./TodoLists.css";
import { useAuth } from "../../Context/AuthContext";

interface ITodoList {
  id: string;
  name: string;
  // onTodoListClick: (todoListId: string) => void
}

interface TodoListsProps {
  onTodoListClick: (todoListId: string) => void;
}


const TodoList: React.FC<TodoListsProps> = ({onTodoListClick}) => {
  const [todoLists, setTodoList] = useState<ITodoList[]>([]);
  const { token } = useAuth();

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
      // console.log('data -> ', data)
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const

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
      <button onClick={() => {console.log('Adicionar lista de tarefas')}}>Adicionar Lista de Tarefas</button>
    </div>
  );
};

export default TodoList;
