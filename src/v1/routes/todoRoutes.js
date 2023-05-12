import express from "express";
import apicache from "apicache";
import {
  createNewTodo,
  deleteOneTodo,
  getAllTodos,
  getOneTodo,
  updateOneTodo,
} from "../../controllers/todoController.js";
const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 *  /api/v1/todos:
 *    get:
 *      tags:
 *        - Todo
 *      description: Use to get all todos.
 *      summary: Get all todos in the app
 *      responses:
 *        '200':
 *          description: Successfully retrieves all the todos
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                     type: array
 *                     items:
 *                       $ref: '#components/schemas/Todo'
 *
 *        '500':
 *          description: Internal error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Something went wrong when trying to read from database
 */
router.get("/", cache("2 minutes"), getAllTodos);

/**
 * @openapi
 *  /api/v1/todos/{todoId}:
 *    get:
 *      tags:
 *        - Todo
 *      description: Use to get a single todo.
 *      summary: Get todo by id
 *      parameters:
 *        - name: todoId
 *          in: path
 *          description: ID of todo to return
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Successfully fetches the todo by id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: object
 *                    $ref: '#components/schemas/Todo'
 *        '404':
 *          description: Requested todo is not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Cannot find todo with id df229dc4-ceac-4777-a04d-236085ba1a6
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Something went wrong when trying to fetch todo
 *
 */
router.get("/:todoId", getOneTodo);

/**
 * @openapi
 *  /api/v1/todos:
 *    post:
 *      tags:
 *        - Todo
 *      description: Used to create a new todo
 *      summary: To create a new todo
 *      parameters:
 *        - name: title
 *          in: request body
 *          description: Title of the todo, or the what the todo is about in short, must not be the same
 *          required: true
 *          schema:
 *            type: string
 *        - name: body
 *          in: request body
 *          required: true
 *          description: Detailed description of the todo, what are you planning to do briefly
 *      responses:
 *        '201':
 *          description: Todo successfully created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: object
 *                    $ref: '#components/schemas/Todo'
 *        '400':
 *          description: The title of the given todo already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: This title already exists
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Something went wrong when trying to create todo
 */
router.post("/", createNewTodo);

/**
 * @openapi
 *  /api/v1/todos/{todoId}:
 *    patch:
 *      tags:
 *        - Todo
 *      description: Used to edit a todo with id todoId
 *      summary: To edit a todo with todoId
 *      parameters:
 *        - name: todoId
 *          in: path
 *          required: true
 *          description: Id of the todo to edit
 *          schema:
 *            type: string
 *        - name: title
 *          in: request body
 *          description: The new title of the todo
 *          schema:
 *            type: string
 *        - name: body
 *          in: request body
 *          description: The new body of the todo
 *          schema:
 *            type: string
 *      responses:
 *      '200':
 *        description: Successfully edited the todo
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: object
 *                  $ref: '#components/schemas/Todo'
 *      '400':
 *          description: Error, maybe the current title for the todo already exists
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Todo title must be unique
 *      '404':
 *        description: Error if todo with todoId does not exist
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                example: FAILED
 *              msg:
 *                type: string
 *                example: Cannot find todo with the given todoId
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: FAILED
 *                msg:
 *                  type: string
 *                  example: Something went wrong when trying to edit the todo
 *
 */
router.patch("/:todoId", updateOneTodo);

/**
 * @openapi
 *  /api/v1/todos/{todoId}:
 *    delete:
 *      tags:
 *        - Todo
 *      description: Used to delete a todo with todoId
 *      summary: To delete a todo with todoId
 *      parameters:
 *        - name: todoId
 *          in: path
 *          required: true
 *          description: The id of todo that needs to be deleted
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: The todo got deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *        '404':
 *          description: The todo with id todoId may not exist
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Cannot find todo with id todoId
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: FAILED
 *                  msg:
 *                    type: string
 *                    example: Something went wrong when trying to delete the todo
 */
router.delete("/:todoId", deleteOneTodo);

export default router;
