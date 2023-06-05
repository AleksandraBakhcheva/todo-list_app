export interface Validatable {
  value: string;
  required?: true;
  minLength?: number;
  maxLength?: number;
}
