import { useState, useEffect } from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";
import { useAuth } from "../../Context/AuthContext";

interface ITodo {
  name: string;
  done: boolean;
}

interface ITodoListProps {
  todoListId: string;
}

const Todos = (props: ITodoListProps) => {
  const [TodoList, setTodos] = useState<ITodo[]>([]);
  const { token } = useAuth();
  
  const fetchTodos = async (todoListId: string) => {
    console.log("fui chamado com o todoListId => ", todoListId);
    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!.toString(),
        },
        body: JSON.stringify({ todoListId: todoListId }),
      });
      const data = await response.json();
      console.log("data -> ", data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("todos sendo criado");
    fetchTodos(props.todoListId);
  }, [props.todoListId]);

  return (
    <ul>
      {TodoList.map((todo, index) => (

        <Todo name={todo.name} index={index} done={todo.done} />
      ))}
    </ul>
  );
};

export default Todos;


