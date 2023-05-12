import * as Todo from "../database/Todo.js";
import { v4 as uuidv4 } from "uuid";

const getAllTodos = (_) => {
  try {
    const todos = Todo.getAllTodos();

    return todos;
  } catch (error) {
    throw error;
  }
};

const getOneTodo = (todoId) => {
  try {
    const todo = Todo.getOneTodo(todoId);
    return todo;
  } catch (error) {
    throw error;
  }
};

const createNewTodo = (newTodo) => {
  const todo = {
    ...newTodo,
    id: uuidv4(),
    createdAt: new Date().toLocaleString("en-IN", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-IN", { timeZone: "UTC" }),
  };

  try {
    const createdTodo = Todo.createNewTodo(todo);
    return createdTodo;
  } catch (error) {
    throw error;
  }
};

const updateOneTodo = (todoId, todo) => {
  try {
    const updatedTodo = Todo.updateTodo(todoId, todo);
    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

const deleteOneTodo = (todoId) => {
  try {
    Todo.deleteTodo(todoId);
  } catch (error) {
    throw error;
  }
};

export { getAllTodos, getOneTodo, createNewTodo, updateOneTodo, deleteOneTodo };
