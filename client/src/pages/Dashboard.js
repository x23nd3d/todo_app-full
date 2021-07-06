import React from "react";
import TodoApp from "../components/todo-app";

export const Dashboard = () => {

    return sessionStorage.getItem('API') ? <TodoApp/> : null;
}

