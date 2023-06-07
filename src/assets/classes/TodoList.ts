import { autobind } from "../utils/Decorators";
import { IDragTarget } from "../utils/Interfaces";
import { Todo } from "./Todo";
import { TodoItem } from "./TodoItem";
import { todoState } from "../utils/Other";
import { TodoStatus } from "../utils/Enums";

export class TodoList implements IDragTarget {
  assignedTodos: Todo[] = [];
  ulElement: HTMLUListElement;

  constructor(private type: string) {
    this.ulElement = document.getElementById(
      `${this.type}-todos-list`
    ) as HTMLUListElement;

    todoState.addListener((todos: Todo[]) => {
      const currentTodos = todos.filter((item) => {
        if (this.type === "active") {
          return item.status === TodoStatus.ACTIVE;
        }
        return item.status === TodoStatus.FINISHED;
      });
      this.assignedTodos = currentTodos;
      this.renderTodos();
    });

    this.construct();
  }

  construct() {
    this.ulElement.addEventListener("dragover", this.dragOverHandler);
    this.ulElement.addEventListener("dragleave", this.dragLeaveHandler);
    this.ulElement.addEventListener("drop", this.dropHandler);
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
  }

  @autobind
  dragLeaveHandler(_event: DragEvent): void {}

  @autobind
  dropHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      let todoId = event.dataTransfer.getData("text/plain");
      todoState.moveTodo(
        todoId,
        this.type === "active" ? TodoStatus.ACTIVE : TodoStatus.FINISHED
      );
    }
  }

  private renderTodos() {
    this.ulElement.innerHTML = "";
    for (const item of this.assignedTodos) {
      new TodoItem(item, this.ulElement);
    }
  }
}
