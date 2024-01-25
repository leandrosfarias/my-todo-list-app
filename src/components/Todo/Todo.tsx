import { useEffect, useState } from "react";
import "./Todo.css";

// interface ITodo {
//   name: string;
//   done: boolean;
// }

interface ITodoProps {
  name: string;
  done: boolean;
  index: number;
}

const Todo = (props: ITodoProps) => {
  const [todo, setTodo] = useState(false);

  const checkTodo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/user/checkTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxlYW5kcm8zQGdtYWlsLmNvbSIsInVzZXJJZCI6MTQsImlhdCI6MTcwNjA1MzQ4NSwiZXhwIjoxNzA2MDU3MDg1fQ.Ge4ZjjiHN-u1379ks1okDNHn25lHVTSpbHhHEY1UD-s`,
        },
        body: JSON.stringify({ todoListId: '' , todoId: ''})
      });
      const data = await response.json();
      // console.log('data -> ', data)
    //   setTodoList(data);
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
          setTodo(true);
        }}
      />
      {props.name}
    </li>
  );
};

export default Todo;
