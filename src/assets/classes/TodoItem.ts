import { autobind } from "../utils/Decorators";
import { Draggable } from "../utils/Interfaces";
import { Todo } from "./Todo";

export class TodoItem implements Draggable {
  liElement: HTMLLIElement;

  constructor(private todo: Todo, private element: HTMLUListElement) {
    this.liElement = document.createElement("li");
    this.liElement.setAttribute("draggable", "true");
    this.renderContent();
    this.construct();
  }

  private construct() {
    this.liElement.addEventListener("dragstart", this.dragStartHandler);
    this.liElement.addEventListener("dragend", this.dragEndHandler);
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.todo.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_event: DragEvent) {}

  renderContent() {
    const liData = `<h3>${this.todo.title}</h3>
    <div>${this.todo.description}</div>`;
    this.liElement.innerHTML = liData;
    this.element.appendChild(this.liElement);
  }
}
