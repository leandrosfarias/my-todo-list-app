import { useEffect, useState } from "react";
import "./Todo.css";
import { useAuth } from "../../contexts/AuthContext";

// interface ITodo {
//   name: string;
//   done: boolean;
// }

interface ITodoProps {
  id: number;
  name: string;
  done: boolean;
  index: number;
  todoListId: number;
}

const Todo = (props: ITodoProps) => {
  const [todo, setTodo] = useState(false);
  const { token } = useAuth();

  const checkTodo = async () => {
    console.log('!props.done => ', !props.done)
    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/checkTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!.toString(),
        },
        body: JSON.stringify({
          todoListId: props.todoListId,
          todoId: props.id,
          check: !props.done,
        }),
      });
      const data = await response.json();
      // console.log('data -> ', data)
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTodo(props.done);
  }, [props.done]);

  return (
    <li key={props.index}>
      <input
        type="checkbox"
        name="checkTodo"
        checked={todo}
        onChange={() => {
          checkTodo();
        }}
      />
      {props.name}
    </li>
  );
};

export default Todo;
