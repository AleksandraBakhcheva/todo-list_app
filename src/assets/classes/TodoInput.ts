import { autobind } from "../utils/Decorators";
import { todoState } from "../utils/Other";
import { validate } from "../utils/Functions";
import { Validatable } from "../utils/Interfaces";

export class TodoInput {
  formEl: HTMLFormElement;
  titleEl: HTMLInputElement;
  descriptionEl: HTMLTextAreaElement;

  constructor() {
    this.formEl = document.querySelector("form") as HTMLFormElement;
    this.titleEl = document.getElementById("title") as HTMLInputElement;
    this.descriptionEl = document.getElementById(
      "description"
    ) as HTMLTextAreaElement;

    this.construct();
  }

  private construct() {
    this.formEl.addEventListener("submit", this.submitHandler);
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.collectUserInput();
    if (Array.isArray(userInput)) {
      const [title, description] = userInput;
      todoState.addTodo(title, description);
      this.changeColor(".title", "black");
      this.changeColor(".description", "black");
      this.clearInput();
    }
  }

  private clearInput() {
    this.titleEl.value = "";
    this.descriptionEl.value = "";
  }

  private changeColor(selector: string, color: string) {
    (<HTMLElement>document.querySelector(`${selector} span`)).style.color =
      color;
  }

  private collectUserInput(): [string, string] | void {
    const title = this.titleEl.value;
    const description = this.descriptionEl.value;

    const titleValidatable: Validatable = {
      value: title,
      required: true,
      minLength: 5,
      maxLength: 100,
    };

    const descriptionValidatable: Validatable = {
      value: description,
      required: true,
      minLength: 5,
      maxLength: 400,
    };

    if (!validate(titleValidatable) || !validate(descriptionValidatable)) {
      if (!validate(titleValidatable)) {
        this.changeColor(".title", "red");
      } else {
        this.changeColor(".title", "black");
        this.changeColor(".description", "red");
      }
      return;
    }

    return [title, description];
  }
}
