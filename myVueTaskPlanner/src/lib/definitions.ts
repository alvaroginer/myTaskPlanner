export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  tasks: TaskData[];
  id: string;
}

export type PiniaUser = Pick<
  UserData,
  "email" | "id" | "firstName" | "lastName"
>;

export interface TaskData {
  taskId: string;
  name: string;
  description?: string;
  createdAt: number;
  deadline: number;
  completed: boolean;
}

export interface addTaskFormData {
  name: string;
  description?: string;
  deadline: string;
}

export interface TaskFormErrors {
  name?: string | undefined;
  description?: string | undefined;
  deadline?: string | undefined;
}

export interface TaskFormState {
  success: boolean;
  errors: TaskFormErrors;
}
