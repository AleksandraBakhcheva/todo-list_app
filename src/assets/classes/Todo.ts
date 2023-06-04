import { TodoStatus } from "../utils/Enums";

export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TodoStatus
  ) {}
}
