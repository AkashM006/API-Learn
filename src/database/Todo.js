import DB from "../database/db.json" assert { type: "json" };
import saveToDatabase from "./utils.js";

/**
 * @openapi
 * components:
 *  schemas:
 *    Todo:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          example: 51233d3a-c3d4-44f6-b340-1b060b26b642
 *        title:
 *          type: string
 *          example: Dry clothes
 *        body:
 *          type: string
 *          example: Take clothes out of washing machine and dry them
 *        createdAt:
 *          type: string
 *          example: 10/5/2023, 1:10:28 pm
 *        updatedAt:
 *          type: string
 *          example: 10/5/2023, 1:10:28 pm
 */

const getAllTodos = () => {
  try {
    return DB.todos;
  } catch (error) {
    throw { status: 500, msg: error?.msg || error };
  }
};

const getOneTodo = (todoId) => {
  try {
    const todoIndex = DB.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      throw { status: 404, msg: `Cannot find todo with id ${todoId}` };
    }
    return DB.todos[todoIndex];
  } catch (error) {
    throw { status: error.status || 500, msg: error?.msg || error };
  }
};

const createNewTodo = (newTodo) => {
  const doesExist =
    DB.todos.findIndex((todo) => todo.title === newTodo.title) > -1;

  if (doesExist) throw { status: 400, msg: "This title already exists" };

  try {
    DB.todos.push(newTodo);
    saveToDatabase(DB);
    return newTodo;
  } catch (error) {
    throw { status: 500, msg: error?.message || error };
  }
};

const updateTodo = (todoId, todo) => {
  // check if the title already exists
  const todoWithSameTitleIndex = DB.todos.findIndex(
    (item) => item.title === todo.title
  );

  const todoIndex = DB.todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1)
    throw { status: 404, msg: `Cannot find todo with id: ${todoId}` };

  if (todoIndex !== todoWithSameTitleIndex)
    throw { status: 400, msg: `Todo title must be unique` };

  const currentTodo = DB.todos[todoIndex];

  if (currentTodo.title === todo.title && currentTodo.body === todo.body)
    return currentTodo;

  const updatedTodo = {
    ...currentTodo,
    ...todo,
    updatedAt: new Date().toLocaleString("en-IN", { timeZone: "UTC" }),
  };
  try {
    DB.todos[todoIndex] = updatedTodo;
    saveToDatabase(DB);
    return updatedTodo;
  } catch (error) {
    throw { status: 500, msg: error?.message || error };
  }
};

const deleteTodo = (todoId) => {
  const todoIndex = DB.todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1)
    throw { status: 404, msg: `Cannot find todo with id: ${todoId}` };

  try {
    DB.todos.splice(todoIndex, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw {
      status: 500,
      msg: error?.message || error,
    };
  }
};

export { getAllTodos, getOneTodo, createNewTodo, updateTodo, deleteTodo };
