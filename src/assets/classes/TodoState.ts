import { State } from "./State";
import { Todo } from "./Todo";
import { TodoStatus } from "../utils/Enums";

export class TodoState extends State<Todo> {
  private static instance: TodoState;
  private todos: Todo[] = [];

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new TodoState();
    return this.instance;
  }

  addTodo(title: string, description: string) {
    const todo = new Todo(
      Math.random().toString(),
      title,
      description,
      TodoStatus.ACTIVE
    );
    this.todos.push(todo);
    this.updateListeners();
  }

  moveTodo(todoId: string, newStatus: TodoStatus) {
    const todo = this.todos.find((item) => item.id === todoId);
    if (todo && todo.status !== newStatus) {
      todo.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.todos);
    }
  }
}
