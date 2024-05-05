import { useState, useEffect } from "react";
import "./Todos.css";
import Todo from "../Todo/Todo";
import { useAuth } from "../../contexts/AuthContext";
import Modal from "../Modal/Modal";

interface ITodo {
  id: number;
  name: string;
  done: boolean;
}

interface ITodoListProps {
  todoListId: string;
}

const Todos = (props: ITodoListProps) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoNameIsEmpty, setTodoNameIsEmpty] = useState(false);
  const { token } = useAuth();

  async function handleAddTodo() {
    console.log("Adicionar tarefa");
    modalOpen();
    // const result = await fetch("http://127.0.0.1:3000/api/user/todo", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: token!.toString(),
    //   },
    //   body: JSON.stringify({ todoListId: props.todoListId , todoName: todoName, }),
    // })
    // console.log('result handleAddTodo -> ', result)
  }

  async function handleGetTodoData() {
    console.log("Pegar dados da tarefa");
    console.log('todoName => ', todoName)
    if (todoName === '') {
      console.log('Nome da tarefa não pode ser vazio')
      setTodoNameIsEmpty(true);
    }
    else {
      modalClose()
      const result = await fetch("http://127.0.0.1:3000/api/user/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!.toString(),
      },
      body: JSON.stringify({ todoListId: props.todoListId , todoName: todoName, }),
    })
    console.log('result handleAddTodo -> ', result)
    }
  }

  function modalOpen() {
    setModalOpen(true);
  }

  function modalClose() {
    setModalOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSetTodoName(event: any) {
    console.log('handleSetTodoName', event.target.value)
    // setTodoNameIsEmpty(event.target.value !== '');
    setTodoName(event.target.value);
  }

  useEffect(() => {
    // const fetchTodos = async (todoListId: string) => {
    //   try {
    //     console.log('todoListId em fetchTodos -> ', todoListId)
    //     const response = await fetch(`http://127.0.0.1:3000/api/user/todos/${todoListId}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: token!.toString(),
    //       },
    //       // body: JSON.stringify({ todoListId }),
    //     });
    //     const data = await response.json();
    //     console.log("data fetchTodos -> ", data);
    //     setTodos(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchTodos(props.todoListId);
  }, [props.todoListId, token]);

  return (
    <div>
      <button onClick={handleAddTodo}>+ Cadastrar tarefa</button>
      <Modal isOpen={isModalOpen} onClose={modalClose}>
        <div id="container-form-add-todo">
          <h1>Adicionar tarefa</h1>
          <input type="text" placeholder="Nome da tarefa" onChange={handleSetTodoName} className={todoNameIsEmpty ? 'input-warning': 'input'}/>
          {todoNameIsEmpty && <p id="error-message">O nome da lista de tarefas não pode ser vazio!</p>}
          <button onClick={handleGetTodoData}>Adicionar</button>
        </div>
      </Modal>
      <ul>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <Todo
            name={todo.name}
            index={index}
            done={todo.done}
            todoListId={Number.parseInt(props.todoListId)}
            id={todo.id}
          />
        ))
      ) : "Nenhuma tarefa cadastrada"}
    </ul>
    </div>
  );
};

export default Todos;
