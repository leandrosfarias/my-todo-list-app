import React from "react";
import "./Sidebar.css";
import TodoLists from "../../components/TodoLists/TodoLists";

interface MeuComponenteProps {
    // handleTodoListClick: (todoListId: string) => void;
    onTodoListClick: (todoListId: string) => void
    // Inclua outras props aqui, se houver
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Sidebar = (props: MeuComponenteProps) => {
    // const handleTodoListClick = (todoListId: string) => {
    //     console.log('todoListId -> ', todoListId)
    // }

  return (
    <aside className="sidebar">
      <h1 className="title">Listas de Tarefas</h1>
      <TodoLists onTodoListClick={props.onTodoListClick}/>
    </aside>
  );
};

export default Sidebar;
