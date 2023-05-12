import * as todoService from "../services/todoService.js";

const getAllTodos = (req, res) => {
  try {
    const todos = todoService.getAllTodos();
    res.send({
      status: "OK",
      data: todos,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILURE",
      msg: error?.msg || error,
    });
  }
};

const getOneTodo = (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = todoService.getOneTodo(todoId);

    res.send({
      status: "OK",
      data: todo,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      msg: error?.msg || err,
    });
  }
};

const createNewTodo = (req, res) => {
  const { title, body } = req.body;

  if (!title || !body)
    return res.status(400).send({
      status: "FAILURE",
      msg: "One of the following keys is missing 'title', 'body'",
    });

  const newTodo = {
    title,
    body,
  };

  try {
    const createdTodo = todoService.createNewTodo(newTodo);

    res.status(201).send({
      status: "OK",
      data: createdTodo,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      msg: error?.msg || error,
    });
  }
};

const updateOneTodo = (req, res) => {
  const { todoId } = req.params;
  const { title, body } = req.body;

  const todo = {
    title,
    body,
  };

  if (!todoId) {
    return res.status(400).send({
      status: "FAILED",
      msg: "todo Id is required",
    });
  }

  try {
    const updatedTodo = todoService.updateOneTodo(todoId, todo);

    res.send({
      status: "OK",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      msg: error?.msg || error,
    });
  }
};

const deleteOneTodo = (req, res) => {
  const { todoId } = req.params;

  if (!todoId) {
    return res.status(400).send({
      status: "FAILED",
      msg: "todo Id is required",
    });
  }

  try {
    todoService.deleteOneTodo(todoId);

    res.send({
      status: "OK",
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      msg: error?.msg || error,
    });
  }
};

export { getAllTodos, getOneTodo, createNewTodo, updateOneTodo, deleteOneTodo };
