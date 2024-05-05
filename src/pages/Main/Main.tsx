import React, { useState } from "react";
import "./Main.css";
import "../header/Header";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Todos from "../../components/Todos/Todos";

const Main: React.FC = () => {
  const [todoListId, setTodoListId] = useState("1");

  const handleTodoListClick = (todoListId: string) => {
    console.log("todoListId -> ", todoListId);
    setTodoListId(todoListId);
  };
  
  return (
    <div>
      <Header />
      <div className="main">
        <Sidebar onTodoListClick={handleTodoListClick} />
        <Todos todoListId={todoListId} />
      </div>
    </div>
  );
};

export default Main;
